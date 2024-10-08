"use client";
import "@splidejs/splide/dist/css/splide.min.css";
import Image from "next/image";
import Link from "next/link";
import { Splide, SplideSlide } from "@splidejs/react-splide";

import { truncateSentence } from "@/config/turncate";
import LoadingCard from "@/shared/LoadingCard";
import { useNowPlayingMovies } from "@/hooks/useNowPlayingMovies";

const MediaCard = () => {
  const splideOptions = {
    type: "loop",
    autoplay: false,
    perPage: 3,
    perMove: 3,
    pagination: false,
    arrows: false,
    gap: "9rem",
    drag: true,
    lazyLoad: "nearby",
    slideFocus: "center",
    breakpoints: {
      1024: {
        perPage: 2,
        perMove: 2,
        gap: "5rem",
      },
      768: {
        perPage: 1,
        perMove: 1,
        gap: "3rem",
      },
    },
  };
  const { data } = useNowPlayingMovies();
  const movieData = data;

  return (
    <div className="lg:my-[112px] lg:mx-[64px] my-[64px] mx-[20px]">
      {/* box-1 */}
      <div className="flex flex-col gap-6 mb-5">
        <p className="text-white text-[16px] font-semibold leading-5">
          Discover some amazing
        </p>
        <p className="text-white text-[48px] font-bold leading-4">
          Entertainment
        </p>
        <p className="text-[18px] font-normal text-white">
          Explore our collection of movies and series.
        </p>
      </div>
      {/* box-2 */}
      {/*  @ts-ignore */}
      {!movieData ? (
        <LoadingCard />
      ) : (
        // @ts-ignore
        <Splide options={splideOptions}>
          {movieData &&
            movieData?.length > 0 &&
            movieData.map((movie: any) => (
              <SplideSlide key={movie.id}>
                <Link key={movie.id} href={`/movies/${movie.id}`}>
                  <div className="rounded-md">
                    <Image
                      alt={movie.title}
                      blurDataURL={`https://image.tmdb.org/t/p/original/${
                        movie?.poster_path
                      }`}
                      className="rounded-lg drop-shadow-md transition-all duration-500 ease-in-out hover:scale-105"
                      height={500}
                      loading="lazy"
                      placeholder="blur"
                      src={`https://image.tmdb.org/t/p/original/${
                        movie?.poster_path
                      }`}
                      width={500}
                    />
                  </div>
                  <div className="flex flex-col gap-4 pt-4">
                    <p className="lg:text-[18px] text-[20px] font-semibold">
                      {movie.title || movie.name}
                    </p>
                    <p className="lg:text-[16px] font-medium text-[18px]">
                      {truncateSentence(movie.overview, 150)}
                    </p>
                  </div>
                </Link>
              </SplideSlide>
            ))}
        </Splide>
      )}
    </div>
  );
};

export default MediaCard;
