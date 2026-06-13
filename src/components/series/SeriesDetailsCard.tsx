import React, { useEffect, useState } from "react";
import { MdOndemandVideo } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { RiBookmarkLine } from "react-icons/ri";
import ReactPlayer from "react-player";
import { toast } from "sonner";

import CircularProgress from "@/components/ui/CircularProgress";
import { formatDate } from "@/config/dateFormat";
import { useSeriesDetails } from "@/hooks/useSeriesDetails";
import { useSeriesVideoShowcase } from "@/hooks/useSeriesVideoShowcase";
import useSeriesCrewStore from "@/store/useSeriesCrewStore";
import useSeasonSeries from "@/store/useSeriesSeason";
import { Video } from "@/types";
import { useWatchlistStore } from "@/store/useWatchlistStore";

const SeriesDetailsCard = (id: { id: string | string[] }) => {
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

  if (isLoading) return <p className="text-text-2 p-8">Loading...</p>;
  if (error) return <p className="text-danger p-8">Error: {error.message}</p>;

  return (
    <div
      className="relative flex min-h-screen w-full items-center justify-center overflow-x-hidden bg-cover bg-center py-10"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${seriesDetails?.backdrop_path})`,
      }}
    >
      <div className="absolute inset-0 bg-bg/80 backdrop-blur-xl" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 15%, rgba(124,92,255,0.18) 0%, rgba(124,92,255,0) 40%), radial-gradient(circle at 80% 22%, rgba(34,211,238,0.16) 0%, rgba(34,211,238,0) 42%)",
        }}
      />
      <div className="pointer-events-none absolute -left-16 top-16 h-52 w-52 rounded-full bg-accent/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-12 h-60 w-60 rounded-full bg-accent-2/15 blur-3xl" />

      {/* Main content container */}
      <div className="glass relative z-10 m-4 flex w-full max-w-5xl flex-col gap-8 overflow-hidden rounded-3xl p-8 shadow-card-hover md:flex-row">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/10 to-transparent" />
        <div className="pointer-events-none absolute -top-12 right-20 h-32 w-32 rounded-full bg-accent/20 blur-2xl" />

        {/* Left Section: Series Poster */}
        <div className="flex justify-center md:justify-start w-full md:w-1/3 flex-shrink-0">
          <img
            alt={`${seriesDetails?.name} Poster`}
            className="h-auto w-full rounded-2xl border border-border shadow-card"
            loading="lazy"
            src={`https://image.tmdb.org/t/p/w500/${seriesDetails?.poster_path}`}
          />
        </div>

        {/* Right Section: Series Details */}
        <div className="w-full md:w-2/3 flex flex-col gap-5">
          {/* Title and Date */}
          <div>
            <h1 className="mb-2 text-3xl font-bold leading-tight text-text lg:text-4xl">
              {seriesDetails?.name}
            </h1>
            <p className="text-sm font-medium text-text-2">{dateData}</p>
          </div>

          {/* Genres */}
          {seriesDetails?.genres && seriesDetails.genres.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {seriesDetails.genres.map((genre) => (
                <span key={genre.id} className="pill-accent capitalize">
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
                  indicator: `${userRating > 70 ? "stroke-success" : userRating >= 40 ? "stroke-gold" : "stroke-danger"}`,
                  value: "text-[14px] font-semibold text-text",
                }}
                showValueLabel={true}
                strokeWidth={2}
                value={userRating}
              />
              <p className="text-sm font-semibold text-text-2">
                User Ratings
              </p>
            </div>

            <button
              className="btn-primary"
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
                className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full border backdrop-blur-md transition-all duration-200 cursor-pointer ${
                  isInWatchlist
                    ? "bg-success/15 text-success border-success/40 hover:bg-success/20"
                    : "bg-surface-2 text-text-2 border-border hover:text-text hover:border-accent"
                }`}
                onClick={handleWatchlistToggle}
              >
                <RiBookmarkLine size={15} />
                {isInWatchlist ? "In Watchlist" : "Add to Watchlist"}
              </button>
            )}
          </div>

          {/* Trailer Modal */}
          {isTrailerVisible && trailer && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg/80 backdrop-blur-sm">
              <div className="w-full max-w-4xl p-4 relative">
                <button
                  className="absolute -top-2 -right-2 z-10 rounded-full bg-accent p-1.5 text-white transition-colors hover:bg-accent-2"
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
            <p className="mb-2 text-base font-bold text-text">
              {seriesDetails?.tagline || "Overview"}
            </p>
            <p className="text-text-2 text-sm leading-relaxed">
              {seriesDetails?.overview}
            </p>
          </div>

          {/* Series Metadata */}
          <div className="grid grid-cols-1 gap-4 border-t border-border pt-4 sm:grid-cols-3 sm:gap-6">
            {/* Created By */}
            {CrewMember.length > 0 && (
              <div
                className="flex flex-col gap-3 rounded-2xl border border-border bg-surface-2 p-3 backdrop-blur-md"
              >
                <p className="text-xs font-bold text-text-3 uppercase tracking-widest">
                  Created By
                </p>
                {CrewMember.map((member) => (
                  <div key={member.id} className="flex items-center gap-2">
                    <img
                      alt={member.original_name}
                      className="rounded-full w-9 h-9 object-cover object-top"
                      src={
                        member?.profile_path
                          ? `https://image.tmdb.org/t/p/w92/${member.profile_path}`
                          : "/image/forbidden.png"
                      }
                    />
                    <p className="text-sm text-text-2">{member.original_name}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Streaming On */}
            {Networks.length > 0 && (
              <div
                className="flex flex-col gap-3 rounded-2xl border border-border bg-surface-2 p-3 backdrop-blur-md"
              >
                <p className="text-xs font-bold text-text-3 uppercase tracking-widest">
                  Streaming On
                </p>
                <div className="flex flex-wrap gap-2">
                  {Networks.map((network) => (
                    <div key={network.id} className="bg-surface-2 rounded-lg p-2">
                      {network?.logo_path ? (
                        <img
                          alt={network.name || "Network"}
                          className="w-20 h-auto object-contain"
                          loading="lazy"
                          src={`https://image.tmdb.org/t/p/w92/${network.logo_path}`}
                        />
                      ) : (
                        <p className="text-xs text-text-2 px-2 py-1">{network.name}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Status */}
            <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface-2 p-3 backdrop-blur-md">
              <p className="text-xs font-bold text-text-3 uppercase tracking-widest">
                Status
              </p>
              <span
                className={`inline-flex w-fit px-3 py-1 rounded-full text-xs font-semibold border ${
                  seriesDetails?.status === "Returning Series"
                    ? "bg-danger/10 text-danger border-danger/20"
                    : "bg-success/10 text-success border-success/20"
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
