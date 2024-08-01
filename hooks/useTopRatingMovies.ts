import { fetchTopRatedMovies } from "@/lib/api";
import { PopularMovie, TopRating } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useTopRatedMovies = () => {
  return useQuery<TopRating[], Error>({
    queryKey: ["topRatedMovies"],
    queryFn: fetchTopRatedMovies,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false, // Disable refetch on window focus if not needed
  });
};
