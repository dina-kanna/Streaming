
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ThemeContext = createContext({
  darkMode: true,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem("theme") !== "light";
    } catch {
      return true;
    }
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    document.body.classList.toggle("dark", darkMode);

    try {
      localStorage.setItem("theme", darkMode ? "dark" : "light");
    } catch {
      // The theme still works if browser storage is unavailable.
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((current) => !current);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
