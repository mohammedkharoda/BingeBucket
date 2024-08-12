import { fetchOnAirTodaySeries } from "@/lib/api";
import { SeriesShowcase } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useOnAirSeries = () => {
  return useQuery<SeriesShowcase[], Error>({
    queryKey: ["onAirTodaySeries"],
    queryFn: fetchOnAirTodaySeries,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false, // Disable refetch on window focus if not needed
  });
};
