import { useQuery } from "@tanstack/react-query";

import { fetchRecommendedMovies } from "@/lib/api";
import { MovieDetails } from "@/types";

export const useRecommendedMovie = (id: number) => {
  return useQuery<MovieDetails, Error>({
    queryKey: ["RecommendedMovies", id], // Pass id to the queryKey for better caching
    queryFn: () => fetchRecommendedMovies(id), // Pass a function reference
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false, // Disable refetch on window focus if not needed
  });
};
