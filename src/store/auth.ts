import { create } from 'zustand';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set: (partial: Partial<AuthState>) => void) => ({
  user: null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null,

  // Hardcoded demo users
  login: async (email: string, password: string) => {
    set({ loading: true, error: null });
    const demoUsers = [
      { id: '1', name: 'Demo User', email: 'demo@zenith.com', password: 'demo123' },
      { id: '2', name: 'Admin User', email: 'admin@zenith.com', password: 'admin123' },
      { id: '3', name: 'Test User', email: 'test@zenith.com', password: 'test123' },
    ];
    try {
      await new Promise((res) => setTimeout(res, 800));
      const found = demoUsers.find(u => u.email === email && u.password === password);
      if (found) {
        const token = `mock-jwt-token-${found.email}`;
        localStorage.setItem('token', token);
        set({ token, user: { id: found.id, name: found.name, email: found.email }, loading: false });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  signup: async (name: string, email: string, password: string) => {
    set({ loading: true, error: null });
    const demoUsers = [
      { id: '1', name: 'Demo User', email: 'demo@zenith.com', password: 'demo123' },
      { id: '2', name: 'Admin User', email: 'admin@zenith.com', password: 'admin123' },
      { id: '3', name: 'Test User', email: 'test@zenith.com', password: 'test123' },
    ];
    try {
      await new Promise((res) => setTimeout(res, 800));
      const found = demoUsers.find(u => u.email === email);
      if (found) {
        if (password === found.password && name === found.name) {
          const token = `mock-jwt-token-${found.email}`;
          localStorage.setItem('token', token);
          set({ token, user: { id: found.id, name: found.name, email: found.email }, loading: false });
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
  },

  fetchUser: async () => {
    set({ loading: true, error: null });
    const demoUsers = [
      { id: '1', name: 'Demo User', email: 'demo@zenith.com', password: 'demo123' },
      { id: '2', name: 'Admin User', email: 'admin@zenith.com', password: 'admin123' },
      { id: '3', name: 'Test User', email: 'test@zenith.com', password: 'test123' },
    ];
    try {
      await new Promise((res) => setTimeout(res, 500));
      const token = localStorage.getItem('token');
      if (token) {
        const email = token.replace('mock-jwt-token-', '');
        const found = demoUsers.find(u => u.email === email);
        if (found) {
          set({ user: { id: found.id, name: found.name, email: found.email }, loading: false });
        } else {
          set({ user: null, loading: false });
        }
      } else {
        set({ user: null, loading: false });
      }
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
})); 