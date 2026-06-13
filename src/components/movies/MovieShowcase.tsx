"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiFilmLine } from "react-icons/ri";

import { usePopularMovie } from "@/hooks/usePopularMovie";

export default function MovieShowcase() {
  const popularMovies = usePopularMovie();
  const [rotatingIndex, setRotatingIndex] = useState(0);

  useEffect(() => {
    if (!popularMovies?.data?.length) return;
    const interval = setInterval(() => {
      setRotatingIndex((prev) =>
        prev === popularMovies.data.length - 1 ? 1 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [popularMovies]);

  return (
    <div className="mx-auto flex max-w-site flex-col items-center justify-center gap-10 px-6 py-8 lg:flex-row lg:px-16 lg:py-10">
      {/* Text */}
      <div className="flex max-w-xl flex-col gap-4">
        <div className="flex items-center gap-2">
          <RiFilmLine className="text-accent flex-shrink-0" size={16} />
          <span className="text-xs font-semibold text-accent uppercase tracking-widest">
            Movie Collection
          </span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-extrabold text-text leading-tight">
          Discover Amazing <br />
          <span className="text-gradient">Movies</span>
        </h1>
        <p className="text-text-2 text-[15px] leading-relaxed">
          Browse a vast collection of critically acclaimed films, blockbusters,
          and hidden gems. From action-packed thrillers to heartfelt dramas —
          there is something for everyone.
        </p>
      </div>

      {/* Rotating poster */}
      <div className="poster-card relative h-[390px] w-[260px] flex-shrink-0 ring-1 ring-border lg:h-[405px] lg:w-[270px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={rotatingIndex}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0"
            exit={{ opacity: 0, scale: 0.96 }}
            initial={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4 }}
          >
            {popularMovies?.data?.[rotatingIndex]?.poster_path && (
              <Image
                fill
                alt={popularMovies?.data?.[rotatingIndex]?.title || "Movie"}
                className="object-cover"
                loading="lazy"
                sizes="280px"
                src={`https://image.tmdb.org/t/p/w500${popularMovies?.data?.[rotatingIndex]?.poster_path}`}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
