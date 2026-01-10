use std::process::Command;
use std::path::PathBuf;
use serde_json::Value;
use std::fs;

fn setup_repo(repo_path: &PathBuf) {
    let _ = fs::remove_dir_all(repo_path);
    fs::create_dir_all(repo_path.join("src")).unwrap();
    fs::create_dir_all(repo_path.join("web")).unwrap();
    
    fs::write(repo_path.join("src/main.rs"), "fn main() { let u = User { id: 1 }; utils::helper(); }").unwrap();
    fs::write(repo_path.join("src/utils.rs"), "pub fn helper() {}").unwrap();
    fs::write(repo_path.join("src/models.rs"), "pub struct User { id: u32 }").unwrap();
    fs::write(repo_path.join("web/app.ts"), "import { fetchData } from './api'; fetchData();").unwrap();
    fs::write(repo_path.join("web/api.ts"), "export function fetchData() {}").unwrap();
    
    // Add a check to verify files exist
    assert!(repo_path.join("web/api.ts").exists());
}

#[test]
fn test_ranking_integration() {
    let mut bin_path = PathBuf::from(env!("CARGO_MANIFEST_DIR"));
    bin_path.push("../../target/debug/roost_bin");

    let repo_path = PathBuf::from(env!("CARGO_MANIFEST_DIR"))
        .join("tests/integration_repo_temp");

    setup_repo(&repo_path);

    let output = Command::new(bin_path)
        .arg("--path")
        .arg(&repo_path)
        .arg("--json")
        .output()
        .expect("Failed to execute roost_bin");

    assert!(output.status.success(), "roost_bin failed: {}", String::from_utf8_lossy(&output.stderr));

    let stdout_str = String::from_utf8_lossy(&output.stdout);
    let json_start = stdout_str.find('{').expect("No JSON object found in output");
    let json_str = &stdout_str[json_start..];
    let json: Value = serde_json::from_str(json_str).expect(&format!("Failed to parse JSON output: {}. Raw: {}", json_str, String::from_utf8_lossy(&output.stderr)));
    
    let files = json["files"].as_array().expect("Missing files array");
    assert!(!files.is_empty(), "No files ranked. JSON: {}", json);

    // Verify main.rs is present
    let main_rs = files.iter().find(|f| f["path"].as_str().unwrap().contains("main.rs")).expect("main.rs not found in ranking");
    assert!(main_rs["score"].as_f64().unwrap() > 0.0);
    
    // Verify models.rs is present and has definitions
    let models_rs = files.iter().find(|f| f["path"].as_str().unwrap().contains("models.rs")).expect("models.rs not found in ranking");
    assert!(!models_rs["definitions"].as_array().unwrap().is_empty(), "models.rs should have definitions");

    // Verify edges exist
    let edges = json["edges"].as_array().expect("Missing edges array");
    assert!(!edges.is_empty(), "No edges found in graph");
    
    let _ = fs::remove_dir_all(repo_path);
}

#[test]
fn test_ranking_with_focus() {
    let mut bin_path = PathBuf::from(env!("CARGO_MANIFEST_DIR"));
    bin_path.push("../../target/debug/roost_bin");

    let repo_path = PathBuf::from(env!("CARGO_MANIFEST_DIR"))
        .join("tests/integration_repo_focus_v2");

    setup_repo(&repo_path);

    // Focus on api.ts
    let output = Command::new(&bin_path)
        .arg("--path")
        .arg(&repo_path)
        .arg("--focus")
        .arg("web/api.ts")
        .arg("--json")
        .output()
        .expect("Failed to execute roost_bin");

    let stdout_str = String::from_utf8_lossy(&output.stdout);
    let stderr_str = String::from_utf8_lossy(&output.stderr);

    if !output.status.success() {
        panic!("roost_bin failed with status {}. Stderr: {}", output.status, stderr_str);
    }

    let json_start = stdout_str.find('{').expect(&format!("No JSON object found in output. Stdout: {}. Stderr: {}", stdout_str, stderr_str));
    let json_str = &stdout_str[json_start..];
    let json: Value = serde_json::from_str(json_str).expect("Failed to parse JSON");
    let files = json["files"].as_array().expect("Missing files array");
    
    // Check if we found ANY file from web/
    let found_web = files.iter().any(|f| {
        let p = f["path"].as_str().unwrap();
        p.contains("web")
    });
    assert!(found_web, "No files from web/ found in ranking. Files: {:?}", files);
    
    let _ = fs::remove_dir_all(repo_path);
}
