import { useState } from "react";
import { open } from "@tauri-apps/plugin-dialog";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { Hashbox } from "./component/hashbox";
import { LangSwitcher } from "./component/lang-switcher";
import { useTranslation } from "./hooks/useTranslation";
import { ThemeSwitcher } from "./component/theme-switcher";

function App() {
  const [filePath, setFilePath] = useState<string | null>(null);
  const [sha2, setSha2] = useState<string>("");
  const [sha1, setSha1] = useState<string>("");
  const [md5, setMd5] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const { t } = useTranslation();

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
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-800 dark:text-zinc-100">
      <div className="w-full max-w-xl rounded-xl bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-transparent dark:shadow-xl p-6">
        <div className="absolute end-0 flex flex-col space-y-2">
          <LangSwitcher />
          <ThemeSwitcher />
        </div>
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">{t("app.title")}</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {t("app.description")}
          </p>
        </div>

        {/* File selector */}
        <div className="space-y-3">
          <button
            onClick={selectFile}
            className="w-full rounded-lg text-zinc-100 bg-zinc-400 hover:bg-zinc-500 dark:bg-zinc-700 hover:dark:bg-zinc-600 transition px-4 py-2 text-sm"
          >
            📂 {t("select-file")}
          </button>

          {filePath && (
            <div
              className="text-xs bg-zinc-300 text-zinc-700  dark:text-zinc-400 break-all dark:bg-zinc-900 rounded p-2"
              dir="ltr"
            >
              {filePath}
            </div>
          )}
        </div>

        {/* Action */}
        {filePath && (
          <button
            onClick={computeHash}
            disabled={loading}
            className={`mt-4 w-full rounded-lg px-4 py-2 text-sm font-medium text-zinc-100 transition
              ${
                loading
                  ? "bg-blue-600 opacity-70 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-500"
              }
            `}
          >
            {loading ? t("computing") : t("compute-hash")}
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
