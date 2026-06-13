"use client";
import Link from "next/link";
import Image from "next/image";
import { RiArrowRightLine, RiStarFill, RiPlayFill } from "react-icons/ri";

import { truncateSentence } from "@/config/truncate";
import LoadingCard from "@/components/common/LoadingCard";
import { useNowPlayingMovies } from "@/hooks/useNowPlayingMovies";
import { Reveal, Stagger, StaggerItem } from "@/components/common/Motion";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1800&q=80";

const MediaCard = () => {
  const { data: movieData } = useNowPlayingMovies();

  if (!movieData) {
    return (
      <section className="container-site py-20">
        <LoadingCard />
      </section>
    );
  }

  const movies = (movieData as any[]).slice(0, 12);

  return (
    <section className="container-site py-20 lg:py-28">
      <Reveal className="mb-12 flex items-end justify-between">
        <div className="flex flex-col gap-3">
          <span className="eyebrow">In cinemas now</span>
          <h2 className="section-title">Now Playing</h2>
          <p className="max-w-md text-sm text-text-3">
            Fresh from the projector — the films lighting up theatres this week.
          </p>
        </div>
        <Link
          className="group hidden items-center gap-2 text-sm font-medium text-text-2 transition-colors hover:text-accent sm:inline-flex"
          href="/movies"
        >
          View all
          <RiArrowRightLine
            className="transition-transform duration-200 group-hover:translate-x-1"
            size={15}
          />
        </Link>
      </Reveal>

      <Stagger className="hide-scrollbar mask-fade-r flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4">
        {movies.map((movie: any) => (
          <StaggerItem
            key={movie.id}
            className="w-[180px] flex-shrink-0 snap-start sm:w-[210px]"
          >
            <Link className="poster-card group block" href={`/movies/${movie.id}`}>
              <div className="relative aspect-[2/3] overflow-hidden">
                <Image
                  fill
                  alt={movie.title}
                  className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-110"
                  loading="lazy"
                  sizes="210px"
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : FALLBACK_IMAGE
                  }
                />

                {/* hover gradient + play affordance + synopsis */}
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/30 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-accent text-[#1C1812] shadow-glow-accent">
                    <RiPlayFill size={20} />
                  </span>
                  <p className="line-clamp-3 text-xs leading-relaxed text-text-2">
                    {truncateSentence(movie.overview || "", 110)}
                  </p>
                </div>

                {(movie.vote_average ?? 0) > 0 && (
                  <div className="absolute right-2.5 top-2.5 flex items-center gap-1 rounded-full bg-black/75 px-2 py-1 ring-1 ring-white/10 backdrop-blur-sm">
                    <RiStarFill className="text-gold" size={10} />
                    <span className="text-[10px] font-bold text-white">
                      {(movie.vote_average ?? 0).toFixed(1)}
                    </span>
                  </div>
                )}
              </div>

              <div className="px-1 pt-3">
                <p className="truncate text-sm font-semibold text-text">
                  {movie.title}
                </p>
                <p className="mt-0.5 text-xs text-text-3">
                  {movie.release_date?.slice(0, 4) || "—"}
                </p>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
};

export default MediaCard;
