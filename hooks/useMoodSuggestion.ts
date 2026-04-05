import { useQuery } from "@tanstack/react-query";

import { fetchAiMoodSuggestion } from "@/lib/api";

export const useMoodSuggestion = (
  mood: string,
  preferences: string,
  contentType: "both" | "movie" | "tv"
) => {
  return useQuery<any, Error>({
    queryKey: ["MoodSuggestionAI", mood, preferences, contentType],
    queryFn: () =>
      fetchAiMoodSuggestion({
        mood,
        preferences,
        contentType,
      }),
    enabled: false,
    retry: 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};
