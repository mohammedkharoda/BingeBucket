import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CircularProgress,
  Image,
} from "@nextui-org/react";
import { PiWarningCircleBold } from "react-icons/pi";

import { useSeasonDetails } from "@/hooks/useSeasonDetails";

interface SeasonDetailCardProps {
  id: string | string[];
  seasonId: string | string[];
}

const SeasonDetailCard = ({ id, seasonId }: SeasonDetailCardProps) => {
  const {
    data: seasonDetails,
    isLoading,
    error,
  } = useSeasonDetails(Number(id), Number(seasonId));

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!seasonDetails || seasonDetails.episodes.length === 0)
    return <p>No episodes available.</p>;

  return (
    <div className="w-full my-4 lg:px-[64px] px-[45px]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {seasonDetails.episodes.map((episode) => (
          <Card
            key={episode.id}
            className="overflow-hidden rounded-none"
            shadow="lg"
          >
            {episode.still_path && (
              <CardHeader className="p-0 rounded-none">
                <Image
                  isZoomed
                  alt={`${episode.name} still`}
                  className="rounded-none"
                  loading="lazy"
                  radius="none"
                  src={`https://image.tmdb.org/t/p/original${episode.still_path}`}
                  width="100%"
                />
              </CardHeader>
            )}
            <CardBody className="flex flex-col gap-4">
              <h4 className="text-lg font-semibold mb-2">
                Episode {episode.episode_number}: {episode.name}
              </h4>
              <p className="text-[16px] font-medium">
                <p className="text-[17px] font-light">
                  {episode.overview || "No overview available."}
                </p>
              </p>
              <p className="text-[16px] font-medium">
                <strong>Runtime &#128347;:</strong> {episode.runtime || "N/A"}{" "}
                mins
              </p>
              <div className="flex items-center gap-4">
                <p className="font-bold text-[16px] ">Rating: </p>
                {episode.vote_average === 0 || !episode.vote_average ? (
                  <p className=" bg-crimson-red px-2 min-w-max py-2 rounded-full text-black font-semibold text-[16px] flex items-center gap-2">
                    <PiWarningCircleBold size={26} />
                    Rating Not Available
                  </p>
                ) : (
                  <CircularProgress
                    classNames={{
                      svg: "w-[50px] h-[50px] drop-shadow-md",
                      indicator: `${episode.vote_average * 10 > 70 ? "stroke-green-pastel" : episode.vote_average * 10 >= 40 ? "stroke-yellow-dark" : "stroke-crimson-red"}`,
                      value: "text-[14px] font-semibold text-white",
                    }}
                    showValueLabel={true}
                    strokeWidth={2}
                    value={episode.vote_average * 10}
                  />
                )}
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SeasonDetailCard;
