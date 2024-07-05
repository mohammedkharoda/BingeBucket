"use client";

import { Image } from "@nextui-org/react";
import { useUpcomingMovies } from "../hooks/useUpcomingMovie"; // Ensure this path is correct

const ContentGrid = () => {
  const { data: movies, error } = useUpcomingMovies();

  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <div className="flex gap-1">
        <div className="w-full flex flex-col gap-2 lg:gap-5 h-[50%]">
          {movies
            ?.slice(0, 2)
            .map((movie) => (
              <Image
                isBlurred={true}
                isZoomed={true}
                radius="sm"
                key={movie.id}
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title}
                loading="lazy"
                height={200}
                width={400}
              />
            ))}
        </div>
        <div className="w-full flex flex-col gap-2 lg:gap-8">
          {movies
            ?.slice(8, 10)
            .map((movie) => (
              <Image
                isBlurred={true}
                radius="sm"
                isZoomed={true}
                key={movie.id}
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title}
                height={100}
                width={300}
                loading="lazy"
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default ContentGrid;
