import React from "react";
import { motion } from "framer-motion";
import { RiTimeLine } from "react-icons/ri";
import { PiWarningCircleBold } from "react-icons/pi";

import CircularProgress from "@/components/ui/CircularProgress";
import { useSeasonDetails } from "@/hooks/useSeasonDetails";

interface SeasonDetailCardProps {
  id: string | string[];
  seasonId: string | string[];
}

const SeasonDetailCard = ({ id, seasonId }: SeasonDetailCardProps) => {
  const {
    data: seasonDetails,
    isLoading,
    error,
  } = useSeasonDetails(Number(id), Number(seasonId));

  if (isLoading)
    return <p className="text-text-2 p-8">Loading episodes...</p>;
  if (error)
    return <p className="text-danger p-8">Error: {error.message}</p>;
  if (!seasonDetails || seasonDetails.episodes.length === 0)
    return <p className="text-text-2 p-8">No episodes available.</p>;

  return (
    <section className="max-w-site mx-auto px-6 lg:px-16 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {seasonDetails.episodes.map((episode, idx) => (
          <motion.div
            key={episode.id}
            className="card border-border hover:border-accent/30 hover:shadow-card-hover transition-all duration-300"
            initial={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.4, delay: idx * 0.04, ease: "easeOut" }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            {/* Episode still */}
            {episode.still_path && (
              <div className="overflow-hidden">
                <img
                  alt={`${episode.name} still`}
                  className="w-full aspect-video object-cover"
                  loading="lazy"
                  src={`https://image.tmdb.org/t/p/w500${episode.still_path}`}
                />
              </div>
            )}

            <div className="p-5 flex flex-col gap-3">
              <h4 className="text-sm font-bold text-text leading-snug">
                <span className="text-accent">Ep {episode.episode_number}:</span>{" "}
                {episode.name}
              </h4>

              {episode.overview && (
                <p className="text-xs text-text-2 leading-relaxed line-clamp-3">
                  {episode.overview}
                </p>
              )}

              <div className="flex items-center justify-between pt-1">
                {episode.runtime && (
                  <div className="flex items-center gap-1.5">
                    <RiTimeLine className="text-text-3" size={13} />
                    <span className="text-xs text-text-3">{episode.runtime} min</span>
                  </div>
                )}

                {episode.vote_average && episode.vote_average > 0 ? (
                  <div className="flex items-center gap-2">
                    <CircularProgress
                      showValueLabel
                      classNames={{
                        indicator: `${
                          episode.vote_average * 10 > 70
                            ? "stroke-success"
                            : episode.vote_average * 10 >= 40
                              ? "stroke-gold"
                              : "stroke-danger"
                        }`,
                        value: "text-[9px] font-bold text-text",
                      }}
                      size={40}
                      strokeWidth={4}
                      value={episode.vote_average * 10}
                    />
                    <span className="text-xs text-text-3">Rating</span>
                  </div>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-danger/10 text-danger border border-danger/20 text-[10px] font-medium">
                    <PiWarningCircleBold size={10} />
                    No rating
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SeasonDetailCard;
