import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/lib/types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  _hasHydrated: boolean;
  setAuth: (user: User, token: string) => void;
  setUser: (user: User | null) => void;
  clearUser: () => void;
  setHasHydrated: (v: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      _hasHydrated: false,
      setAuth: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: true,
        }),
      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
        }),
      clearUser: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),
      setHasHydrated: (v) => set({ _hasHydrated: v }),
    }),
    {
      name: 'auth-storage',
      // Exclude the hydration flag from persistence
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        // Called after zustand has finished loading from localStorage
        state?.setHasHydrated(true);
      },
    }
  )
);

export default useAuthStore;