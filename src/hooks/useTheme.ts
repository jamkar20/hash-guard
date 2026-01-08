import { useCallback, useEffect, useState } from "react";

export type Theme = 'light' | 'dark';
export type ThemePreference = Theme | 'system';

interface UseThemeReturn {
  theme: ThemePreference;
  resolvedTheme: Theme;
  preference: ThemePreference;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: ThemePreference) => void;
  isSystemTheme: boolean;
}

const getSystemTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const getStoredTheme = (): ThemePreference | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('theme') as ThemePreference | null;
};

const applyThemeToDOM = (theme: Theme) => {
  const html = document.documentElement;
  
  html.classList.remove('light', 'dark');
  
  html.classList.add(theme);
  
  html.setAttribute('data-theme', theme);
  
  document.body.setAttribute('data-mode', theme);
};

export const useTheme = (defaultPreference: ThemePreference = 'system'): UseThemeReturn => {
  const [preference, setPreference] = useState<ThemePreference>(() => {
    const stored = getStoredTheme();
    return stored || defaultPreference;
  });

  const [systemTheme, setSystemTheme] = useState<Theme>(getSystemTheme());
  const [mounted, setMounted] = useState(false);

  const resolvedTheme: Theme = preference === 'system' ? systemTheme : preference;
  const isDark = resolvedTheme === 'dark';
  const isSystemTheme = preference === 'system';

  useEffect(() => {
    setMounted(true);
    
    applyThemeToDOM(resolvedTheme);
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };
    
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;
    applyThemeToDOM(resolvedTheme);
  }, [resolvedTheme, mounted]);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('theme', preference);
  }, [preference, mounted]);

  const toggleTheme = useCallback(() => {
    setPreference((prev) => {
      if (prev === 'system') {
        return systemTheme === 'light' ? 'dark' : 'light';
      }
      return prev === 'light' ? 'dark' : 'light';
    });
  }, [systemTheme]);

  const setTheme = useCallback((newTheme: ThemePreference) => {
    setPreference(newTheme);
  }, []);

  if (!mounted) {
    return {
      theme: 'light',
      resolvedTheme: 'light',
      preference,
      isDark: false,
      toggleTheme: () => {},
      setTheme: () => {},
      isSystemTheme: false,
    };
  }

  return {
    theme: preference, 
    resolvedTheme, 
    preference,
    isDark,
    toggleTheme,
    setTheme,
    isSystemTheme,
  };
};