"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PiWarningCircleBold } from "react-icons/pi";
import { RiArrowRightLine, RiFlashlightFill, RiStarFill } from "react-icons/ri";

import { useTrendingSeriesOfDay } from "@/hooks/useTrendingSeriesOfDay";
import { SeriesOfWeek } from "@/types";

const TrendingSeriesBanner = () => {
  const { data: series, isLoading, isError, error } = useTrendingSeriesOfDay();

  return (
    <section className="py-20 px-6 lg:px-16 max-w-site mx-auto">
      {/* Header */}
      <div className="flex items-end justify-between mb-10">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-1 h-5 rounded-full bg-gold" />
            <p className="text-xs font-bold text-gold uppercase tracking-widest">
              This Week
            </p>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white flex items-center gap-3">
            Top Series
            <RiFlashlightFill className="text-gold" size={28} />
          </h2>
        </div>
        <Link
          className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-gold transition-colors duration-200"
          href="/series"
        >
          See all <RiArrowRightLine size={14} />
        </Link>
      </div>

      {isError && (
        <p className="text-center text-red">{error?.message}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {series &&
          series.map((item: SeriesOfWeek, idx: number) => (
            <Link key={item.id} href={`/series/${item.id}`}>
              <motion.div
                className="group bg-surface border border-surface-4 rounded-2xl overflow-hidden hover:border-gold/30 hover:shadow-card-hover transition-all duration-300 card-hover h-full flex flex-col"
                initial={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.4, delay: idx * 0.05, ease: "easeOut" }}
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
                  {/* Rank badge */}
                  <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-gold flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{idx + 1}</span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4 flex flex-col gap-3 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold text-white leading-snug line-clamp-2 flex-1">
                      {item.name}
                    </h3>
                    {item.vote_average ? (
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <RiStarFill className="text-gold" size={12} />
                        <span className="text-xs font-bold text-muted">
                          {item.vote_average.toFixed(1)}
                        </span>
                      </div>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange/20 text-orange border border-orange/30 text-[10px] font-medium flex-shrink-0">
                        <PiWarningCircleBold size={10} />
                        Upcoming
                      </span>
                    )}
                  </div>
                  {item.overview && (
                    <p className="text-xs text-subtle leading-relaxed line-clamp-3">
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

export default TrendingSeriesBanner;
