import { createContext, useContext, useState } from "react";

// 1. Create the context
const ThemeContext = createContext();

// 2. Child component — reads the value via useContext, no props needed
const ThemedBox = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext);

  return (
    <div
      className={`p-4 rounded-md border flex items-center justify-between ${
        isDark ? "bg-zinc-800 border-zinc-600 text-white" : "bg-white border-amber-300 text-black"
      }`}
    >
      <p className="text-sm font-medium">{isDark ? "Dark Mode" : "Light Mode"}</p>
      <button
        onClick={toggleTheme}
        className="px-3 py-1.5 rounded-md bg-amber-300 text-xs font-medium border border-amber-400 hover:bg-amber-400 transition-colors"
      >
        Toggle
      </button>
    </div>
  );
};

// 3. Parent component — creates the Provider, supplies the actual value
const DemoUseContext = () => {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <ThemedBox />
    </ThemeContext.Provider>
  );
};

export default DemoUseContext;