"use client";

import { Card } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { PiWarningCircleBold } from "react-icons/pi";

import { SeriesOfWeek } from "@/types";
import Loading from "@/shared/Loading";
import { useTrendingSeriesOfDay } from "@/hooks/useTrendingSeriesOfDay";

const TrendingSeriesBanner = () => {
  const { data: series, isLoading, isError, error } = useTrendingSeriesOfDay();

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
          Top Series of the Week
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
      {isLoading && <Loading />}
      {isError && <p className="text-center text-red-500">{error?.message}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {series &&
          series.map((series: SeriesOfWeek) => (
            <Link key={series.id} href={`/series/${series.id}`}>
              <Card
                key={series.id}
                isBlurred
                isPressable
                className="bg-white rounded-lg overflow-hidden p-3 h-full"
                shadow="md"
              >
                <img
                  alt={series.name}
                  className=" w-full h-fit rounded-lg shadow-lg"
                  src={`https://image.tmdb.org/t/p/original${series.poster_path}`}
                />
                <div className="flex flex-col p-4 gap-5">
                  <div
                    className={`flex justify-around items-center w-full ${series.vote_average ? "lg:flex-row" : "lg:flex-col gap-5"} flex-col`}
                  >
                    <h2 className="text-[20px] text-left font-semibold text-black">
                      {series.name?.length >= 40
                        ? series.name.substring(0, 35) + "..."
                        : series.name}
                    </h2>
                    {series.vote_average ? (
                      <p className="text-[15px] font-semibold text-black">
                        &#11088; {series.vote_average.toFixed(1)}
                      </p>
                    ) : (
                      <p className="bg-yellow-dark px-2 min-w-max py-2 rounded-full text-black font-semibold text-[16px] flex items-center gap-2">
                        <PiWarningCircleBold size={26} />
                        Yet to be released
                      </p>
                    )}
                  </div>
                  {series.overview ? (
                    <p className="text-black font-medium">{series.overview}</p>
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

export default TrendingSeriesBanner;
