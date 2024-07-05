"use client";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonGrid = () => {
  return (
    <div className="flex gap-1">
      <div className="w-full flex flex-col gap-2 lg:gap-5 h-[50%]">
        <SkeletonTheme baseColor="#1c1c1c" highlightColor="#ffd700">
          <Skeleton height={200} width={400} />
          <Skeleton height={200} width={400} />
        </SkeletonTheme>
      </div>
      <div className="w-full flex flex-col gap-2 lg:gap-8">
        <SkeletonTheme baseColor="#1c1c1c" highlightColor="#ffd700">
          <Skeleton height={100} width={300} />
          <Skeleton height={100} width={300} />
        </SkeletonTheme>
      </div>
    </div>
  );
};

export default SkeletonGrid;
