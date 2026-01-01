// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod hash;
use tauri::command;

#[command]
fn compute_hash(path: String) -> Result<String, String> {
    hash::hash_file(&path).map_err(|e| e.to_string())
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![compute_hash])
        .run(tauri::generate_context!())
        .expect("error while running HashGuard");
}
