use std::path::PathBuf;
use serde::{Serialize, Deserialize};
use tree_sitter::{Parser as TSParser, Language, Query, QueryCursor, Point};
use std::fs;
use petgraph::graph::{DiGraph, NodeIndex};
use std::collections::{HashMap, HashSet};
use crate::pagerank::{PageRankConfig, personalized_pagerank};
use tiktoken_rs::cl100k_base;

pub mod pagerank;

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq, Eq, Hash)]
pub enum SymbolKind {
    Struct,
    Function,
    Class,
    Interface,
    Enum,
    Trait,
    Module,
    Unknown,
}

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq, Eq, Hash)]
pub struct Symbol {
    pub name: String,
    pub kind: SymbolKind,
    pub line: usize,
    pub path: PathBuf,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Tag {
    pub name: String,
    pub kind: TagKind,
    pub start_point: SerializablePoint,
    pub end_point: SerializablePoint,
    pub is_name_capture: bool,
}

#[derive(Debug, Serialize, Deserialize, Clone, Copy)]
pub struct SerializablePoint {
    pub row: usize,
    pub column: usize,
}

impl From<Point> for SerializablePoint {
    fn from(p: Point) -> Self {
        Self { row: p.row, column: p.column }
    }
}

#[derive(Debug, Serialize, Deserialize, Clone, Copy, PartialEq, Eq)]
pub enum TagKind {
    Definition,
    Reference,
}

pub struct Parser {
    stop_words: HashSet<String>,
}

impl Parser {
    pub fn new() -> Self {
        let stop_words = [
            "new", "init", "std", "String", "self", "this", "super", "main",
            "constructor", "__init__", "None", "Some", "Ok", "Err",
            "Option", "Result", "Vec", "Map", "Set", "List", "id", "name",
            "value", "data", "type", "Object", "Any", "void", "bool", "int",
            "string", "float", "double", "long", "short", "byte", "char",
            "println", "print", "log", "debug", "info", "warn", "error",
            "console", "fmt", "err", "out",
        ]
        .iter()
        .map(|s| s.to_string())
        .collect();

        Self { stop_words }
    }

    fn get_language(&self, ext: &str) -> Option<Language> {
        match ext {
            "rs" => Some(tree_sitter_rust::language()),
            "ts" | "tsx" => Some(tree_sitter_typescript::language_typescript()),
            "js" | "jsx" => Some(tree_sitter_javascript::language()),
            "py" => Some(tree_sitter_python::language()),
            "go" => Some(tree_sitter_go::language()),
            "java" => Some(tree_sitter_java::language()),
            "cpp" | "cc" | "h" | "hpp" => Some(tree_sitter_cpp::language()),
            _ => None,
        }
    }

    fn get_tags_query(&self, ext: &str) -> Option<String> {
        match ext {
            "rs" => Some(include_str!("../../../queries/rust.scm").to_string()),
            "ts" | "tsx" | "js" | "jsx" => Some(include_str!("../../../queries/typescript.scm").to_string()),
            "py" => Some(include_str!("../../../queries/python.scm").to_string()),
            "go" => Some(include_str!("../../../queries/go.scm").to_string()),
            "java" => Some(include_str!("../../../queries/java.scm").to_string()),
            "cpp" | "cc" | "h" | "hpp" => Some(include_str!("../../../queries/cpp.scm").to_string()),
            _ => None,
        }
    }

    pub fn extract_tags(&self, path: &PathBuf) -> Result<Vec<Tag>, Box<dyn std::error::Error>> {
        let ext = path.extension().and_then(|s| s.to_str()).unwrap_or("");
        let language = self.get_language(ext).ok_or("Unsupported language")?;
        let query_src = self.get_tags_query(ext).ok_or("No query for language")?;

        let code = fs::read_to_string(path)?;
        let mut parser = TSParser::new();
        parser.set_language(language)?;

        let tree = parser.parse(&code, None).ok_or("Failed to parse code")?;
        let query = Query::new(language, &query_src)?;
        let mut cursor = QueryCursor::new();
        let matches = cursor.matches(&query, tree.root_node(), code.as_bytes());

        let mut tags = Vec::new();
        for m in matches {
            let mut has_definition = false;
            for capture in m.captures {
                let capture_name = query.capture_names()[capture.index as usize].as_str();
                if capture_name.starts_with("definition") {
                    has_definition = true;
                    break;
                }
            }

            for capture in m.captures {
                let node = capture.node;
                let capture_name = query.capture_names()[capture.index as usize].as_str();

                let name = code[node.start_byte()..node.end_byte()].to_string();
                
                // Skip stop words
                if self.stop_words.contains(&name) {
                    continue;
                }
                
                let is_name_capture = capture_name == "name";

                // If it's a definition match, we ONLY want the "name" capture
                if has_definition && !is_name_capture {
                    continue;
                }

                // If it's NOT a definition match, and it's a "name" capture, 
                // we treat it as a reference (this covers things like type identifiers)
                let final_kind = if has_definition { TagKind::Definition } else { TagKind::Reference };

                // Log extracted tag
                // println!("DEBUG: Tag: {:?} - {} (name_capture: {})", final_kind, name, is_name_capture);

                tags.push(Tag {
                    name,
                    kind: final_kind,
                    is_name_capture,
                    start_point: node.start_position().into(),
                    end_point: node.end_position().into(),
                });
            }
        }

        // Second pass: Filter out references that are actually definitions in the same file
        // This reduces self-loops and noise
        let definitions: HashSet<_> = tags.iter()
            .filter(|t| t.kind == TagKind::Definition)
            .map(|t| t.name.clone())
            .collect();

        let filtered_tags = tags.into_iter()
            .filter(|t| t.kind == TagKind::Definition || !definitions.contains(&t.name))
            .collect();

        Ok(filtered_tags)
    }
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct FileAnalysis {
    pub path: PathBuf,
    pub tags: Vec<Tag>,
}

pub struct RepoGraph {
    pub graph: DiGraph<PathBuf, f64>,
    pub node_map: HashMap<PathBuf, NodeIndex>,
}

impl RepoGraph {
    pub fn new() -> Self {
        Self {
            graph: DiGraph::new(),
            node_map: HashMap::new(),
        }
    }

    pub fn build(&mut self, analyses: &[FileAnalysis]) {
        for analysis in analyses {
            let idx = self.graph.add_node(analysis.path.clone());
            self.node_map.insert(analysis.path.clone(), idx);
        }

        let mut def_map: HashMap<String, Vec<NodeIndex>> = HashMap::new();
        for analysis in analyses {
            let node_idx = self.node_map[&analysis.path];
            for tag in &analysis.tags {
                if tag.kind == TagKind::Definition {
                    def_map.entry(tag.name.clone()).or_default().push(node_idx);
                }
            }
        }

        for analysis in analyses {
            let from_path = &analysis.path;
            let from_idx = self.node_map[from_path];
            let from_dir = from_path.parent();

            for tag in &analysis.tags {
                if tag.kind == TagKind::Reference {
                    // Try exact match first
                    if let Some(to_indices) = def_map.get(&tag.name) {
                        for &to_idx in to_indices {
                            if from_idx != to_idx {
                                let to_path = &self.graph[to_idx];
                                let to_dir = to_path.parent();

                                // Precision Linking: Increase weight if in the same directory
                                let weight_increment = if from_dir == to_dir {
                                    2.0 // Stronger link for same-directory symbols
                                } else {
                                    1.0
                                };

                                if let Some(edge) = self.graph.find_edge(from_idx, to_idx) {
                                    self.graph[edge] += weight_increment;
                                } else {
                                    self.graph.add_edge(from_idx, to_idx, weight_increment);
                                }
                            }
                        }
                    } else {
                        // Fuzzy match: if tag name contains parts of other definitions (e.g., utils::helper matching helper)
                        let parts: Vec<&str> = tag.name.split(|c: char| !c.is_alphanumeric() && c != '_').filter(|s| !s.is_empty()).collect();
                        
                        let mut unique_parts = HashSet::new();
                        for part in parts {
                            unique_parts.insert(part);
                        }

                        for part in unique_parts {
                            if let Some(to_indices) = def_map.get(part) {
                                for &to_idx in to_indices {
                                    if from_idx != to_idx {
                                        let weight_increment = 0.5; // Final adjustment
                                        if let Some(edge) = self.graph.find_edge(from_idx, to_idx) {
                                            self.graph[edge] += weight_increment;
                                        } else {
                                            self.graph.add_edge(from_idx, to_idx, weight_increment);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    pub fn rank(&self, focus_files: &[PathBuf]) -> Vec<(PathBuf, f64)> {
        let mut personalization = HashMap::new();
        if !focus_files.is_empty() {
            let weight = 1.0 / focus_files.len() as f64;
            for path in focus_files {
                if let Some(&idx) = self.node_map.get(path) {
                    personalization.insert(idx, weight);
                }
            }
        }

        let personalization_opt = if personalization.is_empty() { None } else { Some(&personalization) };
        let scores = personalized_pagerank(&self.graph, personalization_opt, PageRankConfig::default());

        let mut results: Vec<_> = scores.into_iter()
            .map(|(idx, score)| (self.graph[idx].clone(), score))
            .collect();

        results.sort_by(|a, b| b.1.partial_cmp(&a.1).unwrap_or(std::cmp::Ordering::Equal));
        results
    }
}

pub struct Renderer;

impl Renderer {
    pub fn estimate_tokens(text: &str) -> usize {
        let bpe = cl100k_base().unwrap();
        bpe.encode_with_special_tokens(text).len()
    }

    pub fn render(ranked_files: &[(PathBuf, f64)], analyses: &[FileAnalysis], limit: usize, token_budget: usize) -> String {
        let mut output = String::from("HOLOGRAPHIC MAP\n===============\n");
        let mut current_tokens = Self::estimate_tokens(&output);
        
        let analysis_map: HashMap<_, _> = analyses.iter().map(|a| (&a.path, a)).collect();

        for (path, score) in ranked_files.iter().take(limit) {
            let mut file_output = format!("\n📄 {:?} [{:>4.3}]\n", path, score);
            if let Some(analysis) = analysis_map.get(path) {
                for tag in &analysis.tags {
                    if tag.kind == TagKind::Definition {
                        file_output.push_str(&format!("  {} (line {})\n", tag.name, tag.start_point.row + 1));
                    }
                }
            }

            let file_tokens = Self::estimate_tokens(&file_output);
            if current_tokens + file_tokens > token_budget {
                break;
            }

            output.push_str(&file_output);
            current_tokens += file_tokens;
        }
        output
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use petgraph::Graph;
    use std::collections::HashMap;

    #[test]
    fn test_personalized_pagerank_focus() {
        let mut graph = Graph::<&str, f64>::new();
        let a = graph.add_node("A");
        let b = graph.add_node("B");
        let c = graph.add_node("C");
        let d = graph.add_node("D");

        graph.add_edge(a, b, 1.0);
        graph.add_edge(c, d, 1.0);

        let mut personalization = HashMap::new();
        personalization.insert(a, 1.0);

        let ranks = personalized_pagerank(
            &graph,
            Some(&personalization),
            PageRankConfig::default()
        );

        assert!(ranks[&a] > ranks[&b]);
        assert!(ranks[&b] > ranks[&c]);
        assert!(ranks[&b] > ranks[&d]);
        assert!(ranks[&c] < 0.05);
    }

    #[test]
    fn test_stop_words_filtering() {
        let parser = Parser::new();
        let temp_dir = std::env::temp_dir();
        let file_path = temp_dir.join("test_stop_words.rs");
        fs::write(&file_path, "fn main() { println!(\"hello\"); }").unwrap();
        
        let tags = parser.extract_tags(&file_path).unwrap();
        
        for tag in tags {
            assert!(tag.name != "main", "Stop word 'main' should be filtered");
            assert!(tag.name != "println", "Stop word 'println' should be filtered");
        }
        
        let _ = fs::remove_file(file_path);
    }

    #[test]
    fn test_precision_linking_weights() {
        let mut graph = RepoGraph::new();
        
        let file_a = PathBuf::from("src/a.rs");
        let file_b = PathBuf::from("src/b.rs");
        let file_c = PathBuf::from("other/c.rs");

        let analyses = vec![
            FileAnalysis {
                path: file_a.clone(),
                tags: vec![
                    Tag {
                        name: "func_b".to_string(),
                        kind: TagKind::Reference,
                        start_point: SerializablePoint { row: 0, column: 0 },
                        end_point: SerializablePoint { row: 0, column: 5 },
                        is_name_capture: true,
                    },
                    Tag {
                        name: "func_c".to_string(),
                        kind: TagKind::Reference,
                        start_point: SerializablePoint { row: 1, column: 0 },
                        end_point: SerializablePoint { row: 1, column: 5 },
                        is_name_capture: true,
                    },
                ],
            },
            FileAnalysis {
                path: file_b.clone(),
                tags: vec![
                    Tag {
                        name: "func_b".to_string(),
                        kind: TagKind::Definition,
                        start_point: SerializablePoint { row: 0, column: 0 },
                        end_point: SerializablePoint { row: 0, column: 5 },
                        is_name_capture: true,
                    },
                ],
            },
            FileAnalysis {
                path: file_c.clone(),
                tags: vec![
                    Tag {
                        name: "func_c".to_string(),
                        kind: TagKind::Definition,
                        start_point: SerializablePoint { row: 0, column: 0 },
                        end_point: SerializablePoint { row: 0, column: 5 },
                        is_name_capture: true,
                    },
                ],
            },
        ];

        graph.build(&analyses);

        let idx_a = graph.node_map[&file_a];
        let idx_b = graph.node_map[&file_b];
        let idx_c = graph.node_map[&file_c];

        let edge_ab = graph.graph.find_edge(idx_a, idx_b).unwrap();
        let edge_ac = graph.graph.find_edge(idx_a, idx_c).unwrap();

        assert_eq!(graph.graph[edge_ab], 2.0, "Same directory link should have weight 2.0");
        assert_eq!(graph.graph[edge_ac], 1.0, "Different directory link should have weight 1.0");
    }

    #[test]
    fn test_exact_token_estimation() {
        let text = "fn main() { println!(\"Hello, world!\"); }";
        let tokens = Renderer::estimate_tokens(text);
        assert!(tokens > 0);
        // "fn main() { println!(\"Hello, world!\"); }" is roughly 15-20 tokens in cl100k
        assert!(tokens < 30);
    }
}
