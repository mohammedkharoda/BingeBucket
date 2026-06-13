"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  RiPlayFill,
  RiAddLine,
  RiStarFill,
  RiArrowRightLine,
} from "react-icons/ri";

import { useTrendingOfDay } from "@/hooks/useTrendingOfDay";

const EASE = [0.16, 1, 0.3, 1] as const;
const ROTATE_MS = 6500;

// TMDB genre id → label (movie + tv overlap covered)
const GENRES: Record<number, string> = {
  28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy",
  80: "Crime", 99: "Documentary", 18: "Drama", 10751: "Family",
  14: "Fantasy", 36: "History", 27: "Horror", 10402: "Music",
  9648: "Mystery", 10749: "Romance", 878: "Sci-Fi", 53: "Thriller",
  10752: "War", 37: "Western", 10759: "Action", 10765: "Sci-Fi",
};

export default function Hero() {
  const { data: trending = [], isLoading } = useTrendingOfDay();
  const [active, setActive] = useState(0);

  const films = trending.filter((f) => f.backdrop_path).slice(0, 6);
  const current = films[active];

  // Auto-rotate the featured film
  useEffect(() => {
    if (films.length < 2) return;
    const t = setInterval(
      () => setActive((i) => (i + 1) % films.length),
      ROTATE_MS
    );

    return () => clearInterval(t);
  }, [films.length]);

  if (isLoading || !current) {
    return <div className="h-[92svh] w-full bg-bg-2 shimmer" />;
  }

  const year = current.release_date?.slice(0, 4);
  const rating = current.vote_average ? current.vote_average.toFixed(1) : null;
  const genres = (current.genre_ids ?? [])
    .map((g) => GENRES[g])
    .filter(Boolean)
    .slice(0, 3);

  return (
    <section className="relative min-h-[92svh] w-full overflow-hidden bg-bg">
      {/* ── Backdrop (crossfades between films) ─────────────────── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current.id}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0, scale: 1.06 }}
          transition={{ opacity: { duration: 1 }, scale: { duration: 7, ease: "linear" } }}
        >
          <Image
            fill
            priority
            alt=""
            className="object-cover object-top"
            sizes="100vw"
            src={`https://image.tmdb.org/t/p/original${current.backdrop_path}`}
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Scrims + grain ──────────────────────────────────────── */}
      <div className="scrim-left pointer-events-none absolute inset-0" />
      <div className="scrim-bottom pointer-events-none absolute inset-0" />
      <div className="grain pointer-events-none absolute inset-0" />

      {/* ── Content ─────────────────────────────────────────────── */}
      <div className="container-site relative z-10 flex min-h-[92svh] flex-col justify-end pb-14 pt-32 lg:pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
            exit={{ opacity: 0, y: -16 }}
            initial={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="eyebrow mb-5">Trending today</span>

            <h1 className="display mt-3 max-w-3xl text-balance">
              {current.title}
            </h1>

            {/* Meta row */}
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-text-2">
              {rating && (
                <span className="rating gap-1.5 text-sm">
                  <RiStarFill size={15} />
                  {rating}
                </span>
              )}
              {year && <span className="text-text-3">{year}</span>}
              {genres.length > 0 && (
                <>
                  <span className="h-1 w-1 rounded-full bg-text-4" />
                  <div className="flex flex-wrap gap-2">
                    {genres.map((g) => (
                      <span key={g} className="pill">{g}</span>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Overview */}
            <p className="mt-5 line-clamp-3 max-w-xl text-base leading-relaxed text-text-2">
              {current.overview}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link className="btn-primary px-7 py-3 text-base" href={`/movies/${current.id}`}>
                <RiPlayFill size={20} />
                Watch Now
              </Link>
              <Link className="btn-ghost px-6 py-3 text-base" href="/watchlist">
                <RiAddLine size={18} />
                Add to List
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Featured rail (thumbnails of the rotating set) ─────── */}
        <div className="mt-12 flex items-end justify-between gap-6">
          <div className="hide-scrollbar flex gap-3 overflow-x-auto pb-1">
            {films.map((film, i) => (
              <button
                key={film.id}
                aria-label={`Show ${film.title}`}
                className={`relative h-20 w-32 flex-shrink-0 overflow-hidden rounded-lg transition-all duration-300 sm:h-24 sm:w-40 ${
                  i === active
                    ? "ring-2 ring-accent ring-offset-2 ring-offset-bg"
                    : "opacity-55 hover:opacity-100"
                }`}
                onClick={() => setActive(i)}
              >
                <Image
                  fill
                  alt={film.title}
                  className="object-cover"
                  sizes="160px"
                  src={`https://image.tmdb.org/t/p/w300${film.backdrop_path}`}
                />
                {i === active && (
                  <motion.span
                    className="absolute bottom-0 left-0 h-0.5 bg-accent"
                    key={`bar-${active}`}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: ROTATE_MS / 1000, ease: "linear" }}
                  />
                )}
              </button>
            ))}
          </div>

          <Link
            className="hidden flex-shrink-0 items-center gap-1.5 text-sm font-medium text-text-2 transition-colors hover:text-accent sm:inline-flex"
            href="/movies"
          >
            Explore all <RiArrowRightLine size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
