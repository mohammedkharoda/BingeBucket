import { create } from "zustand";

interface SeriesSeasonState {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
  status: string;
}

const useSeasonSeries = create((set) => ({
  seasonSeries: [],
  setSeasonSeries: (seasonSeries: SeriesSeasonState[]) => set({ seasonSeries }),
}));

export default useSeasonSeries;
