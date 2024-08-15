import { fetchSeriesVideos } from "@/lib/api";
import { SeriesVideo } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useSeriesVideoShowcase = (id: number) => {
  return useQuery<SeriesVideo, Error>({
    queryKey: ["SeriesShowcase", id], // Pass id to the queryKey for better caching
    queryFn: () => fetchSeriesVideos(id), // Pass a function reference
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false, // Disable refetch on window focus if not needed
  });
};
