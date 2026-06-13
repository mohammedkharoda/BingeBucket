"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { MdOndemandVideo } from "react-icons/md";
import { RiBookmarkFill, RiBookmarkLine, RiKeyboardLine } from "react-icons/ri";
import ReactPlayer from "react-player";
import { toast } from "sonner";

import CircularProgress from "@/components/ui/CircularProgress";
import { formatDate } from "@/config/dateFormat";
import { convertMinutesToHoursAndMinutes } from "@/config/timeConvert";
import { useMovieDetails } from "@/hooks/useMovieDetails";
import { useMovieTrailer } from "@/hooks/useMovieTrailer";
import useCrewStore from "@/store/useCrewStore";
import { useWatchlistStore } from "@/store/useWatchlistStore";

const MovieDetailCard = (id: { id: string | string[] }) => {
  const [isTrailerVisible, setTrailerVisible] = useState(false);

  const moviesInfo = useMovieDetails(Number(id.id));
  const isLoading = moviesInfo?.isLoading;
  const moviesDetails = moviesInfo.data;
  const userRating = Math.round((moviesDetails?.vote_average ?? 0) * 10);
  const runtimeData = convertMinutesToHoursAndMinutes(moviesDetails?.runtime ?? 0);
  const dateData = formatDate(moviesDetails?.release_date ?? "");
  const CrewMember = useCrewStore((state) => state?.crew);

  const movieTrailer = useMovieTrailer(Number(id.id));
  const movieTrailerData = movieTrailer?.data;

  const trailer = Array.isArray(movieTrailerData)
    ? movieTrailerData.filter((data) => data.type === "Trailer")[1] ||
      movieTrailerData.filter((data) => data.type === "Trailer")[0]
    : undefined;

  const { addToWatchlist, removeFromWatchlist, isMovieInWatchlist, isAuthenticated } =
    useWatchlistStore();
  const isInWatchlist = isMovieInWatchlist(moviesDetails?.id || 0);

  const handleWatchlistToggle = () => {
    if (!moviesDetails) return;
    if (isInWatchlist) {
      removeFromWatchlist(moviesDetails.id);
    } else {
      addToWatchlist({
        id: moviesDetails.id,
        title: moviesDetails.title,
        poster_path: moviesDetails.poster_path,
        backdrop_path: moviesDetails.backdrop_path,
        vote_average: moviesDetails.vote_average,
        release_date: moviesDetails.release_date,
        media_type: "movie",
      });
    }
  };

  // Close trailer on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setTrailerVisible(false);
    };

    window.addEventListener("keydown", handler);

    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (isLoading) {
    return (
      <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-bg/80" />
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-border border-t-accent" />
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-3">Loading</p>
        </div>
      </div>
    );
  }

  return (
    <>
    <div
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden py-8"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${moviesDetails?.backdrop_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 bg-bg/80 backdrop-blur-2xl" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 62% 55% at 70% 50%, rgba(34,211,238,0.12) 0%, rgba(34,211,238,0) 72%), radial-gradient(ellipse 58% 50% at 28% 22%, rgba(124,92,255,0.14) 0%, rgba(124,92,255,0) 70%)",
        }}
      />
      <div className="pointer-events-none absolute -left-16 top-24 h-56 w-56 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-64 w-64 rounded-full bg-accent-2/20 blur-3xl" />

      <div className="glass relative z-10 m-4 flex w-full max-w-5xl flex-col gap-8 overflow-hidden rounded-3xl p-8 shadow-card md:m-8 md:flex-row">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-white/5" />

        <div className="flex w-full flex-shrink-0 justify-center md:w-[220px] md:justify-start">
          <img
            alt={`${moviesDetails?.title} Poster`}
            className="h-auto w-full rounded-2xl border border-border object-cover shadow-card"
            loading="lazy"
            src={`https://image.tmdb.org/t/p/w500/${moviesDetails?.poster_path}`}
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-5">
          <div>
            <h1 className="mb-2 text-3xl font-extrabold leading-tight tracking-tight text-text lg:text-4xl">
              {moviesDetails?.title}
            </h1>
            <p className="text-sm font-semibold text-text-2">
              {dateData} &nbsp;·&nbsp; {runtimeData}
            </p>
          </div>

          {moviesDetails?.genres && moviesDetails.genres.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {moviesDetails.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="rounded-full border border-accent/35 bg-accent/10 px-3.5 py-1 text-xs font-semibold text-accent"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex flex-col items-center gap-1">
              <CircularProgress
                showValueLabel
                classNames={{ value: "text-[14px] font-bold text-text" }}
                size={64}
                strokeWidth={4}
                value={userRating}
              />
              <p className="text-[10px] font-semibold uppercase tracking-wide text-text-3">
                User Score
              </p>
            </div>

            <button
              className="inline-flex items-center gap-2 transition-all duration-200 hover:-translate-y-0.5"
              onClick={() => {
                if (trailer) setTrailerVisible(true);
                else toast.error("Trailer not available.");
              }}
            >
              <span className="btn-primary">
                <MdOndemandVideo className="opacity-90" size={15} />
                Play Trailer
              </span>
            </button>

            {isAuthenticated && (
              <button
                className="inline-flex items-center gap-2 transition-all duration-200 hover:-translate-y-0.5"
                onClick={handleWatchlistToggle}
              >
                <span
                  className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold ${
                    isInWatchlist
                      ? "border-success/35 bg-success/10 text-success"
                      : "border-border bg-surface-2 text-text"
                  }`}
                >
                  {isInWatchlist ? <RiBookmarkFill size={14} /> : <RiBookmarkLine size={14} />}
                  {isInWatchlist ? "In Watchlist" : "Watchlist"}
                </span>
              </button>
            )}
          </div>

          <div>
            {moviesDetails?.tagline && (
              <p className="mb-2 text-base font-bold italic text-text">
                &quot;{moviesDetails.tagline}&quot;
              </p>
            )}
            <p className="text-sm leading-7 text-text-2">
              {moviesDetails?.overview}
            </p>
          </div>

          {CrewMember.length > 0 && (
            <div className="grid grid-cols-2 gap-4 border-t border-border pt-4 md:grid-cols-3">
              {CrewMember.map((member) => (
                <div key={`${member?.id}-${member?.job}`}>
                  <p className="text-sm font-bold text-text">{member?.name}</p>
                  <p className="text-xs text-text-3">{member?.job}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isTrailerVisible && trailer && (
          <motion.div
            key="trailer-backdrop"
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(10px)" }}
            transition={{ duration: 0.25 }}
            onClick={() => setTrailerVisible(false)}
          >
            <motion.div
              key="trailer-panel"
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="relative mx-4 w-full max-w-4xl"
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4 px-1">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/45">
                    Official Trailer
                  </p>
                  <p className="text-xl font-extrabold leading-tight text-white">
                    {moviesDetails?.title}
                  </p>
                </div>
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/15 transition-all duration-200 hover:scale-110 hover:bg-white/20"
                  onClick={() => setTrailerVisible(false)}
                >
                  <IoMdClose size={18} />
                </button>
              </div>

              <div
                style={{
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "16px",
                  boxShadow: "0 40px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(124,111,205,0.2)",
                  overflow: "hidden",
                }}
              >
                <ReactPlayer
                  controls
                  playing
                  height="500px"
                  style={{ display: "block" }}
                  url={`https://www.youtube.com/watch?v=${trailer.key}`}
                  width="100%"
                />
              </div>

              <div className="flex items-center justify-center gap-2 mt-4 opacity-40">
                <RiKeyboardLine color="#fff" size={13} />
                <span className="text-[11px] font-medium text-white">
                  Press ESC or click outside to close
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </>
  );
};

export default MovieDetailCard;
