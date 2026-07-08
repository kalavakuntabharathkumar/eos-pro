import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemeSetting = "light" | "dark" | "system";

interface ThemeContextType {
  theme: ThemeSetting;
  effectiveTheme: "light" | "dark";
  setTheme: (t: ThemeSetting) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

function getSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(effective: "light" | "dark") {
  const root = document.documentElement;
  if (effective === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeSetting>(() => {
    const stored = localStorage.getItem("eos_theme") as ThemeSetting | null;
    if (stored === "light" || stored === "dark" || stored === "system") return stored;
    return "system";
  });

  // Stateful so consumers re-render when the OS preference flips
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">(getSystemTheme);

  const effectiveTheme: "light" | "dark" = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    applyTheme(effectiveTheme);
    localStorage.setItem("eos_theme", theme);
  }, [theme, effectiveTheme]);

  // Keep systemTheme state in sync with OS changes
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      const next: "light" | "dark" = mq.matches ? "dark" : "light";
      setSystemTheme(next);
      // Only immediately apply if we are in system mode
      if (localStorage.getItem("eos_theme") === "system") applyTheme(next);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const setTheme = (t: ThemeSetting) => setThemeState(t);

  const toggleTheme = () =>
    setThemeState(prev => {
      const eff = prev === "system" ? getSystemTheme() : prev;
      return eff === "dark" ? "light" : "dark";
    });

  return (
    <ThemeContext.Provider value={{ theme, effectiveTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
