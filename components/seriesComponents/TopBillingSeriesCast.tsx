import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { useTopBilledSeriesCast } from "@/hooks/useSeriesCredits";
import useCrewStore from "@/store/useCrewStore";
import { CastMember } from "@/types";

const TopBillingSeriesCast = (id: { id: string | string[] }) => {
  const castInfo = useTopBilledSeriesCast(Number(id.id));
  const [cast, setCast] = useState<CastMember[]>([]);
  const setCrew = useCrewStore((state) => state.setCrew);

  useEffect(() => {
    if (castInfo.data) {
      const { cast, crew } = castInfo.data as any;

      setCast(cast.slice(0, 6));
      setCrew(
        crew.filter((member: any) =>
          ["Director", "Producer", "Writer"].includes(member.job)
        )
      );
    }
  }, [castInfo.data]);

  if (cast.length === 0) return null;

  return (
    <section className="max-w-site mx-auto px-6 lg:px-16 py-12">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-1 h-5 rounded-full bg-gold" />
        <h2 className="text-2xl lg:text-3xl font-extrabold text-off-white">Top Cast</h2>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {cast.map((member, idx) => (
          <motion.div
            key={member.id}
            className="group bg-surface border border-surface-4 rounded-2xl overflow-hidden hover:border-gold/30 hover:shadow-card transition-all duration-300 w-[160px] flex-shrink-0"
            initial={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.4, delay: idx * 0.06, ease: "easeOut" }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="overflow-hidden">
              <img
                alt={member.name}
                className="w-full aspect-[3/4] object-cover object-top transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                src={
                  member.profile_path
                    ? `https://image.tmdb.org/t/p/w342${member.profile_path}`
                    : "/image/forbidden.png"
                }
              />
            </div>
            <div className="p-3 text-center">
              <p className="text-sm font-semibold text-off-white truncate">
                {member.name}
              </p>
              <p className="text-xs text-subtle truncate mt-0.5">
                {member.character.split("/")[0]}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TopBillingSeriesCast;
