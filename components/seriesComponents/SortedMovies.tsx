"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import { PiWarningCircleBold } from "react-icons/pi";

import { Movie } from "../../types";
import { usePopularMovie } from "@/hooks/usePopularMovie";
import { useTopRatedMovies } from "@/hooks/useTopRatingMovies";
import { useUpcomingMovies } from "@/hooks/useUpcomingMovie";
import { useNowPlayingMovies } from "@/hooks/useNowPlayingMovies";
import Loading from "@/shared/Loading";
const categories = [
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top_rated" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Current Playing", value: "now_playing" },
];
const SortedMovieComponent: React.FC = () => {
  const [category, setCategory] = useState("now_playing");

  // Call all hooks at the top level
  const popularMovies = usePopularMovie();
  const topRatedMovies = useTopRatedMovies();
  const upcomingMovies = useUpcomingMovies();
  const nowPlayingMovies = useNowPlayingMovies();

  // Determine which data to display based on the selected category
  const selectedMovies =
    category === "top_rated"
      ? topRatedMovies
      : category === "upcoming"
        ? upcomingMovies
        : category === "now_playing"
          ? nowPlayingMovies
          : popularMovies;

  const { data: movies, isLoading, isError, error } = selectedMovies;

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };

  return (
    <>
      <div className="flex gap-5 justify-center">
        <div
          style={{
            fontWeight: 800, // equivalent to Tailwind's font-extrabol
            fontSize: "50px", // equivalent to Tailwind's text-4xl
            background: "linear-gradient(to right, #1c1c1c, #8b5a00, #f82852)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            color: "transparent",
            paddingBottom: "30px",
          }}
        >
          Hot Picks in Theaters and Streaming
        </div>
        <img
          src="../image/fire.gif"
          alt="Animated fire gif"
          style={{
            width: "80px", // adjust size as needed
            height: "80px",
          }}
          className="lg:block hidden"
        />
      </div>
      <div className="flex justify-between items-center">
        <div className="text-[18px] capitalize mx-auto font-medium mb-9">
          See the{" "}
          <select
            value={category}
            onChange={handleSortChange}
            className="bg-white text-black rounded-md p-2 shadow-md focus:outline-none focus:ring-2 focus:ring-brown focus:border-yellow"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>{" "}
          movies everyone is talking about.
        </div>
      </div>
      {isLoading && <Loading />}
      {isError && <p className="text-center text-red-500">{error?.message}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies &&
          movies.map((movie: Movie) => (
            <Link href={`/movies/${movie.id}`} key={movie.id}>
              <Card
                key={movie.id}
                className="bg-white rounded-lg overflow-hidden h-full"
                shadow="md"
                isPressable
                isBlurred
                fullWidth
              >
                <CardBody>
                  <Image
                    isZoomed
                    loading="lazy"
                    radius="sm"
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    alt={movie.title}
                  />
                </CardBody>
                <CardHeader className=" flex flex-col p-4">
                  <div
                    className={`flex justify-between items-center w-full lg:${
                      movie.vote_average ? "flex-row" : "flex-col gap-5"
                    } flex-col`}
                  >
                    <h2 className="text-[20px] text-left font-semibold text-black ">
                      {movie.title?.length >= 20
                        ? movie.title.substring(0, 15) + "..."
                        : movie.title}
                    </h2>
                    {movie.vote_average ? (
                      <p className="text-[15px] font-semibold text-black">
                        &#11088; {movie.vote_average.toFixed(1)}
                      </p>
                    ) : (
                      <p className=" bg-yellow-dark px-2 min-w-max py-2 rounded-full text-black font-semibold text-[16px] flex items-center gap-2">
                        <PiWarningCircleBold size={26} />
                        Yet to be released
                      </p>
                    )}
                  </div>
                  {movie.release_date && (
                    <p className="text-[15px] font-semibold  text-black my-4">
                      &#128197;:{" "}
                      {new Date(movie.release_date).toLocaleDateString()}
                    </p>
                  )}
                  {movie.overview ? (
                    <p className="text-black font-medium">
                      {movie.overview.substring(0, 130)}...
                    </p>
                  ) : (
                    <p className="text-black font-medium">
                      No overview available
                    </p>
                  )}
                </CardHeader>
              </Card>
            </Link>
          ))}
      </div>
    </>
  );
};

export default SortedMovieComponent;
