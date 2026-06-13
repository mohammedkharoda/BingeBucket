"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";
import { PiWarningCircleBold } from "react-icons/pi";
import { RiCalendarLine, RiStarFill } from "react-icons/ri";

import { useOnAirSeries } from "@/hooks/useOnAirToday";
import { useAiringTodaySeries } from "@/hooks/useSeriesShowcase";
import { useTopRatedSeries } from "@/hooks/useTopRatedSeries";
import { useUpcomingSeries } from "@/hooks/useUpcomingSeries";
import { SeriesShowcase } from "@/types";

const categories = [
  { label: "Airing Today", value: "air_today" },
  { label: "Top Rated", value: "top_rated" },
  { label: "On Air", value: "on_air" },
  { label: "Upcoming", value: "upcoming" },
];

const SortedSeriesComponent = () => {
  const [category, setCategory] = useState("air_today");

  const airingTodaySeries = useAiringTodaySeries();
  const topRatedSeries = useTopRatedSeries();
  const onAirSeries = useOnAirSeries();
  const upcomingSeries = useUpcomingSeries();

  const selectedSeries =
    category === "top_rated"
      ? topRatedSeries
      : category === "air_today"
        ? airingTodaySeries
        : category === "upcoming"
          ? upcomingSeries
          : onAirSeries;

  const { data: series, isLoading, isError, error } = selectedSeries;

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };

  return (
    <section className="py-20 px-6 lg:px-16 max-w-site mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10">
        <div className="flex items-center gap-3">
          <img
            alt=""
            aria-hidden
            className="h-12 w-12 shrink-0 object-contain"
            loading="lazy"
            src="/image/medal.gif"
          />
          <div>
            <p className="eyebrow mb-2">Series</p>
            <h2 className="section-title text-gradient">Hot Picks Streaming</h2>
          </div>
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-text-2 font-medium">Filter:</span>
          <select
            className="bg-surface-2 border border-border text-text text-sm rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent/30 cursor-pointer"
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

      {isError && <p className="text-center text-danger">{error?.message}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {series &&
          series?.map((item: SeriesShowcase, idx: number) => (
            <Link key={item.id} href={`/series/${item.id}`}>
              <motion.div
                className="group card border-border hover:border-accent/30 hover:shadow-card-hover transition-all duration-300 h-full flex flex-col"
                initial={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.35, delay: idx * 0.04, ease: "easeOut" }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                {/* Poster */}
                <div className="relative overflow-hidden">
                  <img
                    alt={item.name}
                    className="w-full aspect-[2/3] object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  />
                  {item.vote_average > 0 && (
                    <div className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 ring-1 ring-white/10 backdrop-blur-sm">
                      <RiStarFill className="text-gold" size={10} />
                      <span className="text-[11px] font-semibold text-white">
                        {item.vote_average.toFixed(1)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4 flex flex-col gap-2 flex-1">
                  <h3 className="text-sm font-bold text-text line-clamp-1">
                    {item.name}
                  </h3>
                  {item.first_air_date ? (
                    <div className="flex items-center gap-1.5">
                      <RiCalendarLine className="text-text-3" size={11} />
                      <span className="text-[11px] text-text-3">
                        {new Date(item.first_air_date).toLocaleDateString("en-US", { year: "numeric", month: "short" })}
                      </span>
                    </div>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] text-warning font-medium">
                      <PiWarningCircleBold size={11} />
                      Yet to be released
                    </span>
                  )}
                  {item.overview && (
                    <p className="text-xs text-text-3 leading-relaxed line-clamp-3 mt-1">
                      {item.overview}
                    </p>
                  )}
                </div>
              </motion.div>
            </Link>
          ))}
      </div>
    </section>
  );
};

export default SortedSeriesComponent;
