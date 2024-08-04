import { fetchMovieDetails } from "@/lib/api";
import { MovieDetails } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useMovieDetails = (id: number) => {
  return useQuery<MovieDetails, Error>({
    queryKey: ["MovieDetails", id], // Pass id to the queryKey for better caching
    queryFn: () => fetchMovieDetails(id), // Pass a function reference
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false, // Disable refetch on window focus if not needed
  });
};
