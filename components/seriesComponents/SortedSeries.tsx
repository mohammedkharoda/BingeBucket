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
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1 h-5 rounded-full bg-gold" />
            <p className="text-xs font-bold text-gold uppercase tracking-widest">Series</p>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white text-gold-gradient">
            Hot Picks Streaming
          </h2>
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted font-medium">Filter:</span>
          <select
            className="bg-surface-2 border border-surface-4 text-white text-sm rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold/30 cursor-pointer"
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

      {isError && <p className="text-center text-red">{error?.message}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {series &&
          series?.map((item: SeriesShowcase, idx: number) => (
            <Link key={item.id} href={`/series/${item.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.04, ease: "easeOut" }}
                className="group bg-surface border border-surface-4 rounded-2xl overflow-hidden hover:border-gold/30 hover:shadow-card-hover transition-all duration-300 card-hover h-full flex flex-col"
              >
                {/* Poster */}
                <div className="relative overflow-hidden">
                  <img
                    alt={item.name}
                    loading="lazy"
                    className="w-full aspect-[2/3] object-cover transition-transform duration-500 group-hover:scale-105"
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  />
                  {item.vote_average > 0 && (
                    <div className="absolute tZop-2.5 right-2.5 flex items-center gap-1 px-2 py-1 rounded-full bg-surface/90 backdrop-blur-sm border border-surface-4/50">
                      <RiStarFill size={10} className="text-gold" />
                      <div className="text-[11px] bg-off-white text-off-white">
                        {item.vote_average.toFixed(1)}
                      </div>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4 flex flex-col gap-2 flex-1">
                  <h3 className="text-sm font-bold text-white line-clamp-1">
                    {item.name}
                  </h3>
                  {item.first_air_date ? (
                    <div className="flex items-center gap-1.5">
                      <RiCalendarLine size={11} className="text-subtle" />
                      <span className="text-[11px] text-subtle">
                        {new Date(item.first_air_date).toLocaleDateString("en-US", { year: "numeric", month: "short" })}
                      </span>
                    </div>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] text-orange font-medium">
                      <PiWarningCircleBold size={11} />
                      Yet to be released
                    </span>
                  )}
                  {item.overview && (
                    <p className="text-xs text-subtle leading-relaxed line-clamp-3 mt-1">
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
