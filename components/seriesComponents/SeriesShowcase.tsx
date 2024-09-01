"use client";

import { Image } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

import { useAiringTodaySeries } from "@/hooks/useSeriesShowcase";

const SeriesShowcase = () => {
  const seriesData = useAiringTodaySeries();
  const [rotatingIndex, setRotatingIndex] = useState(0);

  useEffect(() => {
    // Check if there are any movies to rotate through
    if (!seriesData?.data?.length) {
      return;
    }

    const interval = setInterval(() => {
      setRotatingIndex((prevIndex) => {
        // If the current index reaches the last movie, start from 1
        if (prevIndex === seriesData.data.length - 1) {
          return 1;
        } else {
          return prevIndex + 1;
        }
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [seriesData]);

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Image side */}
      <div className="flex-shrink-0">
        <Image
          alt="muzzle-image"
          className="object-cover"
          height="auto"
          loading="lazy"
          radius="lg"
          src={`https://image.tmdb.org/t/p/original/${seriesData?.data?.[rotatingIndex]?.poster_path}`}
          width={450}
        />
      </div>
      {/* Text side */}
      <div className="flex flex-col justify-center lg:px-[112px] lg:py-[64px] px-[20px] py-[64px]">
        <p className="flex gap-8 text-[36px] text-left md:text-[56px] font-bold lg:text-[45px] items-center">
          Discover Captivating Series
          <img
            alt="tv"
            className="hidden h-[100px] lg:block"
            src="../image/tv.gif"
          />
        </p>
        <p className="mt-2 text-left text-lg md:text-xl text-gray-600 w-full">
          Explore a diverse range of{" "}
          <span className="font-extrabold underline underline-offset-4 text-black">
            critically acclaimed series &#x1F3C6;
          </span>
          ,{" "}
          <span className="font-extrabold underline underline-offset-4 text-black">
            binge-worthy dramas &#x1F622;
          </span>
          , and{" "}
          <span className="font-extrabold underline underline-offset-4 text-black">
            must-watch thrillers &#x1F4A5;
          </span>
          . Whether you&apos;re into{" "}
          <b className="text-black underline">
            gripping mysteries &#x1F52A;, inspiring documentaries &#x1F4F9;, or
            epic adventures &#x1F680;
          </b>
          , we’ve got something that will keep you hooked. Get ready to embark
          on an unforgettable journey through the world of series and experience
          the best storytelling from around the globe!
        </p>
      </div>
    </div>
  );
};

export default SeriesShowcase;
