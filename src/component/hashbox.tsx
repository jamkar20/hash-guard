import { writeText } from "@tauri-apps/plugin-clipboard-manager";
import { Copy } from "iconsax-reactjs";
import { FC } from "react";
import toast from "react-hot-toast";

type HashboxProps = {
  title?: string;
  value?: string;
};

export const Hashbox: FC<HashboxProps> = ({ title = "", value = "" }) => {
  const handleCopy = async () => {
    await writeText(value);
    toast.success("Copied to clipboard!");
  };
  return (
    <div className="mt-2">
      <p className="text-xs text-zinc-400 mb-1">{title}</p>
      <div className="bg-black rounded-lg px-3 py-2 text-xs align-middle text-green-400 overflow-x-auto flex justify-between items-center">
        <pre>{value}</pre>
        <span className="relative end-0 text-zinc-400 transition-all duration-200 hover:bg-zinc-800 rounded p-1 cursor-pointer">
          <Copy size={16} onClick={handleCopy} />
        </span>
      </div>
    </div>
  );
};
