import { useQuery } from "@tanstack/react-query";

import { fetchPopularMovie } from "@/lib/api";
import { PopularMovie } from "@/types";

export const usePopularMovie = () => {
  return useQuery<PopularMovie[], Error>({
    queryKey: ["popularMovies"],
    queryFn: fetchPopularMovie,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false, // Disable refetch on window focus if not needed
  });
};
