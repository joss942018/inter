"use client";

import { createContext, useEffect, useState, useCallback } from "react";

export type TypeTheme = "light" | "dark";

interface IThemeContext {
  theme: TypeTheme;
  setTheme: (theme: TypeTheme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext({} as IThemeContext);

interface Props {
  children: React.ReactNode;
}

const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<TypeTheme>("light");

  useEffect(() => {
    const lSTheme = localStorage.getItem("theme");
    if (
      lSTheme === "dark" ||
      (!lSTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    document.querySelector("html")?.setAttribute("data-theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider };
export default ThemeContext;
