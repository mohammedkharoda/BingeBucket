import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./shared/**/*.{js,ts,jsx,tsx,mdx}",
    "./icons/**/*.{js,ts,jsx,tsx,mdx}",
    "./config/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      // ── BingeBucket brand colors (static hex — same in both themes) ──
      primary:          "#E8756A",   // coral pink — CTAs, highlights
      "primary-dark":   "#D4635A",   // darker coral — active/hover
      secondary:        "#6BB5D6",   // sky blue — tags, badges, links
      "secondary-dark": "#5AA3C4",   // darker blue — active/hover
      accent:           "#F5C842",   // warm yellow/gold — ratings, stars
      "accent-dim":     "#C8A030",   // darker gold — hover, pressed

      // ── CSS-var-driven (light/dark mode aware) ────────────────────
      black:       "var(--color-black)",      // page background
      surface:     "var(--color-surface)",    // cards, modals
      "surface-2": "var(--color-surface-2)",  // inputs, hover states
      "surface-3": "var(--color-surface-3)",  // active states
      "surface-4": "var(--color-surface-4)",  // borders, dividers

      white:       "var(--color-white)",      // primary text
      "off-white": "var(--color-off-white)",  // subheadings
      muted:       "var(--color-muted)",      // body text
      subtle:      "var(--color-subtle)",     // captions, placeholders

      gold:        "var(--color-gold)",       // accent (theme-aware)
      "gold-dim":  "var(--color-gold-dim)",   // dimmed accent

      // ── Semantic ──────────────────────────────────────────────────
      red:          "var(--color-red)",
      "red-dark":   "var(--color-red-dark)",
      green:        "var(--color-green)",
      "green-dark": "var(--color-green-dark)",
      orange:       "var(--color-orange)",

      // ── Legacy aliases (backward compat) ──────────────────────────
      "gray-dark":    "var(--color-surface)",
      gray:           "var(--color-subtle)",
      "gray-light":   "var(--color-muted)",
      yellow:         "var(--color-gold)",
      "yellow-dark":  "var(--color-gold-dim)",
      "orange-yellow": "var(--color-orange)",
      "crimson-red":  "var(--color-red)",
      "dark-red":     "var(--color-red-dark)",
      "dark-green":   "var(--color-green)",
      "green-pastel": "var(--color-green)",
      "off-orange":   "var(--color-orange)",
      "brown-dark":   "var(--color-surface-2)",
      brown:          "var(--color-surface-3)",

      // ── Utility ───────────────────────────────────────────────────
      transparent: "transparent",
      current:     "currentColor",
    },
    extend: {
      fontFamily: {
        // BingeBucket brand fonts
        display:    ["var(--font-display)", "Poppins", "sans-serif"],
        inter:      ["var(--font-inter)", "Inter", "sans-serif"],
        // Legacy fonts (backward compat)
        heading:    ["var(--font-heading)", "Signika", "Georgia", "serif"],
        subheading: ["var(--font-subheading)", "Assistant", "system-ui", "sans-serif"],
        body:       ["var(--font-body)", "Roboto Slab", "Georgia", "serif"],
        sans:       ["var(--font-subheading)", "Assistant", "system-ui", "sans-serif"],
        mono:       ["var(--font-geist-mono)"],
      },
      borderRadius: {
        // BingeBucket design tokens
        card:  "16px",    // movie cards, modals
        badge: "9999px",  // genre pills, tags
        // Tailwind scale extensions
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        card:           "var(--shadow-card)",
        "card-hover":   "var(--shadow-hover)",
        "glow-primary": "var(--shadow-glow-primary)",
        "glow-accent":  "var(--shadow-glow-accent)",
        soft:           "0 2px 12px rgba(0, 0, 0, 0.08)",
      },
      backgroundImage: {
        "gradient-radial":   "radial-gradient(var(--tw-gradient-stops))",
        "brand-gradient":    "linear-gradient(135deg, #E8756A 0%, #6BB5D6 100%)",
        "coral-gradient":    "linear-gradient(135deg, #E8756A 0%, #F5C842 100%)",
        "hero-glow":         "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(232,117,106,0.20) 0%, transparent 70%)",
        // Legacy
        "gold-gradient":     "linear-gradient(135deg, #E8756A 0%, #F5C842 100%)",
        "section-lavender":  "linear-gradient(180deg, #F0EDE8 0%, #F9F6F1 100%)",
        "section-peach":     "linear-gradient(180deg, #FFF1EF 0%, #FEF3F0 100%)",
      },
      keyframes: {
        carousel: {
          "0%, 100%": { transform: "translateY(0)" },
          "33%":      { transform: "translateY(-100%)" },
          "66%":      { transform: "translateY(-200%)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        spin: {
          to: { transform: "rotate(360deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-8px)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.4" },
          "50%":      { opacity: "0.8" },
        },
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        carousel:    "carousel 8s ease-in-out infinite",
        shimmer:     "shimmer 1.8s ease-in-out infinite",
        spin:        "spin 1s linear infinite",
        float:       "float 4s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "fade-up":   "fade-up 0.5s ease-out forwards",
      },
      maxWidth: {
        site: "1440px",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: "#F9F6F1",
            foreground:  "#1A1A1A",
            primary: {
              DEFAULT:    "#E8756A",
              foreground: "#FFFFFF",
            },
            secondary: {
              DEFAULT:    "#6BB5D6",
              foreground: "#FFFFFF",
            },
            warning: {
              DEFAULT:    "#F5C842",
              foreground: "#1A1A1A",
            },
            danger: {
              DEFAULT:    "#E05555",
              foreground: "#FFFFFF",
            },
            success: {
              DEFAULT:    "#4CAF82",
              foreground: "#FFFFFF",
            },
          },
        },
        dark: {
          colors: {
            background: "#0D0D0D",
            foreground:  "#FFFFFF",
            primary: {
              DEFAULT:    "#E8756A",
              foreground: "#FFFFFF",
            },
            secondary: {
              DEFAULT:    "#6BB5D6",
              foreground: "#0D0D0D",
            },
            warning: {
              DEFAULT:    "#F5C842",
              foreground: "#0D0D0D",
            },
            danger: {
              DEFAULT:    "#E05555",
              foreground: "#FFFFFF",
            },
            success: {
              DEFAULT:    "#4CAF82",
              foreground: "#0D0D0D",
            },
          },
        },
      },
    }),
    require("tailwindcss-animated"),
  ],
};
