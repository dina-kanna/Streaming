
import { createContext, useContext, useEffect } from "react";

const ThemeContext = createContext({
  darkMode: true,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
  useEffect(() => {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }, []);

  const value = {
    darkMode: true,
    toggleTheme: () => {},
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);