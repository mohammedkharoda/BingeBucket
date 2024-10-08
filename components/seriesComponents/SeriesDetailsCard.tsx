import { CircularProgress, Code, Image } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { MdOndemandVideo } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";
import ReactPlayer from "react-player";
import { toast } from "sonner";
import { FaSwatchbook } from "react-icons/fa";

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
  // Accessing the store
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
  }, [seriesDetails, setCreatedBy, setNetworks]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${seriesDetails?.backdrop_path})`,
      }}
    >
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black opacity-85" />

      {/* Main content container */}
      <div className="relative z-10 flex flex-col md:flex-row max-w-6xl w-full p-8 bg-[#9797974d] bg-opacity-80 rounded-lg text-white m-4">
        {/* Left Section: Movie Poster */}
        <div className="flex justify-center md:justify-start w-full md:w-1/3 mb-8 md:mb-0">
          <Image
            alt={`${seriesDetails?.name} Poster`}
            className="rounded-lg shadow-md"
            height={675}
            loading="lazy"
            src={`https://image.tmdb.org/t/p/original/${seriesDetails?.poster_path}`}
            width={450}
          />
        </div>

        {/* Right Section: Movie Details */}
        <div className="w-full md:w-2/3 md:pl-8">
          {/* Title and Release Date */}
          <div className="flex flex-col items-start gap-2 mb-4">
            <h1 className="text-4xl font-bold">{seriesDetails?.name} </h1>
            <p className="text-sm font-medium text-gray-300">{dateData}</p>
          </div>
          <div className="flex items-start gap-5">
            {/* Genres */}
            {seriesDetails?.genres &&
              seriesDetails.genres.map((genre) => (
                <ul key={genre.id}>
                  <li className="bg-brown rounded-lg px-[5px] py-[2px] capitalize">
                    {genre.name}
                  </li>
                </ul>
              ))}
          </div>

          {/* User Score and Buttons */}
          <div className="flex items-center gap-4 my-4">
            <div className="flex items-center gap-2">
              <CircularProgress
                classNames={{
                  svg: "w-[50px] h-[50px] drop-shadow-md",
                  indicator: `${userRating > 70 ? "stroke-green-pastel" : userRating >= 40 ? "stroke-yellow-dark" : "stroke-crimson-red"}`,
                  value: "text-[14px] font-semibold text-white",
                }}
                showValueLabel={true}
                strokeWidth={2}
                value={userRating}
              />
              <p className="text-[16px] font-semibold">User Ratings</p>
            </div>

            <button
              className="bg-brown px-4 py-2 rounded-md font-semibold hover:bg-yellow-dark flex items-center"
              onClick={() => {
                if (trailer) {
                  setTrailerVisible(true);
                } else {
                  toast.error("Sorry! No Trailer available. 😭");
                }
              }}
            >
              <MdOndemandVideo className="mr-2" color="white" />
              Play Trailer
            </button>
            {isAuthenticated && (
              <button
                className={`px-4 py-2 rounded-md font-semibold flex items-center gap-4 ${
                  isInWatchlist ? "bg-dark-green" : "bg-brown"
                } hover:bg-yellow-dark`}
                onClick={handleWatchlistToggle}
              >
                <FaSwatchbook size={16} />
                {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
              </button>
            )}
          </div>
          {isTrailerVisible && trailer && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
              <div className="w-full max-w-4xl p-4">
                <button
                  className="absolute top-2 right-2 text-white rounded-full p-1"
                  style={{ fontSize: "2rem" }}
                  onClick={() => setTrailerVisible(false)}
                >
                  <IoMdCloseCircleOutline />
                </button>
                <ReactPlayer
                  controls
                  height="500px"
                  style={{ outline: "none", borderRadius: "10px" }}
                  url={`https://www.youtube.com/watch?v=${trailer.key}`}
                  width="100%"
                />
              </div>
            </div>
          )}
          {/* Tagline or Overview */}
          <div className="flex flex-col items-start">
            <p className="font-bold text-[20px] text-left mb-4 text-off-white">
              {(seriesDetails?.tagline && seriesDetails?.tagline) || "Overview"}
            </p>
            <p className="text-off-white text-left text-[18px] mb-4">
              {seriesDetails?.overview}
            </p>
          </div>

          {/* Crew Members */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 md:min-w-max gap-6 mt-5">
            {CrewMember.map((member) => (
              <div key={member.id} className="flex gap-4">
                <div className="flex flex-col items-start gap-2">
                  <p className="font-semibold text-[20px]">Created By</p>
                  <Image
                    radius="sm"
                    src={`https://image.tmdb.org/t/p/original/${member?.profile_path}`}
                    width={100}
                  />
                  <p className="font-semibold text-[16px]">
                    {member.original_name}
                  </p>
                </div>
              </div>
            ))}
            {/* network */}
            <div className="flex flex-col items-start gap-2">
              <p className="font-semibold text-[20px]">Streaming On</p>
              {Networks.map((network) => (
                <Image
                  key={network.id}
                  className="rounded-none"
                  loading="lazy"
                  src={`https://image.tmdb.org/t/p/original/${network?.logo_path}`}
                  width={130}
                />
              ))}
            </div>
            {/* productions */}
            <div className="flex flex-col items-center gap-5">
              <p className="font-semibold text-[20px] capitalize">
                Production house
              </p>
              {production.map((company) => (
                <div
                  key={company.id}
                  className="flex flex-col items-center gap-2"
                >
                  {company?.logo_path ? (
                    <Image
                      className="rounded-none"
                      loading="lazy"
                      src={`https://image.tmdb.org/t/p/original/${company?.logo_path}`}
                      width={100}
                    />
                  ) : (
                    <p className="font-semibold text-[16px]">{company.name}</p>
                  )}
                </div>
              ))}
            </div>
            {/* Status */}
            <div className="flex flex-col items-start gap-2">
              <p className="font-semibold text-[20px]">Status</p>
              {seriesDetails?.status === "Returning Series" ? (
                <Code className="font-semibold text-[16px]" color="danger">
                  {seriesDetails?.status}
                </Code>
              ) : (
                <Code className="font-semibold text-[16px]" color="success">
                  Ended
                </Code>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeriesDetailsCard;
