import { useQuery } from "@tanstack/react-query";
import { fetchSeasonDetails } from "@/lib/api";

// Define the shape of a single episode
interface Episode {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
  epsiode_type: string;
  vote_average: number;
}

// Define the shape of the season details data based on your API response
interface SeasonDetails {
  _id: string;
  air_date: string;
  episodes: Episode[]; // Array of episodes
  name: string;
  overview: string;
  id: number;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

// Hook to fetch season details
export const useSeasonDetails = (id: number, seasonNumber: number) => {
  return useQuery<SeasonDetails, Error>({
    queryKey: ["SeasonDetails", id, seasonNumber], // Unique query key
    queryFn: () => fetchSeasonDetails(id, seasonNumber), // Function to fetch season details
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false, // Disable refetch on window focus if not needed
  });
};
