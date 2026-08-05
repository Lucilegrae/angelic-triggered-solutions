import { create } from 'zustand';

type Role = 'community' | 'miner' | 'bank' | 'investor' | 'government' | 'admin';

interface AuthState {
  user: any | null;
  role: Role | null;
  setUser: (user: any, role: Role | null) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: null,
  setUser: (user, role) => set({ user, role }),
  clear: () => set({ user: null, role: null }),
}));
