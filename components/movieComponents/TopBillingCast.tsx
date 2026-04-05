import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { truncateSentence } from "@/config/turncate";
import { useTopBilledCast } from "@/hooks/useTopBilled";
import useCrewStore from "@/store/useCrewStore";
import { CastMember } from "@/types";

const TopBillingCast = (id: { id: string | string[] }) => {
  const castInfo = useTopBilledCast(Number(id.id));
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
      <div
        className={`${
          cast.length === 1
            ? "flex justify-center"
            : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
        } gap-4`}
      >
        {cast.map((member, idx) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.06, ease: "easeOut" }}
            className="group overflow-hidden rounded-2xl border border-surface-4 bg-surface/80 backdrop-blur-md transition-all duration-300 hover:border-gold/30 hover:shadow-card"
          >
            <div className="overflow-hidden">
              <img
                alt={member.name}
                className="w-full aspect-[3/4] object-cover object-top transition-transform duration-500 group-hover:scale-105"
                src={
                  member.profile_path
                    ? `https://image.tmdb.org/t/p/w342${member.profile_path}`
                    : "/image/forbidden.png"
                }
                loading="lazy"
              />
            </div>
            <div className="p-3 text-center">
              <p className="text-sm font-semibold text-off-white truncate">
                {truncateSentence(member.name, 20)}
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

export default TopBillingCast;
