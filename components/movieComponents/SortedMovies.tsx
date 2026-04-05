"use client";
import Link from "next/link";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { RiStarFill, RiCalendarLine, RiArrowRightUpLine } from "react-icons/ri";
import { PiWarningCircleBold } from "react-icons/pi";

import { Movie } from "../../types";
import { useNowPlayingMovies } from "@/hooks/useNowPlayingMovies";
import { usePopularMovie } from "@/hooks/usePopularMovie";
import { useTopRatedMovies } from "@/hooks/useTopRatingMovies";
import { useUpcomingMovies } from "@/hooks/useUpcomingMovie";

const categories = [
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top_rated" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Now Playing", value: "now_playing" },
];

const SortedMovieComponent: React.FC = () => {
  const [category, setCategory] = useState("now_playing");

  const popularMovies = usePopularMovie();
  const topRatedMovies = useTopRatedMovies();
  const upcomingMovies = useUpcomingMovies();
  const nowPlayingMovies = useNowPlayingMovies();

  const selectedMovies =
    category === "top_rated"
      ? topRatedMovies
      : category === "upcoming"
        ? upcomingMovies
        : category === "now_playing"
          ? nowPlayingMovies
          : popularMovies;

  const { data: movies } = selectedMovies;

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };

  return (
    <section className="py-14 px-6 lg:px-16 max-w-site mx-auto">
      {/* Header */}
      <div className="mb-8 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1 h-5 rounded-full bg-gold" />
            <p className="text-xs font-bold text-gold uppercase tracking-widest">Movies</p>
          </div>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-white text-gold-gradient">
            Hot Picks
          </h2>
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted font-medium">Filter:</span>
          <select
            className="cursor-pointer rounded-full border border-surface-4 bg-surface-2 px-4 py-2 text-sm text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-gold/30"
            value={category}
            onChange={handleSortChange}
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {movies &&
          movies.map((movie: Movie, idx: number) => (
            <Link key={movie.id} href={`/movies/${movie.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.04, ease: "easeOut" }}
                className="group relative h-full overflow-hidden rounded-[1.35rem] border border-surface-4 bg-surface transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-card-hover"
              >
                <div
                  className="pointer-events-none absolute -left-2 top-[68%] h-4 w-4 rounded-full border"
                  style={{
                    borderColor: "var(--color-surface-4)",
                    background: "var(--color-black)",
                    opacity: 0.7,
                  }}
                />
                <div
                  className="pointer-events-none absolute -right-2 top-[68%] h-4 w-4 rounded-full border"
                  style={{
                    borderColor: "var(--color-surface-4)",
                    background: "var(--color-black)",
                    opacity: 0.7,
                  }}
                />

                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(245,200,66,0.14) 0%, rgba(245,200,66,0) 36%, rgba(107,181,214,0.14) 100%)",
                  }}
                />

                {/* Poster */}
                <div className="relative overflow-hidden">
                  <img
                    alt={movie.title}
                    loading="lazy"
                    className="aspect-[2/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  />
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0) 100%)",
                    }}
                  />

                  {/* Rating badge */}
                  {(movie.vote_average ?? 0) > 0 && (
                    <div className="absolute right-2.5 top-2.5 z-20 flex items-center gap-1.5 rounded-full border px-2.5 py-1 bg-black"        >
                      <RiStarFill size={11} className="text-gold" />
                      <span className="text-[11px] text-off-white">
                        {(movie.vote_average ?? 0).toFixed(1)}
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5">
                    <h3 className="line-clamp-1 text-sm font-bold text-white" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}>
                      {movie.title}
                    </h3>
                  </div>
                </div>

                {/* Info */}
                <div
                  className="relative flex flex-1 flex-col gap-2.5 p-4"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 100%)",
                  }}
                >
                  <div
                    className="pointer-events-none absolute inset-x-4 top-0 h-px"
                    style={{ background: "linear-gradient(90deg, transparent 0%, rgba(245,200,66,0.4) 50%, transparent 100%)" }}
                  />

                  {movie.release_date ? (
                    <div className="inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1"
                      style={{
                        borderColor: "var(--color-surface-4)",
                        background: "var(--color-surface-2)",
                      }}
                    >
                      <RiCalendarLine size={11} className="text-subtle" />
                      <span className="text-[11px] text-subtle">
                        {new Date(movie.release_date).toLocaleDateString("en-US", { year: "numeric", month: "short" })}
                      </span>
                    </div>
                  ) : (
                    <span className="inline-flex w-fit items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-medium text-orange"
                      style={{ borderColor: "rgba(255,152,0,0.35)", background: "rgba(255,152,0,0.09)" }}
                    >
                      <PiWarningCircleBold size={11} />
                      Yet to be released
                    </span>
                  )}
                  {movie.overview && (
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-subtle">
                      {movie.overview}
                    </p>
                  )}

                  <div className="mt-auto flex items-center justify-end pt-1">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[var(--color-muted)] transition-colors duration-200 group-hover:text-[#6BB5D6]">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#6BB5D6]" />
                      View Details
                      <RiArrowRightUpLine size={12} />
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
      </div>
    </section>
  );
};

export default SortedMovieComponent;
