"use client";
import { usePopularMovie } from "@/hooks/usePopularMovie";
import { Image } from "@nextui-org/react";
import { useEffect, useState } from "react";
export default function MovieShowcase() {
  const popularMovies = usePopularMovie();
  const [rotatingIndex, setRotatingIndex] = useState(0);

  useEffect(() => {
    // Check if there are any movies to rotate through
    if (!popularMovies?.data?.length) {
      return;
    }

    const interval = setInterval(() => {
      setRotatingIndex((prevIndex) => {
        // If the current index reaches the last movie, start from 1
        if (prevIndex === popularMovies.data.length - 1) {
          return 1;
        } else {
          return prevIndex + 1;
        }
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [popularMovies]);

  return (
    <div className="flex justify-center items-center gap-20 flex-col lg:flex-row px-[20px] py-[64px] lg:px-0 lg:py-0">
      {/* // heading and image */}
      <div className="md:w-[60%] flex flex-col items-center justify-center lg:px-[112px] lg:py-[64px] px-[20px] py-[64px]">
        <p className="flex items-center justify-center font-roboto text-[36px] text-center md:text-[56px] font-bold lg:min-w-max">
          Discover Amazing Movies
          <img
            src="../image/movie-clap.gif"
            alt="movie-clap"
            className="h-[100px] hidden lg:block"
          />
        </p>
        <p className="mt-2 text-lg md:text-xl text-gray-600 w-full">
          Explore a vast collection of critically{" "}
          <span className="font-extrabold underline underline-offset-4 text-black">
            acclaimed movies &#x1F3C6;
          </span>
          ,
          <span className="font-extrabold underline underline-offset-4 text-black">
            blockbusters &#x1F4F7;
          </span>
          , and{" "}
          <span className="font-extrabold underline underline-offset-4 text-black">
            hidden gems &#x1F48E;
          </span>
          . Whether you're into{" "}
          <b className="text-black underline">
            action-packed thrillers &#x1F4A5;, heartfelt dramas &#x1F622;, or
            captivating documentaries &#x1F4F9;
          </b>
          , we've got something for everyone. Get ready to dive into a world of
          cinema and enjoy the best films from around the globe!
        </p>
      </div>
      {/* Image side */}
      <div>
        <Image
          width={450}
          loading="lazy"
          src={`https://image.tmdb.org/t/p/original/${popularMovies?.data?.[rotatingIndex]?.poster_path}`}
          alt="muzzle-image"
          radius="lg"
        />
      </div>
    </div>
  );
}
