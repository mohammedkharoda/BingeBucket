import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";

import CircularProgress from "@/components/ui/CircularProgress";
import useSeasonSeries from "@/store/useSeriesSeason";

const SeriesSeason = () => {
  const { id } = useParams();
  const seasonSeries = useSeasonSeries((state: any) => state.seasonSeries);

  const filtered = seasonSeries
    .filter((s: any) => !s.name.toLowerCase().includes("special"))
    .sort((a: any, b: any) => a.season_number - b.season_number);

  return (
    <section className="max-w-site mx-auto px-6 lg:px-16 py-12">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-1 h-5 rounded-full bg-gold" />
        <h2 className="text-2xl lg:text-3xl font-extrabold text-off-white">Season Details</h2>
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted">No seasons available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((season: any, idx: number) => (
            <Link
              key={season.id}
              passHref
              href={`/series/${id}/season/${season.season_number}`}
            >
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06, ease: "easeOut" }}
                className="group bg-surface border border-surface-4 rounded-2xl overflow-hidden hover:border-gold/30 hover:shadow-card-hover transition-all duration-300 card-hover cursor-pointer"
              >
                {/* Poster */}
                {season.poster_path ? (
                  <div className="overflow-hidden">
                    <img
                      alt={`${season.name} poster`}
                      className="w-full aspect-[2/3] object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      src={`https://image.tmdb.org/t/p/w342${season.poster_path}`}
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-[2/3] bg-surface-2 flex items-center justify-center">
                    <p className="text-muted text-sm font-medium text-center px-4">
                      Image not available yet
                    </p>
                  </div>
                )}

                {/* Info */}
                <div className="p-4 bg-surface">
                  <h3 className="text-sm font-semibold text-off-white mb-1">{season.name}</h3>
                  <p className="text-xs text-muted mb-3">
                    {season.episode_count} episodes
                  </p>

                  {season.vote_average > 0 ? (
                    <div className="flex items-center gap-3">
                      <CircularProgress
                        value={season.vote_average * 10}
                        size={44}
                        strokeWidth={4}
                        showValueLabel
                        classNames={{
                          indicator: `${
                            season.vote_average * 10 > 70
                              ? "stroke-green-pastel"
                              : season.vote_average * 10 >= 40
                                ? "stroke-yellow-dark"
                                : "stroke-crimson-red"
                          }`,
                          value: "text-[10px] font-bold text-off-white",
                        }}
                      />
                      <span className="text-xs text-off-white">Overall rating</span>
                    </div>
                  ) : (
                    <p className="text-xs text-muted">Rating not yet available</p>
                  )}
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default SeriesSeason;
