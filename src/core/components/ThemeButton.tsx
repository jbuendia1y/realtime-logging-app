import { useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

export const ThemeButton = () => {
  const [isDark, setIsDark] = useState(
    localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark(!!document.documentElement.classList.contains("dark"));
  };

  return (
    <div className="flex flex-row items-center gap-1">
      <MdDarkMode />
      <button
        aria-label="theme-toggle"
        className="relative w-12 h-7 border-2 rounded-full border-slate-500 dark:border-white bg-slate-300 "
        onClick={toggleTheme}
      >
        <div
          className={`absolute top-0 left-0 transition-transform w-6 h-6 bg-slate-700 rounded-full ${
            isDark ? "translate-x-0" : "translate-x-[85%]"
          }`}
        ></div>
      </button>
      <MdLightMode />
    </div>
  );
};
