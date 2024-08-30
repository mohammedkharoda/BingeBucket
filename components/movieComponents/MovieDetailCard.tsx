import { formatDate } from "@/config/dateFormat";
import { convertMinutesToHoursAndMinutes } from "@/config/timeConvert";
import { useMovieDetails } from "@/hooks/useMovieDetails";
import { useMovieTrailer } from "@/hooks/useMovieTrailer";
import useCrewStore from "@/store/useCrewStore";
import { useWatchlistStore } from "@/store/useWatchlistStore";
import { CircularProgress, Image } from "@nextui-org/react";
import { useState } from "react";
import { FaSwatchbook } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdOndemandVideo } from "react-icons/md";
import ReactPlayer from "react-player";

const MovieDetailCard = (id: { id: string | string[] }) => {
  const [isTrailerVisible, setTrailerVisible] = useState(false);

  const moviesInfo = useMovieDetails(Number(id.id));
  const moviesDetails = moviesInfo.data;
  const userRating = Math.round((moviesDetails?.vote_average ?? 0) * 10);
  const runtimeData = convertMinutesToHoursAndMinutes(
    moviesDetails?.runtime ?? 0
  );
  const dateData = formatDate(moviesDetails?.release_date ?? "");
  const CrewMember = useCrewStore((state) => state?.crew);

  const movieTrailer = useMovieTrailer(Number(id.id));
  const movieTrailerData = movieTrailer?.data;

  const trailer = Array.isArray(movieTrailerData)
    ? movieTrailerData.filter((data) => data.type === "Trailer")[1] ||
      movieTrailerData.filter((data) => data.type === "Trailer")[0]
    : undefined;
  const {
    addToWatchlist,
    removeFromWatchlist,
    isMovieInWatchlist,
    isAuthenticated,
  } = useWatchlistStore();

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

  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${moviesDetails?.backdrop_path})`,
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
            src={`https://image.tmdb.org/t/p/original/${moviesDetails?.poster_path}`}
            alt={`${moviesDetails?.title} Poster`}
            className="rounded-lg shadow-md"
          />
        </div>

        {/* Right Section: Movie Details */}
        <div className="w-full md:w-2/3 md:pl-8">
          {/* Title and Release Date */}
          <div className="flex flex-col items-start gap-2 mb-4">
            <h1 className="text-4xl font-bold">{moviesDetails?.title} </h1>
            <p className="text-sm font-medium text-gray-300">
              {dateData} • {runtimeData}{" "}
            </p>
          </div>
          <div className="flex items-start gap-5">
            {/* Genres */}
            {moviesDetails?.genres &&
              moviesDetails.genres.map((genre) => (
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

            {/* Play Trailer Button */}
            <button
              className="bg-brown px-4 py-2 rounded-md font-semibold hover:bg-yellow-dark flex items-center"
              onClick={() => {
                if (trailer) {
                  setTrailerVisible(true);
                } else {
                  alert("Trailer not available.");
                }
              }}
            >
              <MdOndemandVideo className="mr-2" color="white" />
              Play Trailer
            </button>
            {/* add to watchlist  */}
            {isAuthenticated && (
              <button
                onClick={handleWatchlistToggle}
                className={`px-4 py-2 rounded-md font-semibold flex items-center gap-4 ${
                  isInWatchlist ? "bg-dark-green" : "bg-brown"
                } hover:bg-yellow-dark`}
              >
                <FaSwatchbook size={16} />
                {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
              </button>
            )}
          </div>

          {/* Trailer Popover */}
          {isTrailerVisible && trailer && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
              <div className="w-full max-w-4xl p-4">
                <button
                  className="absolute top-2 right-2 text-white rounded-full p-1"
                  onClick={() => setTrailerVisible(false)}
                  style={{ fontSize: "2rem" }}
                >
                  <IoMdCloseCircleOutline />
                </button>
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${trailer.key}`}
                  width="100%"
                  height="500px"
                  controls
                  style={{ outline: "none", borderRadius: "10px" }}
                />
              </div>
            </div>
          )}
          <div></div>
          {/* Tagline or Overview */}
          <div className="flex flex-col items-start">
            <p className="font-bold text-[20px] text-left mb-4 text-off-white">
              {(moviesDetails?.tagline && moviesDetails?.tagline) || "Overview"}
            </p>
            <p className="text-off-white text-left text-[18px] mb-4">
              {moviesDetails?.overview}
            </p>
          </div>

          {/* Crew Members */}
          {CrewMember.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:min-w-max gap-6 mt-5">
              {CrewMember.map((member) => (
                <div key={member?.id} className="flex gap-4">
                  <div className="flex flex-col items-start">
                    <p className="font-semibold text-[16px]">{member?.name}</p>
                    <p className="text-gray-300 font-light">{member?.job}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailCard;
