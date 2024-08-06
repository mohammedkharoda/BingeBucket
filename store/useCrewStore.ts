import { create } from "zustand";

interface CrewMember {
  id: number;
  name: string;
  job: string;
}

interface CrewState {
  crew: CrewMember[];
  setCrew: (crew: CrewMember[]) => void;
}

const useCrewStore = create<CrewState>((set) => ({
  crew: [],
  setCrew: (crew) => set({ crew }),
}));

export default useCrewStore;
