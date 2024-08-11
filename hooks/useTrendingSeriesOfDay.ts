import { useQuery } from "@tanstack/react-query";
import { fetchTrendingSeriesOfDay } from "./../lib/api";
import { SeriesOfWeek } from "./../types/index";

export const useTrendingSeriesOfDay = () => {
  return useQuery<SeriesOfWeek[], Error>({
    queryKey: ["trendingSeriesOfDay"],
    queryFn: fetchTrendingSeriesOfDay,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false, // Disable refetch on window focus if not needed
  });
};
