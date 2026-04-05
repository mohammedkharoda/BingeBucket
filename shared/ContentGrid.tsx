"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { usePopularMovie } from "@/hooks/usePopularMovie";

const ContentGrid = () => {
  const { data: movies, error, isLoading } = usePopularMovie();

  if (error) return null;

  return (
    <div className="flex gap-3 select-none">
      {/* Left column — 2 tall posters */}
      <div className="flex flex-col gap-3">
        {movies?.slice(0, 2).map((movie, i) => (
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 + 0.3, duration: 0.5, ease: "easeOut" }}
            className="relative overflow-hidden rounded-2xl ring-1 ring-surface-4 shadow-card hover:ring-gold/30 hover:shadow-card-hover transition-all duration-300"
          >
            <Image
              alt={movie.title}
              loading="lazy"
              width={195}
              height={290}
              className="object-cover"
              src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
            />
          </motion.div>
        ))}
      </div>

      {/* Right column — 3 smaller, offset down */}
      <div className="flex flex-col gap-3 mt-10">
        {movies?.slice(3, 6).map((movie, i) => (
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 + 0.5, duration: 0.5, ease: "easeOut" }}
            className="relative overflow-hidden rounded-2xl ring-1 ring-surface-4 shadow-card hover:ring-gold/30 hover:shadow-card-hover transition-all duration-300"
          >
            <Image
              alt={movie.title}
              loading="lazy"
              width={150}
              height={220}
              className="object-cover"
              src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ContentGrid;
