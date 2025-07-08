import { create } from 'zustand';

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
  login: (phone: string, password: string) => Promise<void>;
  signup: (name: string, phone: string, password: string) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set: (partial: Partial<AuthState>) => void) => ({
  user: null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null,

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