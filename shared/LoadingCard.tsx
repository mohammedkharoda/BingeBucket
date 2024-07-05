import React from "react";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const LoadingCard = () => {
  return (
    <SkeletonTheme baseColor="#1c1c1c" highlightColor="#ffd700">
      <div>
        <Skeleton height={800} width={400} />
      </div>
    </SkeletonTheme>
  );
};

export default LoadingCard;
