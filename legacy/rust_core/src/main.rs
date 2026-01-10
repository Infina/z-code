use architect::{Parser as ArchitectParser, RepoGraph, FileAnalysis, Renderer, TagKind};
use clap::Parser as ClapParser;
use std::path::PathBuf;
use std::collections::HashMap;
use walkdir::WalkDir;
use serde::Serialize;
use rayon::prelude::*;
use std::fs;

#[derive(ClapParser, Debug)]
#[command(author, version, about, long_about = None)]
struct Args {
    /// Path to the directory to analyze
    #[arg(short, long, default_value = ".")]
    path: PathBuf,

    /// Focus files (comma separated)
    #[arg(short, long)]
    focus: Option<String>,

    /// Output in JSON format
    #[arg(short, long)]
    json: bool,

    /// Limit the number of files in the output
    #[arg(short, long, default_value = "50")]
    limit: usize,

    /// Token budget for the output
    #[arg(short, long, default_value = "4096")]
    token_budget: usize,
}

#[derive(Serialize)]
struct JsonOutput {
    files: Vec<FileRank>,
    edges: Vec<EdgeData>,
}

#[derive(Serialize)]
struct FileRank {
    path: PathBuf,
    score: f64,
    definitions: Vec<String>,
}

#[derive(Serialize)]
struct EdgeData {
    source: PathBuf,
    target: PathBuf,
    weight: f64,
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let args = Args::parse();
    
    let parser = ArchitectParser::new();
    let supported_extensions = ["rs", "ts", "tsx", "js", "jsx", "py", "go", "java", "cpp", "cc", "h", "hpp"];
    let ignored_dirs = ["node_modules", "target", "dist", "out", ".git", ".vscode", ".changeset", ".husky", "releases", "build"];
    
    // println!("DEBUG: Scanning path: {:?}", args.path);

    // Cache Setup
    let cache_dir = args.path.join(".roo").join("repo-map-cache");
    let db = sled::open(cache_dir)?;

    // 1. Collect candidate files
    let mut candidate_files: Vec<PathBuf> = Vec::new();
    let walker = WalkDir::new(&args.path);
    for entry in walker {
        if let Ok(entry) = entry {
            let path = entry.path();
            if path.is_file() {
                let ext = path.extension().and_then(|s| s.to_str()).unwrap_or("");
                if supported_extensions.contains(&ext) {
                    let rel_path = match path.strip_prefix(&args.path) {
                        Ok(p) => p.to_path_buf(),
                        Err(_) => path.to_path_buf(),
                    };

                    let mut is_ignored = false;
                    for component in rel_path.components() {
                        let cn = component.as_os_str().to_string_lossy();
                        if ignored_dirs.contains(&cn.as_ref()) {
                            is_ignored = true;
                            break;
                        }
                    }

                    if !is_ignored {
                        candidate_files.push(rel_path);
                    }
                }
            }
        }
    }

    // 2. Parallel Extraction with Caching
    let analyses: Vec<FileAnalysis> = candidate_files.par_iter()
        .filter_map(|path| {
            let full_path = args.path.join(path);
            let mtime = fs::metadata(&full_path).ok()?.modified().ok()?;
            let mtime_secs = mtime.duration_since(std::time::UNIX_EPOCH).ok()?.as_secs();
            
            let key = path.to_string_lossy().to_string();
            
            // Try cache
            if let Ok(Some(cached_data)) = db.get(&key) {
                if let Ok((cached_mtime, cached_analysis)) = serde_json::from_slice::<(u64, FileAnalysis)>(&cached_data) {
                    if cached_mtime == mtime_secs {
                        return Some(cached_analysis);
                    }
                }
            }

            // Parse and Cache
            parser.extract_tags(&full_path).ok().map(|tags| {
                // println!("DEBUG: Extracted {} tags from {:?}", tags.len(), path);
                let analysis = FileAnalysis {
                    path: path.clone(),
                    tags,
                };
                // Save to cache (ignore errors)
                if let Ok(data) = serde_json::to_vec(&(mtime_secs, &analysis)) {
                    let _ = db.insert(key, data);
                }
                analysis
            })
        })
        .collect();
    
    // Flush DB
    db.flush()?;

    // 2. Build graph & Rank
    let mut repo_graph = RepoGraph::new();
    repo_graph.build(&analyses);

    let focus_files: Vec<PathBuf> = args.focus
        .map(|s| s.split(',').map(PathBuf::from).collect())
        .unwrap_or_default();

    let ranked = repo_graph.rank(&focus_files);

    if args.json {
        let analysis_map: HashMap<_, _> = analyses.iter().map(|a| (&a.path, a)).collect();
        
        let mut edges = Vec::new();
        use petgraph::visit::EdgeRef;
        for edge in repo_graph.graph.edge_references() {
            edges.push(EdgeData {
                source: repo_graph.graph[edge.source()].clone(),
                target: repo_graph.graph[edge.target()].clone(),
                weight: *edge.weight(),
            });
        }

        let mut selected_files = Vec::new();
        let mut current_tokens = 0;

        for (path, score) in ranked.into_iter().take(args.limit) {
            let definitions: Vec<String> = analysis_map.get(&path)
                .map(|a| a.tags.iter()
                    .filter(|t| t.kind == TagKind::Definition)
                    .map(|t| t.name.clone())
                    .collect()
                ).unwrap_or_default();

            // Exact token counting for JSON (path + score + definitions)
            let file_json = serde_json::json!({
                "path": path,
                "score": score,
                "definitions": definitions
            });
            let file_tokens = Renderer::estimate_tokens(&file_json.to_string());

            if current_tokens + file_tokens > args.token_budget {
                break;
            }

            selected_files.push(FileRank { path, score, definitions });
            current_tokens += file_tokens;
        }

        let output = JsonOutput {
            files: selected_files,
            edges,
        };
        println!("{}", serde_json::to_string_pretty(&output)?);
    } else {
        // 3. Render Final Map
        let holographic_map = Renderer::render(&ranked, &analyses, args.limit, args.token_budget);
        println!("{}", holographic_map);
    }

    Ok(())
}
