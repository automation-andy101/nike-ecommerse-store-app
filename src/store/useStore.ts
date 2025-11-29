import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

interface AppState {
  user: User | null;
  isLoading: boolean;
  theme: "light" | "dark";
  setUser: (user: User | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setTheme: (theme: "light" | "dark") => void;
  toggleTheme: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      theme: "light",
      setUser: (user) => set({ user }),
      setIsLoading: (isLoading) => set({ isLoading }),
      setTheme: (theme) => set({ theme }),
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
    }),
    {
      name: "app-storage",
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);
