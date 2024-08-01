import { fetchNowPlayingMovies } from "@/lib/api";
import { PopularMovie } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useNowPlayingMovies = () => {
  return useQuery<PopularMovie[], Error>({
    queryKey: ["NowPlayingMovies"],
    queryFn: fetchNowPlayingMovies,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false, // Disable refetch on window focus if not needed
  });
};
