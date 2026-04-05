"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiArrowRightLine } from "react-icons/ri";
import Link from "next/link";

import { useAiringTodaySeries } from "@/hooks/useSeriesShowcase";

const SeriesShowcase = () => {
  const seriesData = useAiringTodaySeries();
  const [rotatingIndex, setRotatingIndex] = useState(0);

  useEffect(() => {
    if (!seriesData?.data?.length) return;
    const interval = setInterval(() => {
      setRotatingIndex((prevIndex) => {
        if (prevIndex === seriesData.data.length - 1) return 1;

        return prevIndex + 1;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [seriesData]);

  return (
    <section className="py-20 px-6 lg:px-16 max-w-site mx-auto">
      <div className="flex items-center justify-between gap-12 flex-col-reverse lg:flex-row">
        {/* Rotating poster */}
        <motion.div
          className="relative w-[260px] h-[390px] flex-shrink-0"
          initial={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={rotatingIndex}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="absolute inset-0"
              exit={{ opacity: 0, scale: 0.96, y: -8 }}
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {seriesData?.data?.[rotatingIndex]?.poster_path && (
                <Image
                  fill
                  alt={seriesData?.data?.[rotatingIndex]?.name || "Series"}
                  className="object-cover rounded-3xl shadow-card-hover ring-1 ring-surface-4"
                  loading="lazy"
                  sizes="260px"
                  src={`https://image.tmdb.org/t/p/w500${seriesData?.data?.[rotatingIndex]?.poster_path}`}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Text */}
        <motion.div
          className="flex flex-col gap-6 max-w-xl"
          initial={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-1 h-5 rounded-full bg-gold" />
            <span className="text-xs font-bold text-gold uppercase tracking-widest">
              Series Collection
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            Discover Captivating{" "}
            <span className="text-gold-gradient">Series</span>
          </h2>
          <p className="text-muted text-base leading-relaxed">
            Explore a diverse range of critically acclaimed series, binge-worthy
            dramas, and must-watch thrillers. Whether you are into gripping
            mysteries, inspiring documentaries, or epic adventures — there is
            something that will keep you hooked.
          </p>
          <Link
            className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold-dim transition-colors w-fit"
            href="/series"
          >
            Browse all series <RiArrowRightLine size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default SeriesShowcase;
