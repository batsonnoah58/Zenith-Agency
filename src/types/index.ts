export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  referral?: string;
  stats: UserStats;
  level: number;
  investment: number;
  tasksCompletedToday: number;
  lastTaskCompletionDate: string;
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

// Level configuration type
type LevelConfig = {
  level: number;
  investment: number;
  tasksPerDay: number;
  payPerTask: number;
}; 