import { useQuery } from "@tanstack/react-query";

import { fetchSeriesCast } from "@/lib/api";
import { Cast } from "@/types";

export const useTopBilledSeriesCast = (id: number) => {
  return useQuery<Cast[], Error>({
    queryKey: ["SeriesCast", id], // Pass id to the queryKey for better caching
    queryFn: () => fetchSeriesCast(id), // Pass a function reference
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false, // Disable refetch on window focus if not needed
  });
};
