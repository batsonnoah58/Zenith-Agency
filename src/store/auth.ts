import { create } from 'zustand';
import { useUserStore } from './user';

interface User {
  id: string;
  name: string;
  phone: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  login: (phone: string, password: string) => Promise<void>;
  signup: (name: string, phone: string, password: string) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null,
  initialized: false,

  initializeAuth: async () => {
    const token = localStorage.getItem('token');
    if (token && !get().initialized) {
      await get().fetchUser();
    }
    set({ initialized: true });
  },

  // Hardcoded demo users (now using phone numbers)
  login: async (phone: string, password: string) => {
    set({ loading: true, error: null });
    const demoUsers = [
      { id: '1', name: 'Demo User', phone: '+254700000000', password: 'demo123' },
      { id: '2', name: 'Admin User', phone: '+254700000001', password: 'admin123' },
      { id: '3', name: 'Test User', phone: '+254700000002', password: 'test123' },
    ];
    try {
      await new Promise((res) => setTimeout(res, 800));
      const found = demoUsers.find(u => u.phone === phone && u.password === password);
      if (found) {
        const token = `mock-jwt-token-${found.phone}`;
        localStorage.setItem('token', token);
        set({ token, user: { id: found.id, name: found.name, phone: found.phone }, loading: false });
        // Set user profile for Account page
        useUserStore.getState().setProfile({
          name: found.name,
          email: found.phone + '@demo.com',
          phone: found.phone,
          stats: { earnings: 0, referrals: 0, tasksCompleted: 0 },
          level: 1,
          investment: 0,
          tasksCompletedToday: 0,
          lastTaskCompletionDate: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          passwordLastChanged: new Date().toISOString(),
          earningsHistory: [],
          paymentHistory: [],
          referralCount: 0,
        });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  signup: async (name: string, phone: string, password: string) => {
    set({ loading: true, error: null });
    const demoUsers = [
      { id: '1', name: 'Demo User', phone: '+254700000000', password: 'demo123' },
      { id: '2', name: 'Admin User', phone: '+254700000001', password: 'admin123' },
      { id: '3', name: 'Test User', phone: '+254700000002', password: 'test123' },
    ];
    try {
      await new Promise((res) => setTimeout(res, 800));
      const found = demoUsers.find(u => u.phone === phone);
      if (found) {
        if (password === found.password && name === found.name) {
          const token = `mock-jwt-token-${found.phone}`;
          localStorage.setItem('token', token);
          set({ token, user: { id: found.id, name: found.name, phone: found.phone }, loading: false });
          // Set user profile for Account page
          useUserStore.getState().setProfile({
            name: found.name,
            email: found.phone + '@demo.com',
            phone: found.phone,
            stats: { earnings: 0, referrals: 0, tasksCompleted: 0 },
            level: 1,
            investment: 0,
            tasksCompletedToday: 0,
            lastTaskCompletionDate: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            passwordLastChanged: new Date().toISOString(),
            earningsHistory: [],
            paymentHistory: [],
            referralCount: 0,
          });
        } else {
          throw new Error('To demo signup, use the correct name and password for this demo user.');
        }
      } else {
        throw new Error('Signup is only available for demo users. Use one of the provided demo accounts.');
      }
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
    useUserStore.getState().setProfile(null);
  },

  fetchUser: async () => {
    set({ loading: true, error: null });
    const demoUsers = [
      { id: '1', name: 'Demo User', phone: '+254700000000', password: 'demo123' },
      { id: '2', name: 'Admin User', phone: '+254700000001', password: 'admin123' },
      { id: '3', name: 'Test User', phone: '+254700000002', password: 'test123' },
    ];
    try {
      await new Promise((res) => setTimeout(res, 500));
      const token = localStorage.getItem('token');
      if (token) {
        const phone = token.replace('mock-jwt-token-', '');
        const found = demoUsers.find(u => u.phone === phone);
        if (found) {
          set({ user: { id: found.id, name: found.name, phone: found.phone }, loading: false });
          // Set user profile for Account page
          useUserStore.getState().setProfile({
            name: found.name,
            email: found.phone + '@demo.com',
            phone: found.phone,
            stats: { earnings: 0, referrals: 0, tasksCompleted: 0 },
            level: 1,
            investment: 0,
            tasksCompletedToday: 0,
            lastTaskCompletionDate: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            passwordLastChanged: new Date().toISOString(),
            earningsHistory: [],
            paymentHistory: [],
            referralCount: 0,
          });
        } else {
          set({ user: null, loading: false });
          useUserStore.getState().setProfile(null);
        }
      } else {
        set({ user: null, loading: false });
        useUserStore.getState().setProfile(null);
      }
    } catch (err: any) {
      set({ error: err.message, loading: false });
      useUserStore.getState().setProfile(null);
    }
  },
})); 