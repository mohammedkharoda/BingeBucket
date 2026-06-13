"use client";
import Link from "next/link";
import Image from "next/image";
import { RiBookmarkLine, RiStarFill } from "react-icons/ri";

import { useWatchlistStore } from "@/store/useWatchlistStore";

const WatchlistPage = () => {
  const watchlist = useWatchlistStore((state) => state.watchlist);

  if (watchlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-5 px-6 text-center">
        <div className="p-5 rounded-full bg-surface-2 border border-border">
          <RiBookmarkLine className="text-accent" size={36} />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-text mb-2">
            Your watchlist is empty
          </h2>
          <p className="text-text-2 text-sm max-w-xs">
            Start adding movies and series to keep track of what you want to
            watch.
          </p>
        </div>
        <div className="flex gap-3 flex-wrap justify-center">
          <Link className="btn-primary" href="/movies">
            Browse Movies
          </Link>
          <Link className="btn-ghost" href="/series">
            Browse Series
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-site mx-auto px-6 lg:px-16 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text">Your Watchlist</h1>
        <p className="text-text-2 text-sm mt-1">
          {watchlist.length} title{watchlist.length !== 1 ? "s" : ""} saved
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {watchlist.map((item) => (
          <Link
            key={item.id}
            href={`/${item.media_type === "movie" ? "movies" : "series"}/${item.id}`}
          >
            <div className="poster-card group rounded-2xl">
              <div className="relative aspect-[2/3]">
                <Image
                  fill
                  alt={item.title || item.name || ""}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  sizes="(max-width: 640px) 50vw, (max-width: 1280px) 25vw, 17vw"
                  src={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
                />
                {/* Rating badge */}
                <div className="rating absolute top-2 right-2 px-2 py-0.5 rounded-full bg-surface/90 backdrop-blur-sm border border-border/50">
                  <RiStarFill size={9} />
                  {item.vote_average.toFixed(1)}
                </div>
                {/* Type badge */}
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-accent/80 backdrop-blur-sm">
                  <span className="text-[9px] font-medium text-white uppercase tracking-wide">
                    {item.media_type === "movie" ? "Film" : "Series"}
                  </span>
                </div>
              </div>
              <div className="p-2.5">
                <h3 className="text-xs font-medium text-text truncate">
                  {item.title || item.name}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default WatchlistPage;
