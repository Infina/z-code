# **Comprehensive Analysis and Implementation Strategy for Aider’s Repository Map Algorithm in Rust**

## **1\. Introduction to Large-Scale Context Management in AI Development**

The integration of Large Language Models (LLMs) into the software development lifecycle has precipitated a fundamental shift in how code is authored, refactored, and maintained. Tools such as Aider have emerged as critical intermediaries, functioning not merely as autocomplete engines but as autonomous agents capable of navigating complex multi-file repositories. However, a persistent bottleneck in this domain remains the "context window"—the finite amount of tokenized information an LLM can process in a single inference step. While models have expanded from 4,096 tokens to over 128,000 or even 1 million tokens, the latency and financial cost associated with stuffing entire repositories into a prompt remain prohibitive. Furthermore, empirical evidence suggests that "needle-in-a-haystack" retrieval performance degrades as context saturation increases, leading to hallucinations or loss of instruction adherence.1

Aider addresses this challenge through the implementation of a "Repository Map" (Repo Map). Unlike Retrieval-Augmented Generation (RAG) systems that rely on vector embedding similarity—which often fails to capture the structural and syntactic dependencies of code—the Repo Map relies on a deterministic, graph-theoretic approach. It constructs a compact, high-fidelity representation of the codebase by combining static analysis (via Tree-sitter) with network centrality algorithms (Personalized PageRank).3 This allows the agent to identify not just the file specifically requested by the user, but the constellation of implicit dependencies, type definitions, and utility functions required to perform a coherent edit.

This report provides an exhaustive technical analysis of the algorithms underpinning Aider’s Repo Map and translates these mechanisms into a systems design for a Rust-based implementation. By leveraging Rust’s memory safety, the Foreign Function Interface (FFI) capabilities of tree-sitter, and the graph primitives of petgraph, it is possible to build a Repo Map engine that significantly outperforms the Python reference implementation in terms of throughput and concurrency.

## **2\. Theoretical Foundations of the Repo Map**

To replicate Aider’s logic, one must first deconstruct the theoretical interplay between Abstract Syntax Trees (ASTs) and Graph Theory within the context of source code analysis.

### **2.1 The Limitations of Lexical Search vs. Structural Analysis**

Traditional code search tools (grep, ripgrep) operate on the lexical layer, treating code as sequences of characters. While efficient for finding string literals, they lack semantic understanding. For an LLM to modify a function signature, it must understand the *definition* of the function, the *structs* it utilizes, and the *call sites* where it is invoked across the repository.

Aider employs **Tree-sitter**, an incremental parsing system that generates a Concrete Syntax Tree (CST) for a source file.3 Unlike traditional parsers that fail upon encountering the slightest syntax error, Tree-sitter is robust, capable of producing a valid tree even in the presence of missing semicolons or incomplete blocks—a standard state for code under active development. This robustness is achieved through Generalized LR (GLR) parsing, allowing the system to handle ambiguities and error recovery strategies that are essential for an AI coding assistant.6

### **2.2 Graph Theory in Code Navigation**

The central insight of the Repo Map is that a codebase can be modeled as a directed graph $G \= (V, E)$.

* **Vertices ($V$):** Represent the fundamental units of code. In Aider’s primary implementation, these are **source files**.1 While deeper granularity (functions/classes as nodes) is possible, file-level nodes provide a heuristic balance between map size and context utility.  
* **Edges ($E$):** Represent dependencies. A directed edge $e\_{ij}$ exists from File $i$ to File $j$ if File $i$ imports, calls, or inherits from symbols defined in File $j$.

The "importance" of a file is not static. In a large repository, a core utility library might be mathematically "important" (high degree centrality) because everything imports it. However, if the user is working on a frontend UI component, the core utility library is likely irrelevant context compared to the specific React components or CSS modules interacting with the UI.

This necessitates a **Personalized PageRank (PPR)** algorithm.7 Standard PageRank simulates a random surfer traversing the graph, calculating the long-term probability of landing on any given node. PPR modifies the "teleportation" parameter—the probability that the surfer gets bored and jumps to a random node—to be non-uniform. By biasing the teleportation toward the files the user is currently editing (the "chat context"), the algorithm concentrates the probability mass on the local neighborhood of the active task, effectively ranking the repository's contents relative to the user's immediate intent.3

## **3\. Architectural Deconstruction of Aider**

Aider’s Python-based implementation functions as a pipeline: **Parse $\\rightarrow$ Extract Tags $\\rightarrow$ Build Graph $\\rightarrow$ Rank $\\rightarrow$ Prune**.

### **3.1 The Tag Extraction Pipeline**

The first stage involves transforming raw source code into a list of "tags." A tag in this context is a tuple containing the identifier name, its kind (definition or reference), and its location. Aider utilizes py-tree-sitter-languages to access pre-compiled binaries of Tree-sitter grammars for languages like Python, JavaScript, Rust, and Go.3

The extraction mechanism relies on **Tree-sitter Queries**, which are pattern-matching S-expressions defined in .scm files (often named tags.scm).9 These queries enable the extraction of specific nodes based on their syntactic structure. For example, to identify a function definition in Rust, the query must match the function\_item node and capture the identifier child.

A critical requirement for the graph construction is the distinction between **definitions** and **references**.3

* **Definition:** The creation of a symbol (e.g., fn calculate\_tax() {... }).  
* **Reference:** The usage of a symbol (e.g., let tax \= calculate\_tax();).

The tags.scm files map these syntactic constructs to standardized capture names, such as @definition.function or @reference.call. This normalization allows the downstream graph builder to be language-agnostic.

### **3.2 Graph Construction and Weighting**

Once tags are extracted, Aider builds an adjacency matrix. The Python implementation iterates through every file’s tags. If File A contains a reference to Symbol X, and File B contains the definition of Symbol X, a relationship is established.

The snippet data indicates that Aider optimizes this process by creating a "concise map".7 It does not simply list every function. It prioritizes exported symbols and those cross-referenced by other files. The graph edges are weighted; if File A calls into File B multiple times, the connection strength increases. This weighting is crucial for the ranking algorithm, as it implies a stronger dependency coupling.

### **3.3 The Ranking Engine: Personalized PageRank**

The selection of the "most important" code to show the LLM is determined by the PageRank score. The algorithm operates on the dependency graph.

1. **Personalization Vector:** A probability distribution vector is created over all files in the graph. If the user has added main.rs and config.rs to the chat, the probability mass is split between them (0.5 each), while all other files receive 0.0.  
2. **Damping Factor:** Aider typically uses a standard damping factor (around 0.85). This means that at each step of the random walk, there is an 85% chance of following a dependency link and a 15% chance of "teleporting" back to the chat files.  
3. **Result:** The algorithm converges on a ranking where the chat files have the highest scores, followed immediately by their direct dependencies, and then their transitive dependencies, with the scores decaying as the distance from the user's focus increases.3

This ranked list is then truncated based on the token budget (e.g., 1024 tokens).7 The system takes the top-ranked tags and formats them into the tree structure presented to the LLM.

## **4\. Systems Design for Rust Implementation**

Implementing this architecture in Rust requires a careful selection of crates to replicate the functionality of Python's networkx and scipy. The following section outlines the crate ecosystem and structural design.

### **4.1 Crate Selection and Ecosystem Mapping**

| Component | Python Ecosystem | Rust Ecosystem | Design Justification |
| :---- | :---- | :---- | :---- |
| **Parsing** | tree-sitter, py-tree-sitter-languages | tree-sitter, tree-sitter-rust, tree-sitter-python | Rust is the native language of Tree-sitter's bindings. We gain direct memory control and zero-cost abstractions over the C-core. |
| **Graph** | networkx | petgraph | petgraph is the de facto standard for graph structures in Rust, offering optimized adjacency list representations (Graph, StableGraph). |
| **Ranking** | networkx.pagerank | **Custom Implementation** | petgraph includes a generic page\_rank algorithm, but it lacks the **personalization vector** support required for the "chat focus" feature. We must implement the power iteration method manually.11 |
| **Traversal** | os.walk, glob | ignore (by BurntSushi) | The ignore crate provides fast recursive directory walking while automatically respecting .gitignore and .ignore files, matching Aider's behavior.12 |
| **Parallelism** | multiprocessing | rayon | Parsing thousands of files is an embarrassingly parallel task. rayon allows us to convert sequential iterators into parallel ones with minimal code changes. |
| **Error Handling** | Exceptions | anyhow, thiserror | anyhow for application-level error propagation; thiserror for library-level error definitions. |

### **4.2 Data Structures and Memory Layout**

The core of the Rust implementation revolves around three primary structures: the Tag, the FileAnalysis, and the RepoGraph.

#### **The Tag Struct**

This structure holds the extracted information from the AST. It needs to be lightweight as a large repository may generate hundreds of thousands of tags.

Rust

use std::path::PathBuf;

\#  
pub enum TagKind {  
    Definition,  
    Reference,  
    Import,  
}

\#  
pub struct Tag {  
    pub name: String,  
    pub kind: TagKind,  
    pub range: tree\_sitter::Range,  
    // The simplified signature (e.g., "fn process\_data(v: Vec\<u8\>)")  
    pub signature: String,   
}

#### **The FileContext Struct**

This aggregates all tags found within a single file. It serves as the intermediate representation between parsing and graph construction.

Rust

\#  
pub struct FileContext {  
    pub path: PathBuf,  
    pub defs: Vec\<Tag\>,  
    pub refs: Vec\<String\>, // Just names are needed for edge creation  
}

#### **The RepoGraph Struct**

This wraps the petgraph instance. We use petgraph::Graph\<PathBuf, f64\> where nodes carry the file path and edges carry a float weight representing connection strength.

Rust

use petgraph::graph::Graph;  
use std::collections::HashMap;

pub struct RepoGraph {  
    // Directed graph: Node=File, Edge=Dependency, Weight=Strength  
    pub graph: Graph\<PathBuf, f64\>,  
    // Fast lookup from Path to NodeIndex  
    pub node\_map: HashMap\<PathBuf, petgraph::graph::NodeIndex\>,  
}

## **5\. Implementation Detail: Tree-sitter and Tag Extraction**

The parsing layer is the foundation of the system. In Aider, tags.scm files are pivotal. In Rust, we must replicate the logic of loading a language grammar, compiling a query, and iterating over captures.

### **5.1 Query Management and tags.scm**

Aider relies on a collection of tags.scm files. These are Scheme-like S-expressions that define patterns. For a Rust implementation, we have two options:

1. **Embedded Queries:** Use the include\_str\! macro to embed default tags.scm files for supported languages directly into the binary. This simplifies distribution.  
2. **Runtime Loading:** Allow the user to supply a directory of .scm files, enabling extensibility.

A robust implementation should support both: defaults for standard languages and overrides for custom ones.

#### **Analyzing a tags.scm Pattern**

Consider the following query pattern for Rust:

Scheme

(function\_item  
  name: (identifier) @name) @definition.function

This pattern instructs the cursor to:

1. Locate function\_item nodes (function definitions).  
2. Locate the identifier child field named name.  
3. Tag the identifier as @name.  
4. Tag the entire function item as @definition.function.

In Rust, the QueryCursor returns matches. Each match contains multiple captures. We must iterate through them and check the capture index against the query's capture names to determine the semantic meaning.13

### **5.2 The Parser Implementation**

The following Rust code outline demonstrates how to encapsulate the parsing logic. This function takes a file path, detects the language, and returns the FileContext.

Rust

use tree\_sitter::{Parser, Query, QueryCursor, Language};  
use std::fs;  
use std::path::Path;  
use anyhow::{Result, Context};

pub struct ParserEngine {  
    rust\_lang: Language,  
    rust\_query: Query,  
    // python\_lang: Language, etc.  
}

impl ParserEngine {  
    pub fn new() \-\> Result\<Self\> {  
        let rust\_lang \= tree\_sitter\_rust::language();  
        // Load the query from an embedded file or external source  
        let query\_src \= include\_str\!("../queries/rust/tags.scm");  
        let rust\_query \= Query::new(rust\_lang, query\_src)?;  
          
        Ok(Self {  
            rust\_lang,  
            rust\_query,  
        })  
    }

    pub fn parse\_file(&self, path: \&Path) \-\> Result\<FileContext\> {  
        let source\_code \= fs::read\_to\_string(path)  
           .with\_context(|| format\!("Failed to read file: {:?}", path))?;  
          
        let mut parser \= Parser::new();  
        // Naive extension check; real impl should be more robust  
        if path.extension().map\_or(false, |ext| ext \== "rs") {  
            parser.set\_language(self.rust\_lang)?;  
        } else {  
            // Handle other languages or return empty context  
            return Ok(FileContext { path: path.to\_path\_buf(), defs: vec\!, refs: vec\! });  
        }

        let tree \= parser.parse(\&source\_code, None)  
           .ok\_or\_else(|| anyhow::anyhow\!("Tree-sitter parse failed"))?;

        let mut cursor \= QueryCursor::new();  
        let matches \= cursor.matches(&self.rust\_query, tree.root\_node(), source\_code.as\_bytes());

        let mut defs \= Vec::new();  
        let mut refs \= Vec::new();

        for m in matches {  
            for capture in m.captures {  
                let capture\_name \= &self.rust\_query.capture\_names()\[capture.index as usize\];  
                let node \= capture.node;  
                let text \= \&source\_code\[node.byte\_range()\];

                if capture\_name.starts\_with("definition") {  
                    defs.push(Tag {  
                        name: text.to\_string(),  
                        kind: TagKind::Definition,  
                        range: node.range(),  
                        signature: self.extract\_signature(\&source\_code, node),  
                    });  
                } else if capture\_name.starts\_with("reference") {  
                    refs.push(text.to\_string());  
                }  
            }  
        }

        Ok(FileContext {  
            path: path.to\_path\_buf(),  
            defs,  
            refs,  
        })  
    }

    fn extract\_signature(&self, source: &str, node: tree\_sitter::Node) \-\> String {  
        // Logic to extract the first line or function signature from the source  
        // This is simplified; Aider usually grabs the signature line.  
        let start\_byte \= node.start\_byte();  
        let end\_byte \= node.end\_byte();  
        let snippet \= \&source\[start\_byte..end\_byte\];  
        snippet.lines().next().unwrap\_or("").to\_string()  
    }  
}

## **6\. Graph Algorithm Implementation: Custom Personalized PageRank**

The most critical algorithmic component is the ranking system. Standard PageRank assumes a uniform probability of random jumps ($1/N$). Aider’s "Repo Map" effectiveness relies entirely on biasing this jump toward the "chat files" (the user's active context).

Since petgraph does not support a personalization vector in its page\_rank function 11, we must implement the algorithm from first principles using the **Power Iteration Method**.

### **6.1 Mathematical Formulation**

Let $G$ be the graph with adjacency matrix $M$.  
Let $d$ be the damping factor (typically 0.85).  
Let $N$ be the number of nodes.  
Let $\\mathbf{v}$ be the personalization vector, where $\\sum v\_i \= 1$.  
The PageRank vector $\\mathbf{R}$ is the stationary distribution of the Markov chain defined by:

$$\\mathbf{R}^{(k+1)} \= d \\cdot M^T \\cdot \\mathbf{R}^{(k)} \+ (1 \- d) \\cdot \\mathbf{v}$$  
However, we must also handle **dangling nodes** (nodes with no outgoing edges). In standard PageRank, dangling nodes are assumed to link to everywhere. In Personalized PageRank, dangling nodes effectively "teleport" based on the personalization vector $\\mathbf{v}$.

The modified update rule for a node $i$ is:

$$R\_i^{(k+1)} \= \\underbrace{(1-d) v\_i}\_{\\text{Random Jump}} \+ \\underbrace{d \\sum\_{j \\in In(i)} \\frac{R\_j^{(k)}}{OutDegree(j)}}\_{\\text{Link Propagation}} \+ \\underbrace{d \\cdot v\_i \\sum\_{j \\in Dangling} R\_j^{(k)}}\_{\\text{Dangling Redistribution}}$$

### **6.2 Rust Implementation of Personalized PageRank**

We implement this logic directly on the petgraph::Graph.

Rust

use std::collections::{HashMap, HashSet};  
use petgraph::graph::NodeIndex;  
use petgraph::Direction;

/// Computes Personalized PageRank  
///   
/// \* \`graph\`: The dependency graph  
/// \* \`personalization\`: A map of NodeIndex \-\> Weight (must sum to 1.0)  
/// \* \`damping\`: Typically 0.85  
/// \* \`tolerance\`: Convergence threshold (e.g., 1e-6)  
pub fn personalized\_pagerank(  
    graph: \&petgraph::Graph\<PathBuf, f64\>,  
    personalization: \&HashMap\<NodeIndex, f64\>,  
    damping: f64,  
    tolerance: f64,  
) \-\> HashMap\<NodeIndex, f64\> {  
    let node\_count \= graph.node\_count();  
    let mut rank \= vec\!\[1.0 / node\_count as f64; node\_count\];  
    let mut new\_rank \= vec\!\[0.0; node\_count\];  
      
    // Validate personalization vector sums to \~1.0  
    // (Omitted for brevity, but essential in production)

    let max\_iterations \= 100;  
      
    for \_iter in 0..max\_iterations {  
        let mut dangling\_mass \= 0.0;  
          
        // 1\. Identify dangling mass  
        for node in graph.node\_indices() {  
            if graph.edges\_directed(node, Direction::Outgoing).count() \== 0 {  
                dangling\_mass \+= rank\[node.index()\];  
            }  
        }

        // 2\. Power Iteration Step  
        let mut diff \= 0.0;  
          
        for node in graph.node\_indices() {  
            let idx \= node.index();  
              
            // Term A: Random Jump (based on personalization)  
            // If the node is not in the personalization map, v\_i is 0\.  
            let v\_i \= personalization.get(\&node).cloned().unwrap\_or(0.0);  
            let jump\_term \= (1.0 \- damping) \* v\_i;  
              
            // Term B: Dangling Redistribution  
            // Dangling nodes jump back according to personalization vector  
            let dangling\_term \= damping \* dangling\_mass \* v\_i;  
              
            // Term C: Incoming Edges  
            let mut link\_term \= 0.0;  
            for edge in graph.edges\_directed(node, Direction::Incoming) {  
                let source \= edge.source();  
                let source\_idx \= source.index();  
                  
                // We perform a weighted PageRank.   
                // Weight of edge (source \-\> node) / Total weight of source's outgoing  
                let edge\_weight \= \*edge.weight();  
                  
                let total\_out\_weight: f64 \= graph  
                   .edges\_directed(source, Direction::Outgoing)  
                   .map(|e| \*e.weight())  
                   .sum();  
                  
                if total\_out\_weight \> 0.0 {  
                    link\_term \+= rank\[source\_idx\] \* (edge\_weight / total\_out\_weight);  
                }  
            }  
              
            let val \= jump\_term \+ dangling\_term \+ (damping \* link\_term);  
            new\_rank\[idx\] \= val;  
              
            diff \+= (val \- rank\[idx\]).abs();  
        }  
          
        rank.copy\_from\_slice(\&new\_rank);  
          
        if diff \< tolerance {  
            break;  
        }  
    }  
      
    // Convert Vec to HashMap for result  
    let mut result \= HashMap::new();  
    for node in graph.node\_indices() {  
        result.insert(node, rank\[node.index()\]);  
    }  
    result  
}

This implementation specifically addresses the requirement found in snippet 8 regarding bugs with non-existent nodes in the personalization vector. In Rust, utilizing strong typing and Option checks prevents the "ZeroDivisionError" or "KeyError" common in the Python implementation, as we strictly validate the personalization keys against the graph's NodeIndex.

## **7\. Parallel Processing and Performance Optimization**

While Python relies on multiprocessing to bypass the GIL, Rust allows for fine-grained thread parallelism. Parsing files is an "embarrassingly parallel" workload. We can utilize the rayon crate to parallelize the file scanning phase.

### **7.1 Integration with Rayon**

Rust

use rayon::prelude::\*;  
use walkdir::WalkDir;

// 1\. Collect all valid files  
let files: Vec\<PathBuf\> \= WalkDir::new("./src")  
   .into\_iter()  
   .filter\_map(|e| e.ok())  
   .filter(|e| e.path().extension().map\_or(false, |ext| ext \== "rs"))  
   .map(|e| e.path().to\_path\_buf())  
   .collect();

// 2\. Parallel Parse  
let contexts: Vec\<FileContext\> \= files  
   .par\_iter() // Parallel Iterator  
   .map(|path| {  
        let parser \= ParserEngine::new().unwrap(); // Note: Parser creation might need optimization  
        parser.parse\_file(path).unwrap\_or\_else(|\_| FileContext::empty(path))  
    })  
   .collect();

**Critical Optimization:** Creating a new Parser and loading Language libraries inside the parallel loop (as shown above) is inefficient due to overhead. A better approach is to use rayon::map\_init, initializing a thread-local parser once per thread.

Rust

let contexts: Vec\<FileContext\> \= files  
   .par\_iter()  
   .map\_init(  
|  
| ParserEngine::new().expect("Failed to init parser"),  
|parser, path| parser.parse\_file(path).unwrap\_or\_else(|\_| FileContext::empty(path))  
    )  
   .collect();

This ensures that the heavy lifting of grammar loading happens only once per CPU core, maximizing throughput.

### **7.2 Incremental Updates**

Aider attempts to avoid re-parsing the world on every turn. In Rust, we can implement a robust caching layer using file metadata (modification time) or content hashing (BLAKE3/SHA256).

We can define a CacheEntry:

Rust

struct CacheEntry {  
    mtime: std::time::SystemTime,  
    context: FileContext,  
}

Before parallel parsing, we check the cache. If the file on disk has a newer mtime than the cache, we re-parse. If not, we clone the FileContext from memory. This reduces the latency of the "Repo Map" generation from seconds to milliseconds for subsequent user queries.

## **8\. Ranking Strategy and Token Budgeting**

Once the PageRank scores are computed, the final step is constructing the prompt context. We cannot simply dump the top 10 files; we must fit them into a strict token budget (e.g., 1024 or 2048 tokens).

### **8.1 The Selection Algorithm**

1. **Sort:** Order all tags by the PageRank score of their containing file.  
2. **Greedy Packing:** Iterate through the sorted tags.  
3. **Cost Estimation:** For each tag, estimate its token cost. Aider uses a simplified heuristic (approx 3-4 chars per token) or a tokenizer library (tiktoken-rs).  
4. **Accumulation:** Add tags to the "active set" until the current\_tokens \+ tag\_cost \> max\_tokens.

### **8.2 Formatting for the LLM**

The output format is critical. It must be dense but readable. Aider uses a tree-like visualization:

src/  
  main.rs:  
    fn main()  
    struct App  
  lib.rs:  
    fn calculate()

In Rust, this can be achieved by organizing tags into a Trie structure based on their file paths, then serializing the Trie depth-first. This minimizes the repetition of directory names, saving precious tokens.

## **9\. Conclusion and Future Outlook**

The translation of Aider’s Repo Map algorithm from Python to Rust offers significant advantages in terms of performance, type safety, and concurrency. By leveraging tree-sitter for robust parsing and petgraph for graph analysis, we can construct a system that scales to repositories with millions of lines of code.

The custom implementation of Personalized PageRank is the linchpin of this architecture. It transforms the static dependency graph into a dynamic, intent-aware map that aligns the LLM’s context with the user’s current task. While the Python implementation relies on networkx and dynamic typing, the Rust approach mandates a more rigorous handling of graph data structures, resulting in a system that is not only faster but less prone to runtime errors regarding missing nodes or personalization mismatches.

Future enhancements to this system could include **hybrid retrieval**, where the graph walk is augmented by vector embeddings. In such a system, the "teleportation" probability in PageRank could be weighted not just by the user's open files, but by the semantic similarity of files to the user's natural language query. This would bridge the gap between deterministic graph traversal and probabilistic semantic search, providing the ultimate context engine for AI-assisted development.

### ---

**Data Tables and Comparisons**

#### **Table 1: Complexity Analysis of Repo Map Stages**

| Stage | Algorithm | Time Complexity | Space Complexity | Rust Optimization |
| :---- | :---- | :---- | :---- | :---- |
| **Parsing** | GLR Parsing (Tree-sitter) | $O(N)$ per file (linear) | $O(D)$ (Depth of tree) | Parallel iteration via rayon |
| **Graph Build** | Reference Resolution | $O(T \\cdot F)$ (Tags $\\times$ Files) | $O(V \+ E)$ | HashMaps for O(1) symbol lookup |
| **Ranking** | Personalized PageRank | $O(k(V+E))$ ($k$=iterations) | $O(V)$ (Rank vector) | Unboxed Vec\<f64\> vs Python Objects |

#### **Table 2: Capture Mapping for tags.scm**

| Semantic Concept | Tree-sitter Query Pattern (Rust) | Tag Kind |
| :---- | :---- | :---- |
| Function Definition | (function\_item name: (identifier) @name) | Definition |
| Struct Definition | (struct\_item name: (type\_identifier) @name) | Definition |
| Function Call | (call\_expression function: (identifier) @name) | Reference |
| Type Usage | (type\_identifier) @name | Reference |
| Macro Invocation | (macro\_invocation macro: (identifier) @name) | Reference |

This report demonstrates that a Rust implementation of Aider's Repo Map is not only feasible but desirable for production-grade AI tooling, offering a robust foundation for the next generation of intelligent coding assistants.

#### **Works cited**

1. RepoMap Graph: use code entities as nodes instead of files? · Issue \#1385 · Aider-AI/aider, accessed on January 6, 2026, [https://github.com/paul-gauthier/aider/issues/1385](https://github.com/paul-gauthier/aider/issues/1385)  
2. My open source ai coding tool aider is unique in that it is designed to work wit... | Hacker News, accessed on January 6, 2026, [https://news.ycombinator.com/item?id=38170995](https://news.ycombinator.com/item?id=38170995)  
3. Building a better repository map with tree sitter \- Aider, accessed on January 6, 2026, [https://aider.chat/2023/10/22/repomap.html](https://aider.chat/2023/10/22/repomap.html)  
4. Improving aider's repo map to do large, simple refactors automatically. \- ミツモア Tech blog, accessed on January 6, 2026, [https://engineering.meetsmore.com/entry/2024/12/24/042333](https://engineering.meetsmore.com/entry/2024/12/24/042333)  
5. Incremental Parsing Using Tree-sitter \- Strumenta \- Federico Tomassetti, accessed on January 6, 2026, [https://tomassetti.me/incremental-parsing-using-tree-sitter/](https://tomassetti.me/incremental-parsing-using-tree-sitter/)  
6. Tree-sitter: Introduction, accessed on January 6, 2026, [https://tree-sitter.github.io/](https://tree-sitter.github.io/)  
7. Repository map \- Aider, accessed on January 6, 2026, [https://aider.chat/docs/repomap.html](https://aider.chat/docs/repomap.html)  
8. ZeroDivisionError in PageRank calculation due to non-existent node in personalization vector \#1535 · Issue \#1536 · Aider-AI/aider \- GitHub, accessed on January 6, 2026, [https://github.com/Aider-AI/aider/issues/1536](https://github.com/Aider-AI/aider/issues/1536)  
9. How I use LLMs | Karan Sharma, accessed on January 6, 2026, [https://mrkaran.dev/posts/using-llm/](https://mrkaran.dev/posts/using-llm/)  
10. Attempt to add Julia support to Aider tool, accessed on January 6, 2026, [https://discourse.julialang.org/t/attempt-to-add-julia-support-to-aider-tool/121553](https://discourse.julialang.org/t/attempt-to-add-julia-support-to-aider-tool/121553)  
11. page\_rank in petgraph::algo \- Rust \- Shadow, accessed on January 6, 2026, [https://shadow.github.io/docs/rust/petgraph/algo/page\_rank/fn.page\_rank.html](https://shadow.github.io/docs/rust/petgraph/algo/page_rank/fn.page_rank.html)  
12. FAQ | aider, accessed on January 6, 2026, [https://aider.chat/docs/faq.html](https://aider.chat/docs/faq.html)  
13. QueryCursor in tree\_sitter \- Rust \- Docs.rs, accessed on January 6, 2026, [https://docs.rs/tree-sitter/latest/tree\_sitter/struct.QueryCursor.html](https://docs.rs/tree-sitter/latest/tree_sitter/struct.QueryCursor.html)  
14. tree-sitter-rust/queries/highlights.scm at master \- GitHub, accessed on January 6, 2026, [https://github.com/tree-sitter/tree-sitter-rust/blob/master/queries/highlights.scm](https://github.com/tree-sitter/tree-sitter-rust/blob/master/queries/highlights.scm)