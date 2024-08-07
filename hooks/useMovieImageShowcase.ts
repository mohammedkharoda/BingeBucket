import { fetchMovieImages } from "@/lib/api";
import { ImageDetails } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useMovieImageShowcase = (id: number) => {
  return useQuery<ImageDetails, Error>({
    queryKey: ["MovieImages", id], // Pass id to the queryKey for better caching
    queryFn: () => fetchMovieImages(id), // Pass a function reference
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false, // Disable refetch on window focus if not needed
  });
};
