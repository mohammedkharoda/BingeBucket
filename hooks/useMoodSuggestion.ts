import { useQuery } from "@tanstack/react-query";
import { fetchMoodSuggestion } from "@/lib/api";

export const useMoodSuggestion = (mood: string) => {
  return useQuery<any, Error>({
    queryKey: ["MoodSuggestion", mood],
    queryFn: () => fetchMoodSuggestion(mood),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};
