import { fetchMovieDetails, fetchSeriesDetails } from "@/lib/api";
import { MovieDetails, SeriesDetails } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useSeriesDetails = (id: number) => {
  return useQuery<SeriesDetails, Error>({
    queryKey: ["SeriesDetails", id], // Pass id to the queryKey for better caching
    queryFn: () => fetchSeriesDetails(id), // Pass a function reference
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false, // Disable refetch on window focus if not needed
  });
};
