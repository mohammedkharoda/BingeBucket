"use client";
import Link from "next/link";
import Image from "next/image";
import { RiArrowRightLine, RiStarFill } from "react-icons/ri";

import { truncateSentence } from "@/config/turncate";
import LoadingCard from "@/shared/LoadingCard";
import { useNowPlayingMovies } from "@/hooks/useNowPlayingMovies";
import Slideshow, { type SlideshowSlide } from "@/components/ui/slideshow";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1800&q=80";

const splitTitleForSlide = (title: string) => {
  const words = title.trim().split(/\s+/);
  if (words.length <= 2) {
    return [title.toUpperCase(), "NOW PLAYING"];
  }

  const pivot = Math.ceil(words.length / 2);
  return [
    words.slice(0, pivot).join(" ").toUpperCase(),
    words.slice(pivot).join(" ").toUpperCase(),
  ];
};

const MediaCard = () => {
  const { data: movieData } = useNowPlayingMovies();

  if (!movieData) return <LoadingCard />;

  const movies = movieData as any[];

  const slides: SlideshowSlide[] = movies.slice(0, 5).map((movie) => ({
    img: movie.backdrop_path
      ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
      : movie.poster_path
        ? `https://image.tmdb.org/t/p/w780${movie.poster_path}`
        : FALLBACK_IMAGE,
    text: splitTitleForSlide(movie.title || "Now Playing"),
    href: `/movies/${movie.id}`,
    description: truncateSentence(movie.overview || "", 130),
    rating: typeof movie.vote_average === "number" ? movie.vote_average : undefined,
    date: movie.release_date
      ? new Date(movie.release_date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
        })
      : undefined,
    tag: "In Cinemas",
  }));

  const railMovies = movies.slice(5, 13);

  return (
    <section
      className="relative mx-auto max-w-site px-6 py-20 lg:px-16"
      style={{
        background:
          "linear-gradient(180deg, rgba(248,244,236,0.86) 0%, rgba(249,246,241,1) 20%, rgba(249,246,241,1) 100%)",
      }}
    >
      <div className="mb-10 flex items-end justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-1 h-5 rounded-full bg-gold" />
            <p className="text-xs font-bold text-gold uppercase tracking-widest">
              In Cinemas
            </p>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight" style={{ color: "var(--color-white)" }}>
            Now Playing
          </h2>
        </div>
        <Link
          href="/movies"
          className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-gold transition-colors duration-200"
        >
          View all <RiArrowRightLine size={14} />
        </Link>
      </div>

      <Slideshow slides={slides} />

      <div className="relative mt-8">
        <div
          className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4"
        >
        {railMovies.map((movie: any) => (
          <Link key={movie.id} href={`/movies/${movie.id}`} className="flex-shrink-0 snap-start">
            <div
              className="group overflow-hidden rounded-2xl border border-surface-4 bg-surface transition-all duration-300 hover:border-gold/30 hover:shadow-card-hover"
              style={{ width: "170px" }}
            >
              <div className="relative overflow-hidden" style={{ height: "255px" }}>
                <Image
                  alt={movie.title}
                  fill
                  loading="lazy"
                  sizes="170px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  src={movie.poster_path
                    ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
                    : FALLBACK_IMAGE}
                />
                {(movie.vote_average ?? 0) > 0 && (
                  <div
                    className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-1 rounded-full backdrop-blur-sm"
                    style={{
                      background: "rgba(0,0,0,0.72)",
                      border: "1px solid rgba(255,255,255,0.15)",
                    }}
                  >
                    <RiStarFill size={9} color="#D4AF37" />
                    <span style={{ fontSize: "10px", fontWeight: 700, color: "#ffffff" }}>
                      {(movie.vote_average ?? 0).toFixed(1)}
                    </span>
                  </div>
                )}
              </div>
              <div className="px-3 py-2.5">
                <p
                  className="truncate"
                  style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-white)" }}
                >
                  {movie.title}
                </p>
              </div>
            </div>
          </Link>
        ))}
        </div>
      </div>
    </section>
  );
};

export default MediaCard;
