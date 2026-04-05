"use client";

import { motion, LayoutGroup } from "framer-motion";
import Link from "next/link";
import {
  RiPlayCircleLine,
  RiPulseLine,
  RiShuffleLine,
  RiFilmLine,
  RiTv2Line,
  RiGroupLine,
} from "react-icons/ri";

import { useTrendingOfDay } from "@/hooks/useTrendingOfDay";
import { TextRotate } from "@/components/ui/text-rotate";
import Floating, { FloatingElement } from "@/components/ui/parallax-floating";
import ImgStack from "@/components/ui/image-stack";

// ── Constants ────────────────────────────────────────────────────

// Genre words that rotate in the headline
const GENRE_WORDS = [
  "Story",
  "Thriller",
  "Romance",
  "Adventure",
  "Comedy",
  "Drama",
  "Mystery",
  "Sci-Fi",
];

const STATS = [
  { icon: RiFilmLine,  value: "10K+",  label: "Movies" },
  { icon: RiTv2Line,   value: "3K+",   label: "Series" },
  { icon: RiGroupLine, value: "500K+", label: "Users" },
];

// Decorative floating genre badges (parallax layer)
const FLOATING_BADGES = [
  { label: "Action",   depth: 1.5, top: "12%", left: "2%",   rotate: -8  },
  { label: "Sci-Fi",   depth: 2.5, top: "70%", left: "1%",   rotate: 5   },
  { label: "Drama",    depth: 1,   top: "20%", right: "2%",  rotate: 10  },
  { label: "Horror",   depth: 3,   top: "75%", right: "3%",  rotate: -6  },
  { label: "Romance",  depth: 2,   top: "5%",  left: "45%",  rotate: 3   },
];

// ── Fade-up animation helper ─────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as const },
});

// ── Component ────────────────────────────────────────────────────

export default function Hero() {
  const { data: movies = [], isLoading } = useTrendingOfDay();

  return (
    <section
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 12% 0%, rgba(232,117,106,0.18) 0%, rgba(232,117,106,0) 44%), radial-gradient(circle at 85% 10%, rgba(107,181,214,0.2) 0%, rgba(107,181,214,0) 38%), linear-gradient(180deg, #f9f2e7 0%, #f6efe4 42%, #f8f4ec 100%)",
      }}
    >

      {/* ── Parallax floating genre badges ──────────────────────── */}
      <Floating easingFactor={0.04} sensitivity={-0.4}>
        {FLOATING_BADGES.map(({ label, depth, top, left, right, rotate }) => (
          <FloatingElement
            key={label}
            className="hidden lg:block"
            depth={depth}
            style={{
              top,
              ...(left  ? { left }  : {}),
              ...(right ? { right } : {}),
            } as React.CSSProperties}
          >
            <div
              className="select-none rounded-badge border px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide backdrop-blur-sm"
              style={{
                borderColor: "rgba(51,51,51,0.12)",
                background: "rgba(255,255,255,0.58)",
                color: "rgba(55,65,81,0.7)",
                transform: `rotate(${rotate}deg)`,
              }}
            >
              {label}
            </div>
          </FloatingElement>
        ))}
      </Floating>

      {/* ── Ambient glow blobs ──────────────────────────────────── */}
      <div
        className="pointer-events-none absolute rounded-full blur-[130px]"
        style={{ left: "-10%", top: "-5%", width: "45%", height: "55%", background: "rgba(232,117,106,0.16)" }}
      />
      <div
        className="pointer-events-none absolute rounded-full blur-[100px]"
        style={{ right: "-5%", bottom: "10%", width: "40%", height: "45%", background: "rgba(107,181,214,0.14)" }}
      />
      <div
        className="pointer-events-none absolute rounded-full blur-[80px]"
        style={{ left: "38%", top: "55%", width: "30%", height: "35%", background: "rgba(245,200,66,0.1)" }}
      />

      {/* ── Subtle film-grain texture ────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* ── Main grid ────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* ── LEFT: Copy ─────────────────────────────────────── */}
          <div className="flex flex-col order-2 lg:order-1">

            {/* Badge */}
            <motion.div {...fadeUp(0)} className="mb-6 w-fit">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-badge border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-[1.5px]">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                Premium Curation
              </span>
            </motion.div>

            {/* Headline with TextRotate on the last word */}
            <motion.div {...fadeUp(0.08)}>
              <h1
                className="font-display font-black text-[var(--color-white)] leading-[0.88] tracking-[-0.03em]"
                style={{ fontSize: "clamp(50px, 7vw, 88px)" }}
              >
                Discover
                <br />
                Your{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #E8756A 0%, #F5C842 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Next
                </span>
                <br />
                Favorite
                <br />
                {/* TextRotate replaces the static "Story" */}
                <LayoutGroup>
                  <motion.span layout className="inline-flex overflow-hidden">
                    <TextRotate
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: "-110%", opacity: 0 }}
                      initial={{ y: "110%", opacity: 0 }}
                      mainClassName="text-[var(--color-off-white)]"
                      rotationInterval={2800}
                      splitBy="characters"
                      staggerDuration={0.025}
                      staggerFrom="first"
                      texts={GENRE_WORDS}
                      transition={{ type: "spring", damping: 28, stiffness: 350 }}
                    />
                  </motion.span>
                </LayoutGroup>
              </h1>
            </motion.div>

            {/* Subtext */}
            <motion.p
              {...fadeUp(0.18)}
              className="mt-7 max-w-[520px] text-base leading-relaxed font-inter text-[var(--color-muted)] sm:text-lg"
            >
              Hand-picked award-winning cinema and groundbreaking series —
              every frame curated for the ultimate viewing experience.
            </motion.p>

            {/* CTA buttons */}
            <motion.div {...fadeUp(0.24)} className="mt-8 flex flex-wrap gap-3">
              <Link className="btn-primary text-base px-8 py-3.5" href="/movies">
                <RiPlayCircleLine size={18} />
                Explore Movies
              </Link>
              <Link
                className="inline-flex items-center gap-2 rounded-badge border px-8 py-3.5 text-base font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
                href="/series"
                style={{
                  borderColor: "var(--color-surface-4)",
                  color: "var(--color-white)",
                  background: "rgba(255,255,255,0.52)",
                }}
              >
                Browse Series
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div
              {...fadeUp(0.32)}
              className="mt-10 flex items-center gap-6 border-t pt-8"
              style={{ borderColor: "var(--color-surface-4)" }}
            >
              {STATS.map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                    <Icon className="text-primary" size={16} />
                  </div>
                  <div>
                    <p className="font-display text-sm font-bold leading-none text-[var(--color-white)]">{value}</p>
                    <p className="mt-0.5 text-[11px] font-inter text-[var(--color-subtle)]">{label}</p>
                  </div>
                </div>
              ))}

              {/* Avatar stack */}
              <div className="ml-auto hidden sm:flex items-center gap-2">
                <div
                  className="inline-flex items-center gap-2 rounded-full border px-3 py-1"
                  style={{
                    borderColor: "var(--color-surface-4)",
                    backgroundColor: "rgba(255,255,255,0.55)",
                  }}
                >
                  <span className="relative inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/15">
                    <span className="absolute h-2.5 w-2.5 rounded-full bg-primary/35 animate-ping" />
                    <RiPulseLine className="relative text-primary" size={12} />
                  </span>
                  <span className="text-[11px] font-bold text-[var(--color-muted)]">Live now</span>
                </div>
                <p className="max-w-[92px] text-xs font-inter leading-tight text-[var(--color-subtle)]">
                  thousands watching
                </p>
              </div>
            </motion.div>

            {/* Surprise me */}
            <motion.div {...fadeUp(0.38)} className="mt-6">
              <Link
                className="inline-flex items-center gap-3 group transition-opacity duration-200 hover:opacity-80"
                href="/suprise-me"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 border border-accent/25 group-hover:bg-accent/20 transition-colors duration-200">
                  <RiShuffleLine className="text-accent" size={17} />
                </div>
                <div>
                  <p className="font-display text-sm font-bold leading-tight text-[var(--color-white)]">
                    Surprise Me
                  </p>
                  <p className="mt-0.5 text-[11px] font-inter text-[var(--color-subtle)]">
                    Random pick based on your mood
                  </p>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* ── RIGHT: Stacked draggable movie posters ──────────── */}
          <motion.div
            animate={{ opacity: 1 }}
            className="relative order-1 lg:order-2 hidden sm:flex items-center justify-center"
            initial={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {!isLoading && movies.length > 0 && (
              <ImgStack
                images={movies.slice(0, 5).map((m) => `https://image.tmdb.org/t/p/w500${m.poster_path}`)}
              />
            )}
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────────── */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 opacity-55">
        <span className="text-[10px] font-bold uppercase tracking-[3px] font-inter text-[var(--color-subtle)]">
          Scroll
        </span>
        <div className="h-10 w-px bg-gradient-to-b from-primary to-transparent" />
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28"
        style={{
          background:
            "linear-gradient(to bottom, rgba(248,244,236,0) 0%, rgba(248,244,236,0.95) 65%, rgba(248,244,236,1) 100%)",
        }}
      />
    </section>
  );
}
