import { Movie } from "./../types/index";
import { useQuery } from "@tanstack/react-query";
import { fetchUpcomingMovies } from "../lib/api";

export const useUpcomingMovies = () => {
  return useQuery<Movie[], Error>({
    queryKey: ["upcomingMovies"],
    queryFn: fetchUpcomingMovies,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false, // Disable refetch on window focus if not needed
  });
};
