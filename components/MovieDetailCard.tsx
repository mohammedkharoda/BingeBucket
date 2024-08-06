import { formatDate } from "@/config/dateFormat";
import { convertMinutesToHoursAndMinutes } from "@/config/timeConvert";
import { useMovieDetails } from "@/hooks/useMovieDetails";
import useCrewStore from "@/store/useCrewStore";
import { CircularProgress, Image } from "@nextui-org/react";

const MovieDetailCard = (id: { id: string | string[] }) => {
  const moviesInfo = useMovieDetails(Number(id.id));
  const moviesDetails = moviesInfo.data;
  const userRating = Math.round((moviesDetails?.vote_average ?? 0) * 10);
  const runtimeData = convertMinutesToHoursAndMinutes(
    moviesDetails?.runtime ?? 0
  );
  const dateData = formatDate(moviesDetails?.release_date ?? "");
  const CrewMember = useCrewStore((state) => state.crew);
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
      <div className="relative z-10 flex flex-col md:flex-row max-w-6xl w-full p-8 bg-[#0000] bg-opacity-80 rounded-lg shadow-lg text-white m-4">
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

            <button className="bg-brown px-4 py-2 rounded-md font-semibold hover:bg-yellow-dark">
              Play Trailer
            </button>
          </div>

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
                <div key={member.id} className="flex gap-4">
                  <div className="flex flex-col items-start">
                    <p className="font-semibold text-[16px]">{member.name}</p>
                    <p className="text-gray-300 font-light">{member.job}</p>
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
