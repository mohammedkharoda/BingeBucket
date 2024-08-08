import { fetchRecommandedMovies } from "@/lib/api";
import { MovieDetails } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useRecommandedMovie = (id: number) => {
  return useQuery<MovieDetails, Error>({
    queryKey: ["RecommandedMovies", id], // Pass id to the queryKey for better caching
    queryFn: () => fetchRecommandedMovies(id), // Pass a function reference
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false, // Disable refetch on window focus if not needed
  });
};
