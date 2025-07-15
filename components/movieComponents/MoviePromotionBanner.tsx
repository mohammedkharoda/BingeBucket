"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";

import { PromotionText } from "@/config/data";
import { usePopularMovie } from "@/hooks/usePopularMovie";

const MoviePromotionBanner = () => {
  const popularMovies = usePopularMovie();
  const [currentTextIndex, setCurrentTextIndex] = useState(1); // Start from index 1 initially
  const isFetching = popularMovies.isLoading;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex(
        (prevIndex) => (prevIndex % PromotionText.length) + 1
      );
    }, 5000); // Change text every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="lg:my-[112px] lg:mx-[64px] my-[64px] mx-[20px]">
      <div className="flex lg:gap-[80px] gap-[50px] flex-col-reverse lg:flex-row justify-around">
        {isFetching ? (
          <>
            <Skeleton
              baseColor="#1c1c1c"
              height={675}
              highlightColor="#ffd700"
              width={400}
            />
          </>
        ) : (
          <></>
        )}
        <Image
          alt={`${popularMovies?.data?.[currentTextIndex]?.title}`}
          blurDataURL={`https://image.tmdb.org/t/p/original/${popularMovies?.data?.[currentTextIndex]?.poster_path}`}
          className="rounded-lg"
          height={675}
          loading="lazy"
          placeholder="blur"
          src={`https://image.tmdb.org/t/p/original/${popularMovies?.data?.[currentTextIndex]?.poster_path}`}
          width={450}
        />
        {/* discover, free, top */}
        <div className="min-w-[130px] flex flex-col gap-[40px] relative ">
          <div className="lg:absolute lg:top-0 lg:left-[-20px] lg:h-full lg:flex lg:flex-col lg:justify-between hidden lg:show">
            <div
              className="bg-brown w-[5px] absolute rounded-lg h-[50px] transition-all duration-500 ease-in-out"
              style={{ top: `${(currentTextIndex - 1) * 240}px` }}
            />
          </div>
          <div className="flex flex-col gap-[16px]">
            {PromotionText.map((text, index) => (
              <div key={index}>
                <p className="text-white text-[32px] font-bold leading-normal">
                  {text.title}
                </p>
                <p className="text-white text-[16px] font-normal leading-6 lg:w-[500px]">
                  {text.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePromotionBanner;
