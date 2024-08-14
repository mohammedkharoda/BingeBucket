import { create } from "zustand";

interface CreatedBy {
  id: number;
  credit_id: string;
  name: string;
  original_name: string;
  gender: number;
  profile_path: string | null;
}

interface SeriesCrewState {
  createdBy: CreatedBy[];
  setCreatedBy: (createdBy: CreatedBy[]) => void;
}

const useSeriesCrewStore = create<SeriesCrewState>((set) => ({
  createdBy: [],
  setCreatedBy: (createdBy) => set({ createdBy }),
}));

export default useSeriesCrewStore;
