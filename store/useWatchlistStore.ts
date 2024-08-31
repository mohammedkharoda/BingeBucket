import { create } from "zustand";
import { persist } from "zustand/middleware";
import useUserStore from "./userStore";

interface Movie {
  id: number;
  title: string;
  [key: string]: any;
}

interface WatchlistState {
  watchlist: Movie[];
  isAuthenticated: boolean;
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (movieId: number) => void;
  isMovieInWatchlist: (movieId: number) => boolean;
  checkAuthentication: () => void;
  clearWatchlist: () => void;
  loadUserWatchlist: () => void;
  saveUserWatchlist: () => void; // New function to save the user's watchlist
}

export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set, get) => {
      const initialUser = useUserStore.getState().user;
      const initialAuthStatus = Boolean(initialUser);

      return {
        watchlist: [],
        isAuthenticated: initialAuthStatus,

        addToWatchlist: (movie) => {
          const currentWatchlist = get().watchlist;
          if (!currentWatchlist?.find((m) => m.id === movie.id)) {
            const updatedWatchlist = [...currentWatchlist, movie];
            set({ watchlist: updatedWatchlist });
            get().saveUserWatchlist(); // Save the updated watchlist
          }
        },

        removeFromWatchlist: (movieId) => {
          const updatedWatchlist = get().watchlist?.filter(
            (movie) => movie.id !== movieId
          );
          set({ watchlist: updatedWatchlist });
          get().saveUserWatchlist(); // Save the updated watchlist
        },

        isMovieInWatchlist: (movieId) => {
          return !!get().watchlist?.find((movie) => movie.id === movieId);
        },

        checkAuthentication: () => {
          const user = useUserStore.getState().user;
          set({ isAuthenticated: Boolean(user) });
        },

        clearWatchlist: () => {
          set({ isAuthenticated: false });
        },

        loadUserWatchlist: () => {
          // Load the watchlist specific to the logged-in user
          const user = useUserStore.getState().user;
          if (user) {
            const userWatchlist = JSON.parse(
              localStorage.getItem(`watchlist-${user.id}`) ?? "[]"
            );
            set({ watchlist: userWatchlist });
          }
        },

        saveUserWatchlist: () => {
          // Save the watchlist specific to the logged-in user
          const user = useUserStore.getState().user;
          if (user) {
            localStorage.setItem(
              `watchlist-${user.id}`,
              JSON.stringify(get().watchlist)
            );
          }
        },
      };
    },
    {
      name: "watchlist-storage",
      getStorage: () => localStorage,
      onRehydrateStorage: (state) => {
        // Load the specific user's watchlist when rehydrating
        state?.loadUserWatchlist();
      },
    }
  )
);
