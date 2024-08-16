import { useSeriesVideoShowcase } from "@/hooks/useSeriesVideoShowcase";
import { Video } from "@/types";
import React from "react";
import ReactPlayer from "react-player";

const VideosShowCase = ({ id }: { id: string | string[] }) => {
  const { data, isLoading, error } = useSeriesVideoShowcase(Number(id));
  const videoData: Video[] = (data as unknown as Video[]) ?? [];

  if (isLoading) return <p>Loading videos...</p>;
  if (error) return <p>Error loading videos: {error.message}</p>;

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
      <div className="container mx-auto max-w-4xl">
        {videoData.length === 1 ? (
          // When there is only one video, center it
          <div className="flex justify-center h-[500px]">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${videoData[0].key}`}
              controls
              width="100%"
              height="100%"
              className="rounded-md shadow-lg"
            />
          </div>
        ) : (
          // When there are multiple videos, use the grid layout
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Main Video */}
            <div className="col-span-2 row-span-2">
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${videoData[0].key}`}
                controls
                width="100%"
                height="100%"
                className="rounded-md shadow-lg"
              />
            </div>
            {/* Side Videos */}
            {videoData.slice(1, 6).map((video, index) => (
              <div key={index} className="col-span-1">
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${video.key}`}
                  width="100%"
                  height="100%"
                  className="rounded-md shadow-lg"
                  controls
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
