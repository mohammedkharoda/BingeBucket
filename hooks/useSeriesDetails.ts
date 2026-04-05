import { useQuery } from "@tanstack/react-query";

import { fetchSeriesDetails } from "@/lib/api";
import { SeriesDetails } from "@/types";

export const useSeriesDetails = (id: number) => {
  return useQuery<SeriesDetails, Error>({
    queryKey: ["SeriesDetails", id], // Pass id to the queryKey for better caching
    queryFn: () => fetchSeriesDetails(id), // Pass a function reference
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false, // Disable refetch on window focus if not needed
  });
};
