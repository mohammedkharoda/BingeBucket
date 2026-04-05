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
        <div className="absolute inset-0 bg-black/70 dark:bg-black/80" />
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-surface-4 border-t-gold" />
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-subtle">Loading</p>
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
      <div className="absolute inset-0 bg-white/70 backdrop-blur-2xl dark:bg-black/72" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 62% 55% at 70% 50%, rgba(107,181,214,0.2) 0%, rgba(107,181,214,0) 72%), radial-gradient(ellipse 58% 50% at 28% 22%, rgba(232,117,106,0.15) 0%, rgba(232,117,106,0) 70%)",
        }}
      />
      <div className="pointer-events-none absolute -left-16 top-24 h-56 w-56 rounded-full bg-gold/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />

      <div
        className="relative z-10 m-4 flex w-full max-w-5xl flex-col gap-8 overflow-hidden rounded-3xl border border-white/45 p-8 md:m-8 md:flex-row dark:border-white/20"
        style={{
          backdropFilter: "blur(24px) saturate(145%)",
          background:
            "linear-gradient(140deg, rgba(255,255,255,0.56) 0%, rgba(255,255,255,0.3) 46%, rgba(255,255,255,0.5) 100%)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.68), 0 28px 54px rgba(10,10,10,0.24)",
        }}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-white/25 dark:bg-white/10" />

        <div className="flex w-full flex-shrink-0 justify-center md:w-[220px] md:justify-start">
          <img
            alt={`${moviesDetails?.title} Poster`}
            className="h-auto w-full rounded-2xl border border-white/40 object-cover shadow-card dark:border-white/15"
            loading="lazy"
            src={`https://image.tmdb.org/t/p/w500/${moviesDetails?.poster_path}`}
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-5">
          <div>
            <h1 className="mb-2 text-3xl font-extrabold leading-tight tracking-tight text-off-white lg:text-4xl">
              {moviesDetails?.title}
            </h1>
            <p className="text-sm font-semibold text-off-white/80 dark:text-white/70">
              {dateData} &nbsp;·&nbsp; {runtimeData}
            </p>
          </div>

          {moviesDetails?.genres && moviesDetails.genres.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {moviesDetails.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="rounded-full border border-surface-4 bg-white/55 px-3.5 py-1 text-xs font-semibold text-off-white dark:border-gold/35 dark:bg-slate-900/60 dark:text-gold"
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
                classNames={{ value: "text-[14px] font-bold text-off-white" }}
                size={64}
                strokeWidth={4}
                value={userRating}
              />
              <p className="text-[10px] font-semibold uppercase tracking-wide text-off-white/65 dark:text-subtle">
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
              <span className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-off-white shadow-card transition hover:bg-gold-dim">
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
                      ? "border-green/35 bg-green/10 text-green"
                      : "border-surface-4 bg-white/30 text-off-white dark:bg-slate-900/60"
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
              <p className="mb-2 text-base font-bold italic text-off-white/90">
                &quot;{moviesDetails.tagline}&quot;
              </p>
            )}
            <p className="text-sm leading-7 text-off-white/90 dark:text-muted">
              {moviesDetails?.overview}
            </p>
          </div>

          {CrewMember.length > 0 && (
            <div className="grid grid-cols-2 gap-4 border-t border-surface-4 pt-4 md:grid-cols-3">
              {CrewMember.map((member) => (
                <div key={`${member?.id}-${member?.job}`}>
                  <p className="text-sm font-bold text-off-white">{member?.name}</p>
                  <p className="text-xs text-off-white/60 dark:text-subtle">{member?.job}</p>
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
                  className="flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110"
                  style={{ width: "40px", height: "40px" }}
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
