"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { RiSunLine, RiMoonLine } from "react-icons/ri";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-8 h-8 rounded-full" />; // placeholder
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      aria-label="Toggle Theme"
      className="p-2 rounded-full text-text-2 hover:text-text hover:bg-surface-2 transition-all duration-200 cursor-pointer flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-accent/30"
      onClick={toggleTheme}
    >
      {theme === "light" ? (
        <RiMoonLine size={20} />
      ) : (
        <RiSunLine size={20} />
      )}
    </button>
  );
}
