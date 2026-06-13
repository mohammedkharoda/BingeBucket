import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingCard = () => {
  return (
    <SkeletonTheme
      baseColor="var(--surface-2)"
      borderRadius={12}
      duration={1.5}
      highlightColor="var(--surface-3)"
    >
      <div className="flex gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col gap-3">
            <Skeleton borderRadius={12} height={280} width={200} />
            <Skeleton borderRadius={6} height={16} width={140} />
            <Skeleton borderRadius={4} height={12} width={100} />
          </div>
        ))}
      </div>
    </SkeletonTheme>
  );
};

export default LoadingCard;
