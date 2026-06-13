"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { RiFilmLine, RiTv2Line, RiBellLine } from "react-icons/ri";

import { PromotionText } from "@/config/data";
import { usePopularMovie } from "@/hooks/usePopularMovie";

const FEATURE_ICONS = [RiFilmLine, RiTv2Line, RiBellLine];

const MoviePromotionBanner = () => {
  const popularMovies = usePopularMovie();
  const [currentIndex, setCurrentIndex] = useState(0);
  const isFetching = popularMovies.isLoading;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PromotionText.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const movieIndex = currentIndex + 1;

  return (
    <section className="relative overflow-hidden border-y border-border bg-bg-2 py-16 lg:py-20">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-6 h-72 w-72 rounded-full bg-accent-2/10 blur-3xl" />

      <div className="container-site relative">
        <div className="mb-12 grid grid-cols-1 items-end gap-8 lg:mb-14 lg:grid-cols-[1.25fr_auto]">
          <div className="space-y-5">
            <span className="eyebrow">Why BingeBucket</span>

            <h2 className="max-w-2xl text-4xl font-extrabold leading-[1.02] tracking-tight text-text sm:text-5xl lg:text-6xl">
              Everything you binge, in one cinematic lane.
            </h2>

            <p className="max-w-xl text-sm leading-relaxed text-text-2 sm:text-base">
              Jump from fresh movie drops to trending series and mood picks
              without tab-hopping. One stream, zero noise.
            </p>

            <div className="flex flex-wrap gap-2">
              {PromotionText.map((item, index) => {
                const active = currentIndex === index;

                return (
                  <button
                    key={item.title}
                    aria-label={`Jump to feature ${index + 1}`}
                    className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors duration-300 ${
                      active
                        ? "border-accent/55 bg-accent/15 text-text"
                        : "border-border bg-surface text-text-3 hover:text-text-2"
                    }`}
                    onClick={() => setCurrentIndex(index)}
                  >
                    0{index + 1} {item.title}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mx-auto w-[268px] justify-self-center lg:mx-0 lg:justify-self-end">
            <div className="card rounded-[2rem] border-accent/30 bg-gradient-to-b from-accent/10 to-accent-2/5 p-3">
              {isFetching ? (
                <div className="h-[400px] w-full rounded-[1.6rem] shimmer" />
              ) : (
                <motion.div
                  className="relative mx-auto w-full overflow-hidden rounded-[1.6rem] bg-surface-2 p-3 pb-5"
                  transition={{ type: "spring", stiffness: 180, damping: 16 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="relative aspect-[2/3] w-full overflow-hidden rounded-2xl ring-1 ring-white/5">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={movieIndex}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute inset-0"
                        exit={{ opacity: 0 }}
                        initial={{ opacity: 0, scale: 1.04 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      >
                        {popularMovies?.data?.[movieIndex]?.poster_path && (
                          <Image
                            fill
                            alt={popularMovies?.data?.[movieIndex]?.title || "Movie"}
                            className="object-cover"
                            loading="lazy"
                            sizes="268px"
                            src={`https://image.tmdb.org/t/p/w342${popularMovies?.data?.[movieIndex]?.poster_path}`}
                          />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="pt-3 text-center">
                    <p className="line-clamp-1 text-sm font-semibold text-text">
                      {popularMovies?.data?.[movieIndex]?.title || "Tonight's Pick"}
                    </p>
                    <p className="text-[11px] text-text-3">Tonight&apos;s pick</p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {PromotionText.map((text, index) => {
            const Icon = FEATURE_ICONS[index];
            const isActive = index === currentIndex;

            return (
              <motion.button
                key={index}
                animate={{ opacity: isActive ? 1 : 0.78 }}
                className={`group relative flex w-full cursor-pointer flex-col gap-5 overflow-hidden rounded-3xl border p-6 text-left transition-colors duration-300 ${
                  isActive
                    ? "border-accent/50 bg-accent/[0.07] shadow-card"
                    : "border-border bg-surface"
                }`}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -4 }}
                onClick={() => setCurrentIndex(index)}
              >
                {isActive && (
                  <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/30 blur-2xl" />
                )}

                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
                      isActive
                        ? "border-accent/45 bg-accent/15"
                        : "border-border bg-surface-3"
                    }`}
                  >
                    <Icon
                      className={isActive ? "text-accent" : "text-text-3"}
                      size={18}
                    />
                  </div>
                  <span
                    className={`text-xs font-bold tabular-nums ${
                      isActive ? "text-accent" : "text-text-3"
                    }`}
                  >
                    0{index + 1}
                  </span>
                </div>

                <h3
                  className={`text-lg font-bold leading-tight ${
                    isActive ? "text-text" : "text-text-2"
                  }`}
                >
                  {text.title}
                </h3>

                <p
                  className="text-sm leading-relaxed text-text-3"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: isActive ? "unset" : 3,
                    WebkitBoxOrient: "vertical",
                    overflow: isActive ? "visible" : "hidden",
                  }}
                >
                  {text.description}
                </p>

                <div className="mt-auto h-1 w-full overflow-hidden rounded-full bg-surface-3">
                  <motion.div
                    animate={{ width: isActive ? "100%" : "26%" }}
                    className={`h-full rounded-full ${
                      isActive ? "bg-brand-gradient" : "bg-border"
                    }`}
                    transition={{ type: "spring", stiffness: 260, damping: 28 }}
                  />
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="flex justify-center gap-1.5 pt-6">
          {PromotionText.map((_, i) => (
            <button
              key={i}
              aria-label={`Feature ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentIndex ? "w-6 bg-accent" : "w-1.5 bg-border"
              }`}
              onClick={() => setCurrentIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoviePromotionBanner;
