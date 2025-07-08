import { create } from 'zustand';
import { LEVELS } from '../utils/levels';

interface UserStats {
  earnings: number;
  referrals: number;
  tasksCompleted: number;
}

export interface EarningsEntry {
  date: string; // ISO
  amount: number;
  source: 'task' | 'referral' | 'bonus';
  description?: string;
}

export interface PaymentEntry {
  id: string;
  date: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Failed';
  method?: string;
  reference?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  referral?: string;
  stats: UserStats;
  level: number;
  investment: number;
  tasksCompletedToday: number;
  lastTaskCompletionDate: string; // ISO date string
  createdAt: string; // ISO
  lastLogin: string; // ISO
  passwordLastChanged: string; // ISO
  earningsHistory: EarningsEntry[];
  paymentHistory: PaymentEntry[];
  referralCount: number;
}

interface UserStore {
  profile: UserProfile | null;
  setProfile: (profile: UserProfile) => void;
  updateStats: (stats: Partial<UserStats>) => void;
  upgradeLevel: (level: number) => void;
  completeTask: () => void;
  resetDailyTasks: () => void;
  addEarningsEntry: (entry: EarningsEntry) => void;
  addPaymentEntry: (entry: PaymentEntry) => void;
  updateLastLogin: () => void;
  updatePasswordChanged: () => void;
  incrementReferral: (amount: number) => void;
  tasksRemaining: () => number;
  currentLevelConfig: () => typeof LEVELS[number] | undefined;
}

export const useUserStore = create<UserStore>(
  (set, get) => ({
  profile: null,
    setProfile: (profile: UserProfile) => set({ profile }),
    updateStats: (stats: Partial<UserStats>) => set((state) =>
    state.profile ? { profile: { ...state.profile, stats: { ...state.profile.stats, ...stats } } } : {}
  ),
    upgradeLevel: (level: number) => set((state) => {
      const config = LEVELS.find(l => l.level === level);
      if (!state.profile || !config) return {};
      return {
        profile: {
          ...state.profile,
          level: config.level,
          investment: config.investment,
          tasksCompletedToday: 0,
          lastTaskCompletionDate: new Date().toISOString(),
        }
      };
    }),
    completeTask: () => set((state) => {
      if (!state.profile) return {};
      // Reset daily tasks if new day
      const today = new Date().toISOString().slice(0, 10);
      const last = state.profile.lastTaskCompletionDate?.slice(0, 10);
      let tasksCompletedToday = state.profile.tasksCompletedToday;
      if (last !== today) tasksCompletedToday = 0;
      const config = LEVELS.find(l => l.level === state.profile!.level);
      if (!config || tasksCompletedToday >= config.tasksPerDay) return {};
      // Add earnings entry for task
      const newEarning: EarningsEntry = {
        date: new Date().toISOString(),
        amount: config.payPerTask,
        source: 'task',
        description: 'Completed daily task',
      };
      return {
        profile: {
          ...state.profile,
          tasksCompletedToday: tasksCompletedToday + 1,
          lastTaskCompletionDate: new Date().toISOString(),
          stats: {
            ...state.profile.stats,
            earnings: (state.profile.stats.earnings || 0) + config.payPerTask,
            tasksCompleted: (state.profile.stats.tasksCompleted || 0) + 1,
          },
          earningsHistory: [...(state.profile.earningsHistory || []), newEarning],
        }
      };
    }),
    resetDailyTasks: () => set((state) => {
      if (!state.profile) return {};
      return {
        profile: {
          ...state.profile,
          tasksCompletedToday: 0,
          lastTaskCompletionDate: new Date().toISOString(),
        }
      };
    }),
    addEarningsEntry: (entry: EarningsEntry) => set((state) => {
      if (!state.profile) return {};
      return {
        profile: {
          ...state.profile,
          stats: {
            ...state.profile.stats,
            earnings: (state.profile.stats.earnings || 0) + entry.amount,
            referrals: entry.source === 'referral' ? (state.profile.stats.referrals || 0) + entry.amount : state.profile.stats.referrals,
          },
          earningsHistory: [...(state.profile.earningsHistory || []), entry],
        }
      };
    }),
    addPaymentEntry: (entry: PaymentEntry) => set((state) => {
      if (!state.profile) return {};
      return {
        profile: {
          ...state.profile,
          paymentHistory: [...(state.profile.paymentHistory || []), entry],
        }
      };
    }),
    updateLastLogin: () => set((state) => {
      if (!state.profile) return {};
      return {
        profile: {
          ...state.profile,
          lastLogin: new Date().toISOString(),
        }
      };
    }),
    updatePasswordChanged: () => set((state) => {
      if (!state.profile) return {};
      return {
        profile: {
          ...state.profile,
          passwordLastChanged: new Date().toISOString(),
        }
      };
    }),
    incrementReferral: (amount: number) => set((state) => {
      if (!state.profile) return {};
      const newEarning: EarningsEntry = {
        date: new Date().toISOString(),
        amount,
        source: 'referral',
        description: 'Referral bonus',
      };
      return {
        profile: {
          ...state.profile,
          referralCount: (state.profile.referralCount || 0) + 1,
          stats: {
            ...state.profile.stats,
            earnings: (state.profile.stats.earnings || 0) + amount,
            referrals: (state.profile.stats.referrals || 0) + amount,
          },
          earningsHistory: [...(state.profile.earningsHistory || []), newEarning],
        }
      };
    }),
    tasksRemaining: (): number => {
      const state = get();
      if (!state.profile) return 0;
      const config = LEVELS.find(l => l.level === state.profile!.level);
      if (!config) return 0;
      // Reset if new day
      const today = new Date().toISOString().slice(0, 10);
      const last = state.profile.lastTaskCompletionDate?.slice(0, 10);
      const completed = (last === today) ? state.profile.tasksCompletedToday : 0;
      return config.tasksPerDay - completed;
    },
    currentLevelConfig: () => {
      const state = get();
      if (!state.profile) return undefined;
      return LEVELS.find(l => l.level === state.profile!.level);
    },
  })
); 