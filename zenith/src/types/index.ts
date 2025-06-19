export interface User {
  name: string;
  email: string;
  phone: string;
  referral?: string;
  stats: UserStats;
}

export interface UserStats {
  earnings: number;
  referrals: number;
  tasksCompleted: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface Profit {
  total: number;
}

export interface Referral {
  code: string;
  referredBy?: string;
} 