import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      yellow: "#ffd700", // from top left
      "yellow-dark": "#C49216", // from second top left
      "orange-yellow": "#DDB900", // from third top left
      brown: "#8b5a00", // from top right
      black: "#1c1c1c", // from bottom left
      "gray-dark": "#2e2e2e", // from second bottom left
      gray: "#c7c7c7", // from third bottom left
      "gray-light": "#9e9e9e", // from bottom right
      white: "#ffffff",
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      keyframes: {
        carousel: {
          "0%, 100%": { transform: "translateY(0)" },
          "33%": { transform: "translateY(-100%)" },
          "66%": { transform: "translateY(-200%)" },
        },
      },
      animation: {
        carousel: "carousel 6s ease-in-out infinite",
      },
    },
  },

  darkMode: "class",
  plugins: [nextui()],
};
