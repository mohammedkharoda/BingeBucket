import useSeasonSeries from "@/store/useSeriesSeason";
import {
  Card,
  CardBody,
  CardHeader,
  CircularProgress,
  Image,
} from "@nextui-org/react";
import React from "react";

const SeriesSeason = () => {
  const seasonSeries = useSeasonSeries((state: any) => state.seasonSeries);
  const [seasonStatus, setSeasonStatus] = React.useState<string>("");

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-[54px]  -bold mb-4"> Seasons &#x1f92f;</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {seasonSeries.length > 0 ? (
          seasonSeries
            .filter(
              (season: any) => !season.name.toLowerCase().includes("special")
            ) // Filter out specials
            .sort((a: any, b: any) => a.season_number - b.season_number) // Sort by season number
            .map((season: any) => {
              return (
                <Card key={season.id} className="shadow-lg overflow-hidden">
                  {season.poster_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/original${season.poster_path}`}
                      alt={`${season.name} poster`}
                      className="w-full h-auto rounded-none"
                    />
                  ) : (
                    <div className="w-full h-auto bg-gray-700 flex items-center justify-center text-white text-lg">
                      Image not available yet
                    </div>
                  )}
                  <CardHeader className="bg-gray-800 text-white">
                    <h3 className="text-lg font-semibold">{season.name}</h3>
                  </CardHeader>
                  <CardBody className="p-4 bg-gray-900 text-white">
                    <p>Episodes: {season.episode_count}</p>
                    <div className="flex items-center justify-center mt-4 gap-4">
                      {season.vote_average > 0 ? (
                        <>
                          <CircularProgress
                            classNames={{
                              svg: "w-[50px] h-[50px] drop-shadow-md",
                              indicator: `${
                                season.vote_average * 10 > 70
                                  ? "stroke-green-pastel"
                                  : season.vote_average * 10 >= 40
                                    ? "stroke-yellow-dark"
                                    : "stroke-crimson-red"
                              }`,
                              value: "text-[14px] font-semibold text-white",
                            }}
                            value={season.vote_average * 10}
                            strokeWidth={2}
                            showValueLabel={true}
                          />
                          <p className="text-center mt-2 text-[20px] font-semibold">
                            Overall rating 🍿
                          </p>
                        </>
                      ) : (
                        <p className="text-center mt-2 text-sm font-semibold">
                          Rating yet not available
                        </p>
                      )}
                    </div>
                  </CardBody>
                </Card>
              );
            })
        ) : (
          <p>No seasons available.</p>
        )}
      </div>
    </div>
  );
};

export default SeriesSeason;
