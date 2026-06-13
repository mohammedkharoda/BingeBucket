import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Channel-based so opacity modifiers (bg-accent/10) work.
        // ── Canvas & surfaces ─────────────────────────────────────
        bg:          "rgb(var(--bg-rgb) / <alpha-value>)",
        "bg-2":      "rgb(var(--bg-2-rgb) / <alpha-value>)",
        surface:     "rgb(var(--surface-rgb) / <alpha-value>)",
        "surface-2": "rgb(var(--surface-2-rgb) / <alpha-value>)",
        "surface-3": "rgb(var(--surface-3-rgb) / <alpha-value>)",
        border:      "rgb(var(--border-rgb) / <alpha-value>)",

        // ── Text ──────────────────────────────────────────────────
        text:    "rgb(var(--text-rgb) / <alpha-value>)",
        "text-2":"rgb(var(--text-2-rgb) / <alpha-value>)",
        "text-3":"rgb(var(--text-3-rgb) / <alpha-value>)",
        "text-4":"rgb(var(--text-4-rgb) / <alpha-value>)",

        // ── Brand ─────────────────────────────────────────────────
        accent:    "rgb(var(--accent-rgb) / <alpha-value>)",
        "accent-2":"rgb(var(--accent-2-rgb) / <alpha-value>)",
        gold:      "rgb(var(--gold-rgb) / <alpha-value>)",

        // ── Semantic ──────────────────────────────────────────────
        danger:  "rgb(var(--danger-rgb) / <alpha-value>)",
        success: "rgb(var(--success-rgb) / <alpha-value>)",
        warning: "rgb(var(--warning-rgb) / <alpha-value>)",

        transparent: "transparent",
        current:     "currentColor",
        white:       "#FFFFFF",
        black:       "#000000",
      },
      fontFamily: {
        display: ["var(--font-display)", "Poppins", "sans-serif"],
        inter:   ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        sans:    ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card:  "16px",
        badge: "9999px",
      },
      boxShadow: {
        sm:           "var(--shadow-sm)",
        card:         "var(--shadow-card)",
        "card-hover": "var(--shadow-pop)",
        pop:          "var(--shadow-pop)",
        "glow-accent":"var(--glow-accent)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "brand-gradient":  "linear-gradient(120deg, var(--accent) 0%, var(--accent-2) 100%)",
      },
      keyframes: {
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        spin:  { to: { transform: "rotate(360deg)" } },
        float: { "0%, 100%": { transform: "translateY(0px)" }, "50%": { transform: "translateY(-8px)" } },
        "glow-pulse": { "0%, 100%": { opacity: "0.35" }, "50%": { opacity: "0.75" } },
        "fade-up": { "0%": { opacity: "0", transform: "translateY(20px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
      },
      animation: {
        shimmer:      "shimmer 1.6s ease-in-out infinite",
        spin:         "spin 0.9s linear infinite",
        float:        "float 4s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "fade-up":    "fade-up 0.5s ease-out forwards",
      },
      maxWidth: { site: "1320px" },
    },
  },
  plugins: [
    nextui({
      themes: {
        dark: {
          colors: {
            background: "#0D0B09",
            foreground: "#F7F3ED",
            primary:   { DEFAULT: "#E8B04B", foreground: "#1C1812" },
            secondary: { DEFAULT: "#E08A5B", foreground: "#1C1812" },
            warning:   { DEFAULT: "#F5C518", foreground: "#1C1812" },
            danger:    { DEFAULT: "#E85D5D", foreground: "#FFFFFF" },
            success:   { DEFAULT: "#5DC489", foreground: "#1C1812" },
          },
        },
        light: {
          colors: {
            background: "#F7F4EF",
            foreground: "#1C1812",
            primary:   { DEFAULT: "#B07A1C", foreground: "#FFFFFF" },
            secondary: { DEFAULT: "#BE6438", foreground: "#FFFFFF" },
            warning:   { DEFAULT: "#B07A1C", foreground: "#FFFFFF" },
            danger:    { DEFAULT: "#C83232", foreground: "#FFFFFF" },
            success:   { DEFAULT: "#228C5A", foreground: "#FFFFFF" },
          },
        },
      },
    }),
    require("tailwindcss-animated"),
  ],
};
