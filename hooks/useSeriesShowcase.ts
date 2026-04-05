import { useQuery } from "@tanstack/react-query";

import { fetchSeriesShowcase } from "@/lib/api";
import { SeriesShowcase } from "@/types";

export const useAiringTodaySeries = () => {
  return useQuery<SeriesShowcase[], Error>({
    queryKey: ["AiringTodaySeries"],
    queryFn: fetchSeriesShowcase,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false, // Disable refetch on window focus if not needed
  });
};
