import React from "react";
import ReactPlayer from "react-player";

import { Video } from "@/types";
import { useSeriesVideoShowcase } from "@/hooks/useSeriesVideoShowcase";

const VideosShowCase = ({ id }: { id: string | string[] }) => {
  const { data, isLoading, error } = useSeriesVideoShowcase(Number(id));
  const videoData: Video[] = (data as unknown as Video[]) ?? [];

  if (isLoading) {
    return (
      <section className="max-w-site mx-auto px-6 lg:px-16 py-10">
        <p className="text-muted text-sm">Loading videos...</p>
      </section>
    );
  }
  if (error) {
    return (
      <section className="max-w-site mx-auto px-6 lg:px-16 py-10">
        <p className="text-red text-sm font-semibold">
          Failed to fetch videos. Please try again later.
        </p>
      </section>
    );
  }
  if (!videoData.length) {
    return (
      <section className="max-w-site mx-auto px-6 lg:px-16 py-10">
        <div className="rounded-2xl border border-surface-4 bg-surface p-5 text-center">
          <p className="text-lg font-bold uppercase text-off-white">
            No video gallery available
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-site mx-auto px-6 lg:px-16 py-10">
      <div
        className="rounded-3xl border border-surface-4 px-5 py-6 text-center md:px-8"
        style={{
          background: "var(--tw-glass-bg)",
          borderColor: "var(--tw-glass-border)",
          backdropFilter: "blur(14px) saturate(130%)",
          boxShadow: "var(--shadow-card)",
        }}
      >
        <h2 className="mb-3 text-3xl font-extrabold text-off-white md:text-4xl">
          Video Showcase
        </h2>
        <p className="mb-8 text-sm md:text-base text-muted">
          Explore the captivating videos of the series.
        </p>
        <div className="mx-auto max-w-5xl px-1">
          {videoData.length === 1 ? (
            <div className="flex h-[260px] justify-center sm:h-[380px] lg:h-[480px]">
              <ReactPlayer
                controls
                className="rounded-xl shadow-card"
                height="100%"
                url={`https://www.youtube.com/watch?v=${videoData[0].key}`}
                width="100%"
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="col-span-1 row-span-2 h-[280px] sm:col-span-2 sm:h-[380px] lg:col-span-2 lg:h-[480px]">
                <ReactPlayer
                  controls
                  className="rounded-xl shadow-card"
                  height="100%"
                  url={`https://www.youtube.com/watch?v=${videoData[0].key}`}
                  width="100%"
                />
              </div>
              {videoData.slice(1, 5).map((video, index) => (
                <div
                  key={`${video.key}-${index}`}
                  className="h-[190px] sm:h-[230px] lg:h-[240px]"
                >
                  <ReactPlayer
                    controls
                    className="rounded-xl shadow-card"
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
    </section>
  );
};

export default VideosShowCase;
