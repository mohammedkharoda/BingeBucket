"use client";
import { useOnAirSeries } from "@/hooks/useOnAirToday";
import { useAiringTodaySeries } from "@/hooks/useSeriesShowcase";
import { useTopRatedSeries } from "@/hooks/useTopRatedSeries";
import { useUpcomingSeries } from "@/hooks/useUpcomingSeries";
import Loading from "@/shared/Loading";
import { SeriesShowcase } from "@/types";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import React, { useState } from "react";
import { PiWarningCircleBold } from "react-icons/pi";

const categories = [
  { label: "Airing Today", value: "air_today" },
  { label: "Top Rated", value: "top_rated" },
  { label: "On Air", value: "on_air" },
  { label: "Upcoming", value: "upcoming" },
];
const SortedSeriesComponent: React.FC = () => {
  const [category, setCategory] = useState("air_today");

  // Determine which hook to use based on the selected category
  const useSeries = (category: string) => {
    switch (category) {
      case "top_rated":
        return useTopRatedSeries();
      case "air_today":
        return useAiringTodaySeries();
      case "upcoming":
        return useUpcomingSeries();
      case "on_air":
      default:
        return useOnAirSeries();
    }
  };

  // Call the selected hook
  const { data: series, isLoading, isError, error } = useSeries(category);

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
          Hot Picks Streaming
        </div>
        <img
          src="../image/medal.gif"
          alt="Animated Medal gif"
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
          series everyone is talking about.
        </div>
      </div>
      {isLoading && <Loading />}
      {isError && <p className="text-center text-red-500">{error?.message}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {series &&
          series?.map((series: SeriesShowcase) => (
            <Card
              key={series.id}
              className="bg-white rounded-lg overflow-hidden h-full"
              shadow="md"
              isPressable
              isBlurred
              fullWidth
            >
              <CardBody>
                <img
                  src={`https://image.tmdb.org/t/p/original${series.poster_path}`}
                  alt={series.name}
                />
              </CardBody>
              <CardHeader className=" flex flex-col p-4">
                <div
                  className={`flex justify-between items-center w-full lg:${series.vote_average ? "flex-row" : "flex-col gap-5"} flex-col`}
                >
                  <h2 className="text-[20px] text-left font-semibold text-black ">
                    {series.name?.length >= 20
                      ? series.name.substring(0, 15) + "..."
                      : series.name}
                  </h2>
                  {series.vote_average ? (
                    <p className="text-[15px] font-semibold text-black">
                      &#11088; {series.vote_average.toFixed(1)}
                    </p>
                  ) : (
                    <p className=" bg-yellow-dark px-2 min-w-max py-2 rounded-full text-black font-semibold text-[16px] flex items-center gap-2">
                      <PiWarningCircleBold size={26} />
                      Yet to be released
                    </p>
                  )}
                </div>
                {series.first_air_date && (
                  <p className="text-[15px] font-semibold  text-black my-4">
                    &#128197;:{" "}
                    {new Date(series.first_air_date).toLocaleDateString()}
                  </p>
                )}
                {series.overview ? (
                  <p className="text-black font-medium">
                    {series.overview.substring(0, 130)}...
                  </p>
                ) : (
                  <p className="text-black font-medium">
                    No overview available
                  </p>
                )}
              </CardHeader>
            </Card>
          ))}
      </div>
    </>
  );
};

export default SortedSeriesComponent;
