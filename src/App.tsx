import { useState } from "react";
import { open } from "@tauri-apps/plugin-dialog";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { Hashbox } from "./component/hashbox";

function App() {
  const [filePath, setFilePath] = useState<string | null>(null);
  const [sha2, setSha2] = useState<string>("");
  const [sha1, setSha1] = useState<string>("");
  const [md5, setMd5] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  async function selectFile() {
    const selected = await open({
      multiple: false,
      title: "Select file to hash",
    });

    if (typeof selected === "string") {
      setFilePath(selected);
      setSha1("");
      setSha2("");
      setMd5("");
      setError("");
    }
  }

  async function computeHash() {
    if (!filePath) return;

    try {
      setLoading(true);
      const result = await invoke<Array<string>>("compute_hash", {
        path: filePath,
      });
      setSha2(result[0]);
      setSha1(result[1]);
      setMd5(result[2]);
    } catch (e: any) {
      setError(e.toString());
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center text-zinc-100">
      <div className="w-full max-w-xl rounded-xl bg-zinc-800 shadow-xl p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">HashGuard</h1>
          <p className="text-sm text-zinc-400">
            File Integrity Checker (SHA1 - SHA2 - MD5)
          </p>
        </div>

        {/* File selector */}
        <div className="space-y-3">
          <button
            onClick={selectFile}
            className="w-full rounded-lg bg-zinc-700 hover:bg-zinc-600 transition px-4 py-2 text-sm"
          >
            📂 Select File
          </button>

          {filePath && (
            <div className="text-xs text-zinc-400 break-all bg-zinc-900 rounded p-2">
              {filePath}
            </div>
          )}
        </div>

        {/* Action */}
        {filePath && (
          <button
            onClick={computeHash}
            disabled={loading}
            className={`mt-4 w-full rounded-lg px-4 py-2 text-sm font-medium transition
              ${
                loading
                  ? "bg-blue-600 opacity-70 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-500"
              }
            `}
          >
            {loading ? "Computing…" : "Compute Hash"}
          </button>
        )}

        {/* Result */}
        {sha1 && <Hashbox title="SHA-1" value={sha1} />}
        {sha2 && <Hashbox title="SHA-256" value={sha2} />}
        {md5 && <Hashbox title="MD5" value={md5} />}

        {/* Error */}
        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
      </div>
      <Toaster />
    </div>
  );
}

export default App;
