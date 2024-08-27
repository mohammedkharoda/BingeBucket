import { create } from "zustand";

interface UserState {
  user: {
    username?: string;
    picture?: string;
    given_name?: string;
  } | null;
  setUser: (user: {
    username?: string;
    picture?: string;
    given_name?: string;
  }) => void;
  clearUser: () => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));

export default useUserStore;
