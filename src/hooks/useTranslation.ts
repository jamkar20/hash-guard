import { useState, useEffect } from "react";
import { i18n } from "../i18n";

export const useTranslation = () => {
  const [lang, setLang] = useState(i18n.currentLanguage);

  useEffect(() => {
    const unsubscribe = i18n.subscribe(() => {
      setLang(i18n.currentLanguage);
    });

    return unsubscribe;
  }, []);

  const t = (key: string, params?: Record<string, string | number>) => {
    return i18n.t(key, params);
  };

  const changeLanguage = (newLang: "fa" | "en") => {
    i18n.changeLanguage(newLang);
  };

  return {
    t,
    language: lang,
    direction: i18n.direction,
    changeLanguage,
    formatNumber: i18n.formatNumber,
    formatDate: i18n.formatDate,
  };
};
