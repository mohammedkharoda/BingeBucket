import { useQuery } from "@tanstack/react-query";

import { fetchUpcomingSeries } from "@/lib/api";
import { SeriesShowcase } from "@/types";

export const useUpcomingSeries = () => {
  return useQuery<SeriesShowcase[], Error>({
    queryKey: ["popularSeries"],
    queryFn: fetchUpcomingSeries,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false, // Disable refetch on window focus if not needed
  });
};
