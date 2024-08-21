"use client";
import { PromotionText } from "@/config/data";
import { usePopularMovie } from "@/hooks/usePopularMovie";
import { Image } from "@nextui-org/react";
import React, { useState, useEffect } from "react";

const MoviePromotionBanner = () => {
  const popularMovies = usePopularMovie();
  const [currentTextIndex, setCurrentTextIndex] = useState(1); // Start from index 1 initially

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex(
        (prevIndex) => (prevIndex % PromotionText.length) + 1
      );
    }, 5000); // Change text every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    // MoviePromotionBanner-overall container
    <div className="lg:my-[112px] lg:mx-[64px] my-[64px] mx-[20px]">
      <div className="flex lg:gap-[80px] gap-[50px] flex-col-reverse lg:flex-row justify-around">
        {/* image-container */}
        <Image
          width={450}
          isBlurred={true}
          loading="lazy"
          src={`https://image.tmdb.org/t/p/original/${popularMovies?.data?.[currentTextIndex]?.poster_path}`}
          alt="muzzle-image"
          radius="lg"
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
