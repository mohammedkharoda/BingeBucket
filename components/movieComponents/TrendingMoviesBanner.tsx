"use client";
import { Card } from "@nextui-org/react";
import Link from "next/link";
import { PiWarningCircleBold } from "react-icons/pi";

import { useTrendingOfDay } from "@/hooks/useTrendingOfDay";
import { Movie } from "@/types";
import Loading from "@/shared/Loading";

const TrendingMoviesBanner = () => {
  const { data: movies, isLoading } = useTrendingOfDay();

  // useEffect(() => {
  //   if (isError) {
  //     toast.error(error.message);
  //   }
  // }, [isError, error]);

  if (isLoading) return <Loading />;

  return (
    <div className="py-16">
      <div className="flex gap-5 justify-center">
        <div
          style={{
            fontWeight: 800, // equivalent to Tailwind's font-extrabol
            fontSize: "50px", // equivalent to Tailwind's text-4xl
            background: "linear-gradient(to left, #003049, #c1121f, #000000)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            color: "transparent",
            paddingBottom: "30px",
          }}
        >
          Top Movies of the Week
        </div>
        <img
          alt="Animated fire gif"
          className="lg:block hidden"
          src="../image/award.gif"
          style={{
            width: "80px", // adjust size as needed
            height: "80px",
          }}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {movies &&
          movies.map((movie: Movie) => (
            <Link key={movie.id} href={`/movies/${movie.id}`}>
              <Card
                key={movie.id}
                isBlurred
                isPressable
                className="bg-white rounded-lg overflow-hidden p-3 h-full"
                shadow="md"
              >
                <img
                  alt={movie.title}
                  className=" w-full h-fit rounded-lg shadow-lg"
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                />
                <div className="flex flex-col p-4 gap-5">
                  <div
                    className={`flex justify-around items-center w-full ${movie.vote_average ? "lg:flex-row" : "lg:flex-col gap-5"} flex-col`}
                  >
                    <h2 className="text-[20px] text-left font-semibold text-black">
                      {movie.title?.length >= 40
                        ? movie.title.substring(0, 35) + "..."
                        : movie.title}
                    </h2>
                    {movie.vote_average ? (
                      <p className="text-[15px] font-semibold text-black">
                        &#11088; {movie.vote_average.toFixed(1)}
                      </p>
                    ) : (
                      <p className="bg-yellow-dark px-2 min-w-max py-2 rounded-full text-black font-semibold text-[16px] flex items-center gap-2">
                        <PiWarningCircleBold size={26} />
                        Yet to be released
                      </p>
                    )}
                  </div>
                  {movie.overview ? (
                    <p className="text-black font-medium">{movie.overview}</p>
                  ) : (
                    <p className="text-black font-medium">
                      No overview available
                    </p>
                  )}
                </div>
              </Card>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default TrendingMoviesBanner;
