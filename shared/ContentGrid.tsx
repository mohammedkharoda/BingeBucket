"use client";

import { Image } from "@nextui-org/react";

import { usePopularMovie } from "@/hooks/usePopularMovie";

const ContentGrid = () => {
  const { data: movies, error } = usePopularMovie();

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="flex gap-1">
        <div className="w-full flex flex-col gap-2 lg:gap-5 h-[50%]">
          {movies
            ?.slice(0, 2)
            .map((movie) => (
              <Image
                key={movie.id}
                alt={movie.title}
                isBlurred={true}
                isZoomed={true}
                loading="lazy"
                radius="sm"
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                width={400}
              />
            ))}
        </div>
        <div className="w-full flex flex-col gap-2 lg:gap-8">
          {movies
            ?.slice(8, 10)
            .map((movie) => (
              <Image
                key={movie.id}
                alt={movie.title}
                isBlurred={true}
                isZoomed={true}
                loading="lazy"
                radius="sm"
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                width={300}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default ContentGrid;
