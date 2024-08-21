"use client";
import { useTrendingOfDay } from "@/hooks/useTrendingOfDay";
import Loading from "@/shared/Loading";
import { Movie } from "@/types";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import Link from "next/link";
import React, { use } from "react";
import { PiWarningCircleBold } from "react-icons/pi";

const TrendingMoviesBanner = () => {
  const { data: movies, isLoading, isError, error } = useTrendingOfDay();
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
          src="../image/award.gif"
          alt="Animated fire gif"
          style={{
            width: "80px", // adjust size as needed
            height: "80px",
          }}
          className="lg:block hidden"
        />
      </div>
      {isLoading && <Loading />}
      {isError && <p className="text-center text-red-500">{error?.message}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {movies &&
          movies.map((movie: Movie) => (
            <Link href={`/movies/${movie.id}`} key={movie.id}>
              <Card
                key={movie.id}
                className="bg-white rounded-lg overflow-hidden p-3 h-full"
                shadow="md"
                isPressable
                isBlurred
              >
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  alt={movie.title}
                  className=" w-full h-fit rounded-lg shadow-lg"
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
