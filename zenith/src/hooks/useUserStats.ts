import { useUserStore } from '../store/user';

export default function useUserStats() {
  const profile = useUserStore((s) => s.profile);
  return profile?.stats || { earnings: 0, referrals: 0, tasksCompleted: 0 };
} 