import { fetchUpcomingSeries } from "@/lib/api";
import { PopularMovie, SeriesShowcase } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useUpcomingSeries = () => {
  return useQuery<SeriesShowcase[], Error>({
    queryKey: ["popularSeries"],
    queryFn: fetchUpcomingSeries,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false, // Disable refetch on window focus if not needed
  });
};
