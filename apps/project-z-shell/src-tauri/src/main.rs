#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{fs, path::PathBuf};

#[tauri::command]
fn save_file(content: String) -> Result<String, String> {
  let mut dir: PathBuf = std::env::temp_dir();
  dir.push("project-z-shell");

  fs::create_dir_all(&dir).map_err(|e| e.to_string())?;

  let mut file_path = dir;
  file_path.push("scratch.rs");

  fs::write(&file_path, content).map_err(|e| e.to_string())?;
  Ok(file_path.to_string_lossy().to_string())
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![save_file])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
