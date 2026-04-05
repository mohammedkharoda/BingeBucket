"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { RiFilmLine, RiTv2Line, RiBellLine } from "react-icons/ri";
import Skeleton from "react-loading-skeleton";

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
    <section
      className="relative overflow-hidden border-b border-surface-4 px-5 py-16 sm:px-8 lg:px-16 lg:py-20"
      style={{
        background:
          "radial-gradient(circle at 14% 8%, rgba(232,117,106,0.12) 0%, rgba(232,117,106,0) 52%), radial-gradient(circle at 90% 0%, rgba(245,200,66,0.18) 0%, rgba(245,200,66,0) 44%), linear-gradient(180deg, #f8f4ec 0%, var(--color-surface) 14%, var(--color-surface) 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full blur-3xl"
        style={{ background: "rgba(245,200,66,0.14)" }}
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-6 h-72 w-72 rounded-full blur-3xl"
        style={{ background: "rgba(232,117,106,0.16)" }}
      />

      <div className="relative mx-auto max-w-site">
        <div className="mb-12 grid grid-cols-1 items-end gap-8 lg:mb-14 lg:grid-cols-[1.25fr_auto]">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-surface-4 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--color-gold)" }} />
              <p className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: "var(--color-gold-dim)" }}>
                Why BingeBucket
              </p>
            </div>

            <h2 className="max-w-2xl text-4xl font-extrabold leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Everything you binge, in one cinematic lane.
            </h2>

            <p className="max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              Jump from fresh movie drops to trending series and mood picks without tab-hopping. One stream, zero noise.
            </p>

            <div className="flex flex-wrap gap-2">
              {PromotionText.map((item, index) => (
                <button
                  key={item.title}
                  onClick={() => setCurrentIndex(index)}
                  className="rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-300"
                  style={{
                    color:
                      currentIndex === index
                        ? "var(--color-white)"
                        : "var(--color-subtle)",
                    background:
                      currentIndex === index
                        ? "rgba(232,117,106,0.18)"
                        : "var(--color-surface)",
                    borderColor:
                      currentIndex === index
                        ? "rgba(232,117,106,0.55)"
                        : "var(--color-surface-4)",
                  }}
                  aria-label={`Jump to feature ${index + 1}`}
                >
                  0{index + 1} {item.title}
                </button>
              ))}
            </div>
          </div>

          <div className="mx-auto w-[268px] justify-self-center sm:w-[268px] lg:mx-0 lg:justify-self-end">
            <div
              className="rounded-[2rem] border p-3"
              style={{
                borderColor: "rgba(245,200,66,0.5)",
                background:
                  "linear-gradient(170deg, rgba(245,200,66,0.12) 0%, rgba(245,200,66,0.03) 38%, rgba(232,117,106,0.12) 100%)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              {isFetching ? (
                <Skeleton
                  baseColor="var(--color-surface-2)"
                  highlightColor="var(--color-surface-3)"
                  height={420}
                  width={268}
                  borderRadius={18}
                />
              ) : (
                <motion.div
                  whileHover={{ rotate: 0.8, y: -3 }}
                  transition={{ type: "spring", stiffness: 180, damping: 16 }}
                  className="relative mx-auto w-[268px] rotate-[-1.2deg] rounded-[1.6rem] p-3 pb-5"
                  style={{
                    background: "#f5efe3",
                    border: "1px solid rgba(173, 154, 123, 0.55)",
                    boxShadow:
                      "0 18px 30px rgba(0,0,0,0.2), 0 4px 10px rgba(0,0,0,0.12)",
                  }}
                >
                  <div className="relative aspect-[2/3] w-full overflow-hidden rounded-[1.15rem] border border-black/10">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={movieIndex}
                        initial={{ opacity: 0, scale: 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="absolute inset-0"
                      >
                        {popularMovies?.data?.[movieIndex]?.poster_path && (
                          <Image
                            alt={popularMovies?.data?.[movieIndex]?.title || "Movie"}
                            fill
                            loading="lazy"
                            className="object-cover"
                            sizes="(max-width: 640px) 268px, 268px"
                            src={`https://image.tmdb.org/t/p/w342${popularMovies?.data?.[movieIndex]?.poster_path}`}
                          />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="pt-3 text-center">
                    <p
                      className="line-clamp-1 text-sm font-semibold"
                      style={{
                        color: "#513b2d",
                        fontFamily:
                          '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                      }}
                    >
                      {popularMovies?.data?.[movieIndex]?.title || "Tonight's Pick"}
                    </p>
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
                onClick={() => setCurrentIndex(index)}
                whileHover={{ y: -4 }}
                animate={{ opacity: isActive ? 1 : 0.72 }}
                transition={{ duration: 0.3 }}
                className="group relative flex w-full cursor-pointer flex-col gap-5 overflow-hidden rounded-3xl border p-6 text-left transition-all duration-300"
                style={{
                  background: isActive
                    ? "linear-gradient(180deg, rgba(245,200,66,0.12) 0%, rgba(232,117,106,0.10) 100%)"
                    : "var(--color-surface)",
                  borderColor: isActive
                    ? "rgba(232,117,106,0.5)"
                    : "var(--color-surface-4)",
                  boxShadow: isActive ? "var(--shadow-card)" : "none",
                }}
              >
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-2xl"
                  style={{
                    background: isActive
                      ? "rgba(245,200,66,0.34)"
                      : "rgba(232,117,106,0.0)",
                  }}
                />

                <div className="flex items-center justify-between">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{
                      background: isActive
                        ? "rgba(245,200,66,0.18)"
                        : "var(--color-surface-3)",
                      border: "1px solid",
                      borderColor: isActive
                        ? "rgba(245,200,66,0.45)"
                        : "var(--color-surface-4)",
                    }}
                  >
                    <Icon
                      size={18}
                      style={{ color: isActive ? "var(--color-gold)" : "var(--color-subtle)" }}
                    />
                  </div>
                  <span
                    className="font-mono text-xs font-bold tabular-nums"
                    style={{ color: isActive ? "var(--color-gold)" : "var(--color-subtle)" }}
                  >
                    0{index + 1}
                  </span>
                </div>

                <h3
                  className="text-lg font-bold leading-tight"
                  style={{ color: isActive ? "var(--color-white)" : "var(--color-muted)" }}
                >
                  {text.title}
                </h3>

                <p
                  className="text-sm leading-relaxed"
                  style={{
                    color: isActive ? "var(--color-muted)" : "var(--color-subtle)",
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
                    className="h-full rounded-full"
                    animate={{ width: isActive ? "100%" : "26%" }}
                    transition={{ type: "spring", stiffness: 260, damping: 28 }}
                    style={{
                      background: isActive
                        ? "linear-gradient(90deg, #E8756A 0%, #F5C842 100%)"
                        : "var(--color-surface-4)",
                    }}
                  />
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="flex gap-1.5 pt-6 justify-center">
          {PromotionText.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === currentIndex ? "24px" : "6px",
                background: i === currentIndex ? "var(--color-gold)" : "var(--color-surface-4)",
              }}
              aria-label={`Feature ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoviePromotionBanner;
