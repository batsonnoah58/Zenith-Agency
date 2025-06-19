import { create } from 'zustand';

interface UserStats {
  earnings: number;
  referrals: number;
  tasksCompleted: number;
}

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  referral?: string;
  stats: UserStats;
}

interface UserStore {
  profile: UserProfile | null;
  setProfile: (profile: UserProfile) => void;
  updateStats: (stats: Partial<UserStats>) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
  updateStats: (stats) => set((state) =>
    state.profile ? { profile: { ...state.profile, stats: { ...state.profile.stats, ...stats } } } : {}
  ),
})); 