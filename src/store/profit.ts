import { create } from 'zustand';

interface ProfitStore {
  total: number;
  addProfit: (amount: number) => void;
  resetProfit: () => void;
}

export const useProfitStore = create<ProfitStore>((set) => ({
  total: 0,
  addProfit: (amount) => set((state) => ({ total: state.total + amount })),
  resetProfit: () => set({ total: 0 }),
})); 