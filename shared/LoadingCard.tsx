import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingCard = () => {
  return (
    <SkeletonTheme 
      baseColor="var(--color-surface-2)" 
      highlightColor="var(--color-surface-3)"
      borderRadius={12}
      duration={1.5}
    >
      <div className="flex gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col gap-3">
            <Skeleton height={280} width={200} borderRadius={12} />
            <Skeleton height={16} width={140} borderRadius={6} />
            <Skeleton height={12} width={100} borderRadius={4} />
          </div>
        ))}
      </div>
    </SkeletonTheme>
  );
};

export default LoadingCard;
