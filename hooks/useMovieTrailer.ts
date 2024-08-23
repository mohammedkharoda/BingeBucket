import { fetchMoviesTrailer } from "@/lib/api";
import { MovieTrailer } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useMovieTrailer = (id: number) => {
  return useQuery<MovieTrailer, Error>({
    queryKey: ["MovieTrailer", id], // Pass id to the queryKey for better caching
    queryFn: () => fetchMoviesTrailer(id), // Pass a function reference
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false, // Disable refetch on window focus if not needed
  });
};
