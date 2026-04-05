import CircularProgress from "@/components/ui/CircularProgress";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MdOndemandVideo } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { RiBookmarkLine } from "react-icons/ri";
import ReactPlayer from "react-player";
import { toast } from "sonner";

import { formatDate } from "@/config/dateFormat";
import { useSeriesDetails } from "@/hooks/useSeriesDetails";
import { useSeriesVideoShowcase } from "@/hooks/useSeriesVideoShowcase";
import useSeriesCrewStore from "@/store/useSeriesCrewStore";
import useSeasonSeries from "@/store/useSeriesSeason";
import { Video } from "@/types";
import { useWatchlistStore } from "@/store/useWatchlistStore";

const SeriesDetailsCard = (id: { id: string | string[] }) => {
  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const moviesInfo = useSeriesDetails(Number(id.id));
  const [isTrailerVisible, setTrailerVisible] = useState(false);
  const seriesDetails = moviesInfo.data;
  const userRating = Math.round((seriesDetails?.vote_average ?? 0) * 10);
  const dateData = formatDate(seriesDetails?.first_air_date ?? "");
  const CrewMember = useSeriesCrewStore((state) => state.createdBy);
  const Networks = useSeriesCrewStore((state) => state.networks);
  const production = useSeriesCrewStore((state) => state.productionCompanies);
  const setCreatedBy = useSeriesCrewStore((state) => state.setCreatedBy);
  const setNetworks = useSeriesCrewStore((state) => state.setNetworks);
  const setProductionCompanies = useSeriesCrewStore(
    (state) => state.setProductionCompanies
  );
  const setSeasonSeries = useSeasonSeries(
    (state: any) => state.setSeasonSeries
  );

  const { data, isLoading, error } = useSeriesVideoShowcase(Number(id.id));
  const videoData: Video[] = (data as unknown as Video[]) ?? [];
  const trailer = Array.isArray(videoData)
    ? videoData.filter((data) => data.type === "Trailer")[1] ||
      videoData.filter((data) => data.type === "Trailer")[0]
    : undefined;
  const {
    addToWatchlist,
    removeFromWatchlist,
    isMovieInWatchlist,
    isAuthenticated,
  } = useWatchlistStore();
  const isInWatchlist = isMovieInWatchlist(seriesDetails?.id || 0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isDark = isMounted && resolvedTheme === "dark";
  const shellOverlay = isDark
    ? "radial-gradient(circle at 20% 15%, rgba(122,182,255,0.16) 0%, rgba(122,182,255,0) 36%), radial-gradient(circle at 80% 22%, rgba(232,117,106,0.18) 0%, rgba(232,117,106,0) 42%), linear-gradient(180deg, rgba(10,12,18,0.62) 0%, rgba(10,12,18,0.78) 100%)"
    : "radial-gradient(circle at 20% 15%, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0) 36%), radial-gradient(circle at 80% 22%, rgba(232,117,106,0.2) 0%, rgba(232,117,106,0) 40%), linear-gradient(180deg, rgba(249,246,241,0.72) 0%, rgba(245,239,231,0.85) 100%)";

  const shellBlur = isDark ? "blur(16px) saturate(130%)" : "blur(18px) saturate(130%)";
  const cardBorder = isDark ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.55)";
  const cardBackground = isDark
    ? "linear-gradient(140deg, rgba(20,24,34,0.72) 0%, rgba(15,18,26,0.52) 48%, rgba(25,30,42,0.66) 100%)"
    : "linear-gradient(140deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.3) 48%, rgba(255,255,255,0.5) 100%)";
  const cardShadow = isDark
    ? "inset 0 1px 0 rgba(255,255,255,0.14), inset 0 -1px 0 rgba(255,255,255,0.06), 0 24px 50px rgba(0,0,0,0.58)"
    : "inset 0 1px 0 rgba(255,255,255,0.75), inset 0 -1px 0 rgba(255,255,255,0.25), 0 24px 50px rgba(20,18,12,0.18)";
  const topSheen = isDark
    ? "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 100%)"
    : "linear-gradient(180deg, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0) 100%)";
  const sideBlob = isDark ? "rgba(107,181,214,0.22)" : "rgba(107,181,214,0.2)";
  const cornerBlob = isDark ? "rgba(245,200,66,0.14)" : "rgba(245,200,66,0.22)";
  const accentBlob = isDark ? "rgba(232,117,106,0.2)" : "rgba(232,117,106,0.22)";
  const chipBackground = isDark ? "rgba(18,25,37,0.55)" : "rgba(255,255,255,0.38)";
  const chipBorder = isDark ? "rgba(245, 200, 66, 0.5)" : "rgba(245, 200, 66, 0.4)";
  const watchlistBackground = isDark ? "rgba(24,31,46,0.62)" : "rgba(255,255,255,0.28)";
  const watchlistBorder = isDark ? "rgba(255,255,255,0.25)" : "rgba(212,203,191,0.75)";
  const activeWatchlistBackground = isDark ? "rgba(76,175,130,0.2)" : "rgba(255,255,255,0.35)";
  const activeWatchlistBorder = isDark ? "rgba(76, 175, 130, 0.5)" : "rgba(76, 175, 130, 0.35)";
  const metaBackground = isDark ? "rgba(23,29,42,0.58)" : "rgba(255,255,255,0.28)";
  const metaBorder = isDark ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.45)";
  const primaryLabelColor = isDark ? "var(--color-muted)" : "var(--color-off-white)";

  const handleWatchlistToggle = () => {
    if (!seriesDetails) return;
    if (isInWatchlist) {
      removeFromWatchlist(seriesDetails.id);
    } else {
      addToWatchlist({
        id: seriesDetails.id,
        title: seriesDetails.name,
        poster_path: seriesDetails.poster_path,
        backdrop_path: seriesDetails.backdrop_path,
        vote_average: seriesDetails.vote_average,
        release_date: seriesDetails.first_air_date,
        media_type: "series",
      });
    }
  };

  useEffect(() => {
    if (seriesDetails?.created_by) {
      setCreatedBy(seriesDetails.created_by);
    }
    if (seriesDetails?.networks) {
      setNetworks(seriesDetails.networks);
    }
    if (seriesDetails?.production_companies) {
      setProductionCompanies(seriesDetails.production_companies);
    }
    if (seriesDetails?.seasons) {
      setSeasonSeries(seriesDetails.seasons);
    }
  }, [
    seriesDetails,
    setCreatedBy,
    setNetworks,
    setProductionCompanies,
    setSeasonSeries,
  ]);

  if (isLoading) return <p className="text-muted p-8">Loading...</p>;
  if (error) return <p className="text-red p-8">Error: {error.message}</p>;

  return (
    <div
      className="relative flex min-h-screen w-full items-center justify-center overflow-x-hidden bg-cover bg-center py-10"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${seriesDetails?.backdrop_path})`,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: shellOverlay,
          backdropFilter: shellBlur,
        }}
      />
      <div
        className="pointer-events-none absolute -left-16 top-16 h-52 w-52 rounded-full blur-3xl"
        style={{ background: sideBlob }}
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-12 h-60 w-60 rounded-full blur-3xl"
        style={{ background: cornerBlob }}
      />

      {/* Main content container */}
      <div
        className="relative z-10 m-4 flex w-full max-w-5xl flex-col gap-8 overflow-hidden rounded-3xl border p-8 shadow-card-hover md:flex-row"
        style={{
          borderColor: cardBorder,
          background: cardBackground,
          boxShadow: cardShadow,
          backdropFilter: "blur(16px) saturate(145%)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-20"
          style={{
            background: topSheen,
          }}
        />
        <div
          className="pointer-events-none absolute -top-12 right-20 h-32 w-32 rounded-full blur-2xl"
          style={{ background: accentBlob }}
        />

        {/* Left Section: Series Poster */}
        <div className="flex justify-center md:justify-start w-full md:w-1/3 flex-shrink-0">
          <img
            alt={`${seriesDetails?.name} Poster`}
            className="h-auto w-full rounded-2xl border border-white/30 shadow-card"
            loading="lazy"
            src={`https://image.tmdb.org/t/p/w500/${seriesDetails?.poster_path}`}
          />
        </div>

        {/* Right Section: Series Details */}
        <div className="w-full md:w-2/3 flex flex-col gap-5">
          {/* Title and Date */}
          <div>
            <h1 className="mb-2 text-3xl font-bold leading-tight text-off-white lg:text-4xl">
              {seriesDetails?.name}
            </h1>
            <p className="text-sm font-medium text-muted">{dateData}</p>
          </div>

          {/* Genres */}
          {seriesDetails?.genres && seriesDetails.genres.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {seriesDetails.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="rounded-full border px-3 py-1 text-xs font-medium capitalize backdrop-blur-md"
                  style={{
                    color: "#C48C12",
                    borderColor: chipBorder,
                    backgroundColor: chipBackground,
                  }}
                >
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          {/* User Score and Buttons */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <CircularProgress
                classNames={{
                  svg: "w-[50px] h-[50px] drop-shadow-md",
                  indicator: `${userRating > 70 ? "stroke-green-pastel" : userRating >= 40 ? "stroke-yellow-dark" : "stroke-crimson-red"}`,
                  value: "text-[14px] font-semibold text-off-white",
                }}
                showValueLabel={true}
                strokeWidth={2}
                value={userRating}
              />
              <p className="text-sm font-semibold" style={{ color: primaryLabelColor }}>
                User Ratings
              </p>
            </div>

            <button
              className="inline-flex cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-off-white shadow-card transition-all duration-200"
              style={{
                background:
                  "linear-gradient(135deg, rgba(245,200,66,0.95) 0%, rgba(232,160,32,0.95) 100%)",
              }}
              onClick={() => {
                if (trailer) {
                  setTrailerVisible(true);
                } else {
                  toast.error("Sorry! No Trailer available.");
                }
              }}
            >
              <MdOndemandVideo size={16} />
              Play Trailer
            </button>

            {isAuthenticated && (
              <button
                className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full border transition-all duration-200 cursor-pointer ${
                  isInWatchlist
                    ? "text-green border-green/25 hover:bg-green/10"
                    : "text-muted hover:text-off-white"
                }`}
                style={
                  isInWatchlist
                    ? {
                        backgroundColor: activeWatchlistBackground,
                        borderColor: activeWatchlistBorder,
                        backdropFilter: "blur(10px)",
                      }
                    : {
                        backgroundColor: watchlistBackground,
                        borderColor: watchlistBorder,
                        backdropFilter: "blur(10px)",
                      }
                }
                onClick={handleWatchlistToggle}
              >
                <RiBookmarkLine size={15} />
                {isInWatchlist ? "In Watchlist" : "Add to Watchlist"}
              </button>
            )}
          </div>

          {/* Trailer Modal */}
          {isTrailerVisible && trailer && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center"
              style={{ background: "rgba(11, 15, 27, 0.72)", backdropFilter: "blur(6px)" }}
            >
              <div className="w-full max-w-4xl p-4 relative">
                <button
                  className="absolute -top-2 -right-2 z-10 rounded-full bg-gold p-1.5 text-off-white transition-colors hover:bg-gold-dim"
                  onClick={() => setTrailerVisible(false)}
                >
                  <IoMdCloseCircleOutline size={20} />
                </button>
                <ReactPlayer
                  controls
                  height="500px"
                  style={{ outline: "none", borderRadius: "12px" }}
                  url={`https://www.youtube.com/watch?v=${trailer.key}`}
                  width="100%"
                />
              </div>
            </div>
          )}

          {/* Tagline / Overview */}
          <div>
            <p className="mb-2 text-base font-bold text-off-white">
              {seriesDetails?.tagline || "Overview"}
            </p>
            <p className="text-muted text-sm leading-relaxed">
              {seriesDetails?.overview}
            </p>
          </div>

          {/* Series Metadata */}
          <div className="grid grid-cols-1 gap-4 border-t border-surface-4 pt-4 sm:grid-cols-3 sm:gap-6">
            {/* Created By */}
            {CrewMember.length > 0 && (
              <div
                className="flex flex-col gap-3 rounded-2xl border p-3"
                style={{
                  borderColor: metaBorder,
                  backgroundColor: metaBackground,
                  backdropFilter: "blur(10px)",
                }}
              >
                <p className="text-xs font-bold text-subtle uppercase tracking-widest">
                  Created By
                </p>
                {CrewMember.map((member) => (
                  <div key={member.id} className="flex items-center gap-2">
                    <img
                      className="rounded-full w-9 h-9 object-cover object-top"
                      src={
                        member?.profile_path
                          ? `https://image.tmdb.org/t/p/w92/${member.profile_path}`
                          : "/image/forbidden.png"
                      }
                      alt={member.original_name}
                    />
                    <p className="text-sm text-muted">{member.original_name}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Streaming On */}
            {Networks.length > 0 && (
              <div
                className="flex flex-col gap-3 rounded-2xl border p-3"
                style={{
                  borderColor: metaBorder,
                  backgroundColor: metaBackground,
                  backdropFilter: "blur(10px)",
                }}
              >
                <p className="text-xs font-bold text-subtle uppercase tracking-widest">
                  Streaming On
                </p>
                <div className="flex flex-wrap gap-2">
                  {Networks.map((network) => (
                    <div key={network.id} className="bg-surface-2 rounded-lg p-2">
                      {network?.logo_path ? (
                        <img
                          className="w-20 h-auto object-contain"
                          loading="lazy"
                          src={`https://image.tmdb.org/t/p/w92/${network.logo_path}`}
                          alt={network.name || "Network"}
                        />
                      ) : (
                        <p className="text-xs text-muted px-2 py-1">{network.name}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Status */}
            <div
              className="flex flex-col gap-3 rounded-2xl border p-3"
              style={{
                  borderColor: metaBorder,
                  backgroundColor: metaBackground,
                backdropFilter: "blur(10px)",
              }}
            >
              <p className="text-xs font-bold text-subtle uppercase tracking-widest">
                Status
              </p>
              <span
                className={`inline-flex w-fit px-3 py-1 rounded-full text-xs font-semibold border ${
                  seriesDetails?.status === "Returning Series"
                    ? "bg-red/10 text-red border-red/20"
                    : "bg-green/10 text-green border-green/20"
                }`}
              >
                {seriesDetails?.status || "Unknown"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeriesDetailsCard;
