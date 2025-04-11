import React from "react";

interface ThemeToggleProps {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

function ThemeToggle({ theme, setTheme }: ThemeToggleProps) {
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    // Update React state
    setTheme(newTheme);
    // Update the cookie
    document.cookie = `preferredTheme=${newTheme}; path=/`;
  };

  return (
    <button onClick={toggleTheme}>
      {theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
    </button>
  );
}

export default ThemeToggle;
