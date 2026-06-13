import { Poppins, Inter } from "next/font/google";

// ── BingeBucket brand fonts ────────────────────────────────────
// Display / headings — cinematic, bold
export const poppins = Poppins({
  weight: ["600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

// Body / UI text — clean and legible
export const inter = Inter({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
