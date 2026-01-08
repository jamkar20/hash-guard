import { FC } from "react";
import { useTranslation } from "../hooks/useTranslation";

export const LangSwitcher: FC = () => {
  const { language, changeLanguage } = useTranslation();

  const languageNames = {
    fa: "فا",
    en: "EN",
  };

  const toggle = () => {
    if (language === "fa") {
      changeLanguage("en");
    } else {
      changeLanguage("fa");
    }
  };

  return (
    <span
      className="p-1 bg-zinc-300  hover:bg-zinc-400 transition-all duration-300 hover:dark:bg-zinc-600 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-s-md cursor-pointer"
      onClick={toggle}
    >
      {languageNames[language]}
    </span>
  );
};
