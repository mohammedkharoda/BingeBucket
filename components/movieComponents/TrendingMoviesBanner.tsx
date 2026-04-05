"use client";
import Link from "next/link";
import { RiArrowRightLine, RiFlashlightFill, RiStarFill } from "react-icons/ri";

import { useNowPlayingMovies } from "@/hooks/useNowPlayingMovies";
import { usePopularMovie } from "@/hooks/usePopularMovie";
import { Movie } from "@/types";
import { truncateSentence } from "@/config/turncate";
import { PhotoGallery } from "@/components/ui/gallery";

const GALLERY_FALLBACK = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=500&q=80";

const TrendingMoviesBanner = () => {
  const nowPlayingQuery = useNowPlayingMovies();
  const popularQuery = usePopularMovie();


  const mergedMovies = [
    ...(nowPlayingQuery.data ?? []),
    ...(popularQuery.data ?? []),
  ].filter(
    (movie, index, arr) =>
      movie?.id && arr.findIndex((m) => m.id === movie.id) === index,
  ) as Movie[];


  const galleryMovies = mergedMovies.slice(0, 5).map((m: Movie) => ({
    id: m.id,
    src: m.poster_path
      ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
      : GALLERY_FALLBACK,
    title: m.title,
  }));

  return (
    <section className="py-14 px-6 lg:px-16 max-w-site mx-auto">
      {/* Photo gallery fan */}
      <PhotoGallery movies={galleryMovies} animationDelay={0.2} />

      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-1 h-5 rounded-full bg-gold" />
            <p className="text-xs font-bold text-gold uppercase tracking-widest">
              Latest Buzz
            </p>
          </div>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-white flex items-center gap-2.5">
            Trending
            <RiFlashlightFill size={22} className="text-gold" />
          </h2>
        </div>
        <Link
          href="/movies"
          className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-gold transition-colors duration-200"
        >
          See all <RiArrowRightLine size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {mergedMovies.slice(0, 6).map((movie: Movie, idx: number) => (
          <Link key={movie.id} href={`/movies/${movie.id}`}>
            <div className="group flex gap-4 p-4 rounded-2xl bg-surface border border-surface-4 hover:border-gold/30 hover:bg-surface-2 hover:shadow-card transition-all duration-200 cursor-pointer">
              {/* Rank number */}
              <div className="flex-shrink-0 w-6 flex items-start pt-1">
                <span className="text-xs font-bold text-subtle tabular-nums">
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Thumbnail */}
              <div className="relative w-12 h-18 flex-shrink-0 rounded-xl overflow-hidden">
                <img
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  src={movie.poster_path ? `https://image.tmdb.org/t/p/w185${movie.poster_path}` : GALLERY_FALLBACK}
                  loading="lazy"
                  style={{ height: "72px" }}
                />
              </div>

              {/* Info */}
              <div className="flex flex-col justify-between flex-1 min-w-0">
                <div>
                  <h3 className="text-sm font-semibold text-white truncate mb-1">
                    {movie.title}
                  </h3>
                  <p className="text-xs text-subtle leading-relaxed line-clamp-2">
                    {truncateSentence(
                      movie.overview || "No overview available.",
                      80
                    )}
                  </p>
                </div>
                {movie.vote_average ? (
                  <div className="flex items-center gap-1 mt-2">
                    <RiStarFill size={10} className="text-gold" />
                    <span className="text-xs font-semibold text-muted">
                      {movie.vote_average.toFixed(1)}
                    </span>
                  </div>
                ) : (
                  <span className="text-xs text-subtle mt-2">Coming soon</span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TrendingMoviesBanner;
