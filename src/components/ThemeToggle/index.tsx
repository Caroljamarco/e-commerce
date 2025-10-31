import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

import { Button } from "../ui";

export function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Verifica se já existe uma preferência salva
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    // Verifica a preferência do sistema
    if (!savedTheme) {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(prefersDark);
      if (prefersDark) {
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      style={{
        width: '3rem',
        height: '3rem',
        padding: 0,
        borderRadius: '50%',
        transition: 'all 0.2s ease'
      }}
    >
      {isDarkMode ? (
        <Moon style={{ width: '1.25rem', height: '1.25rem' }} />
      ) : (
        <Sun style={{ width: '1.25rem', height: '1.25rem' }} />
      )}
      <span style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', borderWidth: 0 }}>Toggle theme</span>
    </Button>
  );
}