import { fetchMultiSearch } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useMultiSearch = (query: string) => {
  return useQuery({
    queryKey: ["multiSearch", query],
    queryFn: () => fetchMultiSearch(query),
    enabled: query.length > 0, // Disable query if input is empty
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};
