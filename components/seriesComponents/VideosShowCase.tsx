import React from "react";
import ReactPlayer from "react-player";
import { toast } from "sonner";

import { Video } from "@/types";
import { useSeriesVideoShowcase } from "@/hooks/useSeriesVideoShowcase";

const VideosShowCase = ({ id }: { id: string | string[] }) => {
  const { data, isLoading, error } = useSeriesVideoShowcase(Number(id));
  const videoData: Video[] = (data as unknown as Video[]) ?? [];

  if (isLoading) return <p>Loading videos...</p>;
  if (error) {
    return toast.error("Failed to fetch videos. Please try again later! 😭");
  }
  if (!videoData.length) {
    return (
      <p className="text-[35px] font-bold uppercase bg-crimson-red">
        Sorry No Video Gallery available! 😭
      </p>
    );
  }

  return (
    <div className="bg-yellow-700 py-10 text-center text-white">
      <h2 className="text-4xl font-bold mb-4">Video Showcase</h2>
      <p className="text-lg mb-8">
        Explore the captivating videos of the series.
      </p>
      <div className="container mx-auto max-w-4xl px-4">
        {videoData.length === 1 ? (
          // When there is only one video, center it
          <div className="flex justify-center h-[300px] sm:h-[400px] lg:h-[500px]">
            <ReactPlayer
              controls
              className="rounded-md shadow-lg"
              height="100%"
              url={`https://www.youtube.com/watch?v=${videoData[0].key}`}
              width="100%"
            />
          </div>
        ) : (
          // When there are multiple videos, use the grid layout
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Main Video */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-2 row-span-2 h-[300px] sm:h-[400px] lg:h-[500px]">
              <ReactPlayer
                controls
                className="rounded-md shadow-lg"
                height="100%"
                url={`https://www.youtube.com/watch?v=${videoData[0].key}`}
                width="100%"
              />
            </div>
            {/* Side Videos */}
            {videoData.slice(1, 5).map((video, index) => (
              <div key={index} className="h-[200px] sm:h-[250px] lg:h-[300px]">
                <ReactPlayer
                  controls
                  className="rounded-md shadow-lg"
                  height="100%"
                  url={`https://www.youtube.com/watch?v=${video.key}`}
                  width="100%"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideosShowCase;
