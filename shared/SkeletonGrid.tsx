"use client";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonGrid = () => {
  return (
    <SkeletonTheme baseColor="#EAE7F8" highlightColor="#F3F1FD">
      <div className="flex gap-3">
        {/* Left column — 2 tall posters */}
        <div className="flex flex-col gap-3">
          <Skeleton height={195} width={195} borderRadius={12} />
          <Skeleton height={195} width={195} borderRadius={12} />
        </div>
        {/* Right column — 3 smaller, offset */}
        <div className="flex flex-col gap-3 mt-10">
          <Skeleton height={120} width={150} borderRadius={12} />
          <Skeleton height={120} width={150} borderRadius={12} />
          <Skeleton height={120} width={150} borderRadius={12} />
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default SkeletonGrid;
