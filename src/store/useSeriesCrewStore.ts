import { create } from "zustand";

interface CreatedBy {
  id: number;
  credit_id: string;
  name: string;
  original_name: string;
  gender: number;
  profile_path: string | null;
}

interface Network {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}
interface SeriesCrewState {
  createdBy: CreatedBy[];
  networks: Network[];
  productionCompanies: ProductionCompany[];
  setProductionCompanies: (productionCompanies: ProductionCompany[]) => void;
  setCreatedBy: (createdBy: CreatedBy[]) => void;
  setNetworks: (networks: Network[]) => void;
}

const useSeriesCrewStore = create<SeriesCrewState>((set) => ({
  createdBy: [],
  networks: [],
  productionCompanies: [],
  setProductionCompanies: (productionCompanies) => set({ productionCompanies }),
  setCreatedBy: (createdBy) => set({ createdBy }),
  setNetworks: (networks) => set({ networks }),
}));

export default useSeriesCrewStore;
