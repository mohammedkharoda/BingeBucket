"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { RiSearchLine, RiStarFill } from "react-icons/ri";

import { useMultiSearch } from "@/hooks/useMultiSearch";

const SearchResults: React.FC = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const { data, error, isLoading } = useMultiSearch(query);

  if (error)
    return toast.error(
      "An error occurred while fetching data. Please try again later."
    ) as any;

  const filteredData = data?.filter(
    (item: { media_type: string; poster_path: string | null }) =>
      (item.media_type === "tv" || item.media_type === "movie") &&
      item.poster_path !== null
  );

  return (
    <section className="max-w-site mx-auto px-6 lg:px-16 py-16">
      {/* Header */}
      <div className="flex items-center gap-3 mb-10">
        <RiSearchLine className="text-accent" size={22} />
        <div>
          <span className="eyebrow mb-0.5">Search Results</span>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-text capitalize">
            &quot;{query}&quot;
          </h1>
        </div>
      </div>

      {filteredData?.length === 0 && (
        <div className="text-center py-20">
          <p className="text-text-2 text-lg">No results found for &quot;{query}&quot;</p>
          <p className="text-text-3 text-sm mt-2">Try a different search term.</p>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredData?.map((item: any, idx: number) => (
          <Link
            key={item.id}
            href={`/${item.media_type === "movie" ? "movies" : "series"}/${item.id}`}
          >
            <motion.div
              className="poster-card group rounded-2xl"
              initial={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.35, delay: idx * 0.04, ease: "easeOut" }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className="relative overflow-hidden">
                <img
                  alt={item.title || item.name}
                  className="w-full aspect-[2/3] object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  src={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
                />
                {/* Type badge */}
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-accent/80 backdrop-blur-sm">
                  <span className="text-[9px] font-bold text-white uppercase tracking-wide">
                    {item.media_type === "movie" ? "Film" : "Series"}
                  </span>
                </div>
                {/* Rating */}
                {item.vote_average > 0 && (
                  <div className="rating absolute top-2 right-2 px-1.5 py-0.5 rounded-full bg-surface/90 backdrop-blur-sm border border-border/50">
                    <RiStarFill size={9} />
                    {item.vote_average.toFixed(1)}
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="text-xs font-semibold text-text truncate">
                  {item.title || item.name}
                </p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SearchResults;
