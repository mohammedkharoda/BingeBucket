import { useQuery } from "@tanstack/react-query";

import { fetchTrendingOfDay } from "./../lib/api";
import { TrendingMovie } from "./../types/index";

export const useTrendingOfDay = () => {
  return useQuery<TrendingMovie[]>({
    queryKey: ["trendingOfDay"],
    queryFn: fetchTrendingOfDay,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false, // Disable refetch on window focus if not needed
  });
};
