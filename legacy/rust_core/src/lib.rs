// rust_core/src/lib.rs
// N-API Bridge for Francis Architecture
use architect::{Parser as ArchitectParser, RepoGraph, FileAnalysis, TagKind};
use napi_derive::napi;
use std::path::PathBuf;
use walkdir::WalkDir;
use serde::Serialize;
use rayon::prelude::*;
use std::fs;

#[napi(object)]
#[derive(Serialize)]
pub struct FileRank {
    pub path: String,
    pub score: f64,
    pub definitions: Vec<String>,
}

#[napi(object)]
#[derive(Serialize)]
pub struct EdgeData {
    pub source: String,
    pub target: String,
    pub weight: f64,
}

#[napi(object)]
pub struct RepoMapResult {
    pub files: Vec<FileRank>,
    pub edges: Vec<EdgeData>,
}

#[napi]
pub async fn compute_repo_map(root_path: String, focus_files_str: Option<String>, limit: u32, token_budget: u32) -> napi::Result<RepoMapResult> {
    let root = PathBuf::from(root_path);
    let parser = ArchitectParser::new();
    let supported_extensions = ["rs", "ts", "tsx", "js", "jsx", "py", "go", "java", "cpp", "cc", "h", "hpp"];
    let ignored_dirs = ["node_modules", "target", "dist", "out", ".git", ".vscode", ".changeset", ".husky", "releases", "build"];
    
    // Cache Setup (Hidden inside .roo)
    let cache_dir = root.join(".roo").join("repo-map-cache");
    let db = sled::open(cache_dir).map_err(|e| napi::Error::from_reason(e.to_string()))?;

    // 1. Collect candidate files
    let mut candidate_files: Vec<PathBuf> = Vec::new();
    for entry in WalkDir::new(&root) {
        if let Ok(entry) = entry {
            let path = entry.path();
            if path.is_file() {
                let ext = path.extension().and_then(|s| s.to_str()).unwrap_or("");
                if supported_extensions.contains(&ext) {
                    let rel_path = path.strip_prefix(&root).unwrap_or(path).to_path_buf();
                    let mut is_ignored = false;
                    for component in rel_path.components() {
                        if ignored_dirs.contains(&component.as_os_str().to_string_lossy().as_ref()) {
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
            let full_path = root.join(path);
            let mtime = fs::metadata(&full_path).ok()?.modified().ok()?;
            let mtime_secs = mtime.duration_since(std::time::UNIX_EPOCH).ok()?.as_secs();
            let key = path.to_string_lossy().to_string();
            
            if let Ok(Some(cached_data)) = db.get(&key) {
                if let Ok((cached_mtime, cached_analysis)) = serde_json::from_slice::<(u64, FileAnalysis)>(&cached_data) {
                    if cached_mtime == mtime_secs {
                        return Some(cached_analysis);
                    }
                }
            }

            parser.extract_tags(&full_path).ok().map(|tags| {
                let analysis = FileAnalysis { path: path.clone(), tags };
                if let Ok(data) = serde_json::to_vec(&(mtime_secs, &analysis)) {
                    let _ = db.insert(key, data);
                }
                analysis
            })
        })
        .collect();
    
    db.flush().map_err(|e| napi::Error::from_reason(e.to_string()))?;

    // 3. Build graph & Rank
    let mut repo_graph = RepoGraph::new();
    repo_graph.build(&analyses);

    let focus_paths: Vec<PathBuf> = focus_files_str
        .map(|s| s.split(',').map(PathBuf::from).collect())
        .unwrap_or_default();

    let ranked = repo_graph.rank(&focus_paths);
    let analysis_map: std::collections::HashMap<_, _> = analyses.iter().map(|a| (&a.path, a)).collect();

    // 4. Edges
    let mut edges = Vec::new();
    use petgraph::visit::EdgeRef;
    for edge in repo_graph.graph.edge_references() {
        edges.push(EdgeData {
            source: repo_graph.graph[edge.source()].to_string_lossy().into_owned(),
            target: repo_graph.graph[edge.target()].to_string_lossy().into_owned(),
            weight: *edge.weight(),
        });
    }

    // 5. Selected Files (Top-N + Budget)
    let mut selected_files = Vec::new();
    // In a real impl, we'd use architect::Renderer::estimate_tokens, but let's keep it simple for bridge
    for (path, score) in ranked.into_iter().take(limit as usize) {
        let definitions = analysis_map.get(&path)
            .map(|a| a.tags.iter()
                .filter(|t| t.kind == TagKind::Definition)
                .map(|t| t.name.clone())
                .collect()
            ).unwrap_or_default();

        selected_files.push(FileRank {
            path: path.to_string_lossy().into_owned(),
            score,
            definitions,
        });
    }

    Ok(RepoMapResult {
        files: selected_files,
        edges,
    })
}
