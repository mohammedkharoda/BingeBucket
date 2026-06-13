"use client";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonGrid = () => {
  return (
    <SkeletonTheme baseColor="#1A1A24" highlightColor="#23232F">
      <div className="flex gap-3">
        {/* Left column — 2 tall posters */}
        <div className="flex flex-col gap-3">
          <Skeleton borderRadius={12} height={195} width={195} />
          <Skeleton borderRadius={12} height={195} width={195} />
        </div>
        {/* Right column — 3 smaller, offset */}
        <div className="flex flex-col gap-3 mt-10">
          <Skeleton borderRadius={12} height={120} width={150} />
          <Skeleton borderRadius={12} height={120} width={150} />
          <Skeleton borderRadius={12} height={120} width={150} />
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default SkeletonGrid;
