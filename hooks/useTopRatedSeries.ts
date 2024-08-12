import { fetchTopRatedSeries } from "@/lib/api";
import { SeriesShowcase } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useTopRatedSeries = () => {
  return useQuery<SeriesShowcase[], Error>({
    queryKey: ["topRatedSeries"],
    queryFn: fetchTopRatedSeries,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false, // Disable refetch on window focus if not needed
  });
};
