"use client";
import Link from "next/link";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { RiStarFill, RiCalendarLine, RiArrowRightUpLine } from "react-icons/ri";
import { PiWarningCircleBold } from "react-icons/pi";

import { useNowPlayingMovies } from "@/hooks/useNowPlayingMovies";
import { usePopularMovie } from "@/hooks/usePopularMovie";
import { useTopRatedMovies } from "@/hooks/useTopRatingMovies";
import { useUpcomingMovies } from "@/hooks/useUpcomingMovie";

import { Movie } from "../../types";

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
        <div className="flex items-center gap-3">
          <img
            alt=""
            aria-hidden
            className="h-12 w-12 shrink-0 object-contain"
            loading="lazy"
            src="/image/award.gif"
          />
          <div>
            <div className="eyebrow mb-2">Movies</div>
            <h2 className="section-title text-gradient">Hot Picks</h2>
          </div>
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-text-2 font-medium">Filter:</span>
          <select
            className="cursor-pointer rounded-full border border-border bg-surface-2 px-4 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-accent/30"
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
                className="group relative h-full overflow-hidden rounded-[1.35rem] border border-border bg-surface transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-card-hover"
                initial={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.35, delay: idx * 0.04, ease: "easeOut" }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <div className="pointer-events-none absolute -left-2 top-[68%] h-4 w-4 rounded-full border border-border bg-bg/70" />
                <div className="pointer-events-none absolute -right-2 top-[68%] h-4 w-4 rounded-full border border-border bg-bg/70" />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent-2/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Poster */}
                <div className="relative overflow-hidden">
                  <img
                    alt={movie.title}
                    className="aspect-[2/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />

                  {/* Rating badge */}
                  {(movie.vote_average ?? 0) > 0 && (
                    <div className="absolute right-2.5 top-2.5 z-20 flex items-center gap-1.5 rounded-full bg-black/70 px-2 py-1 ring-1 ring-white/10 backdrop-blur-sm">
                      <RiStarFill className="text-gold" size={11} />
                      <span className="text-[11px] text-white">
                        {(movie.vote_average ?? 0).toFixed(1)}
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5">
                    <h3 className="line-clamp-1 text-sm font-bold text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                      {movie.title}
                    </h3>
                  </div>
                </div>

                {/* Info */}
                <div className="relative flex flex-1 flex-col gap-2.5 bg-gradient-to-b from-white/5 to-transparent p-4">
                  <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

                  {movie.release_date ? (
                    <div className="inline-flex w-fit items-center gap-1.5 rounded-full border border-border bg-surface-2 px-2.5 py-1">
                      <RiCalendarLine className="text-text-3" size={11} />
                      <span className="text-[11px] text-text-3">
                        {new Date(movie.release_date).toLocaleDateString("en-US", { year: "numeric", month: "short" })}
                      </span>
                    </div>
                  ) : (
                    <span className="inline-flex w-fit items-center gap-1 rounded-full border border-warning/35 bg-warning/10 px-2.5 py-1 text-[10px] font-medium text-warning">
                      <PiWarningCircleBold size={11} />
                      Yet to be released
                    </span>
                  )}
                  {movie.overview && (
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-text-3">
                      {movie.overview}
                    </p>
                  )}

                  <div className="mt-auto flex items-center justify-end pt-1">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-text-3 transition-colors duration-200 group-hover:text-accent-2">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-2" />
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
