import { FC } from "react";
import { useTheme } from "../hooks/useTheme";
import { Monitor, Moon, Sun1 } from "iconsax-reactjs";

export const ThemeSwitcher: FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <span
      className="p-1 py-2 bg-zinc-300 hover:bg-zinc-400 transition-all duration-300 hover:dark:bg-zinc-600 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-s-md cursor-pointer flex items-center justify-center"
      onClick={toggleTheme}
    >
      {theme === "light" && <Sun1 size={16} />}
      {theme === "dark" && <Moon size={16} />}
      {theme === "system" && <Monitor size={16} />}
    </span>
  );
};
