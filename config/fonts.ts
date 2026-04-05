import { Poppins, Inter, Signika, Assistant, Roboto_Slab } from "next/font/google";

// ── BingeBucket brand fonts ────────────────────────────────────
// Display / headings — bold, cinematic feel
export const poppins = Poppins({
  weight: ["700", "800"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

// Body / UI text — clean and legible
export const inter = Inter({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// ── Legacy fonts (kept for backward compatibility) ─────────────
export const signika = Signika({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const assistant = Assistant({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-subheading",
  display: "swap",
});

export const robotoSlab = Roboto_Slab({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const dmSans = assistant;
