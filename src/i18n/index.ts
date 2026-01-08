import { getCurrentWindow } from "@tauri-apps/api/window";
import { default as en } from "./locales/en.json";
import { default as fa } from "./locales/fa.json";

export type Language = "fa" | "en";

export const translations = {
  fa,
  en,
};

class I18n {
  private currentLang: Language = "fa";
  private listeners: Array<() => void> = [];

  constructor() {
    this.loadLanguage();
  }

  private loadLanguage(): void {
    const savedLang = localStorage.getItem("lang") as Language;
    const browserLang = navigator.language.split("-")[0] as Language;

    if (savedLang && this.isValidLanguage(savedLang)) {
      this.currentLang = savedLang;
    } else if (this.isValidLanguage(browserLang)) {
      this.currentLang = browserLang;
    }

    this.applyLanguageToDOM();
  }

  private isValidLanguage(lang: string): lang is Language {
    return ["fa", "en"].includes(lang);
  }

  private applyLanguageToDOM(): void {
    document.documentElement.lang = this.currentLang;
    document.documentElement.dir = this.currentLang === "fa" ? "rtl" : "ltr";

    document.title = this.currentLang === "fa" ? translations["fa"]["app.title"] : translations["en"]["app.title"];
    const appWindow = getCurrentWindow();
    appWindow.setTitle(document.title);
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener());
  }

  get currentLanguage(): Language {
    return this.currentLang;
  }

  get direction(): "rtl" | "ltr" {
    return this.currentLang === "fa" ? "rtl" : "ltr";
  }

  t(key: string, params?: Record<string, string | number>): string {
    let ln = translations[this.currentLang];
    let text = key;
    if (Object.keys(ln).includes(key)) {
      text = (ln as any)[key];
    }

    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        text = text.replace(`{{${paramKey}}}`, String(paramValue));
      });
    }

    return text;
  }

  changeLanguage(lang: Language): void {
    if (!this.isValidLanguage(lang)) return;

    this.currentLang = lang;
    localStorage.setItem("lang", lang);
    this.applyLanguageToDOM();
    this.notifyListeners();
  }

  subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  formatNumber(num: number): string {
    if (this.currentLang === "fa") {
      return new Intl.NumberFormat("fa-IR").format(num);
    }
    return new Intl.NumberFormat("en-US").format(num);
  }

  formatDate(date: Date): string {
    if (this.currentLang === "fa") {
      return new Intl.DateTimeFormat("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date);
    }
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  }
}

export const i18n = new I18n();
