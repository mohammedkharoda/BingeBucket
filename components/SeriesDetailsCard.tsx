import { formatDate } from "@/config/dateFormat";
import { useSeriesDetails } from "@/hooks/useSeriesDetails";
import useSeriesCrewStore from "@/store/useSeriesCrewStore";
import useSeasonSeries from "@/store/useSeriesSeason";
import { CircularProgress, Code, Image } from "@nextui-org/react";
import { set } from "date-fns";
import React, { useEffect } from "react";

const SeriesDetailsCard = (id: { id: string | string[] }) => {
  const moviesInfo = useSeriesDetails(Number(id.id));
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

  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${seriesDetails?.backdrop_path})`,
      }}
    >
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black opacity-85"></div>

      {/* Main content container */}
      <div className="relative z-10 flex flex-col md:flex-row max-w-6xl w-full p-8 bg-[#9797974d] bg-opacity-80 rounded-lg text-white m-4">
        {/* Left Section: Movie Poster */}
        <div className="flex justify-center md:justify-start w-full md:w-1/3 mb-8 md:mb-0">
          <Image
            width={450}
            height={675}
            loading="lazy"
            src={`https://image.tmdb.org/t/p/original/${seriesDetails?.poster_path}`}
            alt={`${seriesDetails?.name} Poster`}
            className="rounded-lg shadow-md"
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
                value={userRating}
                strokeWidth={2}
                showValueLabel={true}
              />
              <p className="text-[16px] font-semibold">User Ratings</p>
            </div>

            <button className="bg-brown px-4 py-2 rounded-md font-semibold hover:bg-yellow-dark">
              Play Trailer
            </button>
          </div>

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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:min-w-max gap-6 mt-5">
            {CrewMember.map((member) => (
              <div key={member.id} className="flex gap-4">
                <div className="flex flex-col items-start gap-2">
                  <p className="font-semibold text-[20px]">Created By</p>
                  <Image
                    radius="sm"
                    width={100}
                    src={`https://image.tmdb.org/t/p/original/${member?.profile_path}`}
                  />
                  <p className="font-semibold text-[16px]">
                    {member.original_name}
                  </p>
                </div>
              </div>
            ))}
            {/* network */}
            {Networks.map((network) => (
              <div className="flex flex-col items-start gap-2">
                <p className="font-semibold text-[20px]">Streaming On</p>
                <Image
                  className="rounded-none"
                  width={130}
                  loading="lazy"
                  src={`https://image.tmdb.org/t/p/original/${network?.logo_path}`}
                />
              </div>
            ))}
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
                      width={100}
                      loading="lazy"
                      src={`https://image.tmdb.org/t/p/original/${company?.logo_path}`}
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
                <Code color="danger" className="font-semibold text-[16px]">
                  {seriesDetails?.status}
                </Code>
              ) : (
                <Code color="success" className="font-semibold text-[16px]">
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
