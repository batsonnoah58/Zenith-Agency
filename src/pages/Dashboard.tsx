import * as React from 'react';
import { useUserStore } from '../store/user';
import { LEVELS } from '../utils/levels';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const profile = useUserStore((s) => s.profile);
  const currentLevelConfig = useUserStore((s) => s.currentLevelConfig());
  const tasksRemaining = useUserStore((s) => s.tasksRemaining());
  const upgradeLevel = useUserStore((s) => s.upgradeLevel);

  // Use real data from store
  const earnings = profile?.stats?.earnings || 0;
  const referralEarnings = profile?.stats?.referrals || 0;
  const tasksCompleted = profile?.stats?.tasksCompleted || 0;
  const referralCount = profile?.referralCount || 0;
  const earningsHistory = profile?.earningsHistory || [];
  const paymentHistory = profile?.paymentHistory || [];
  // Calculate tasks this week/month from earningsHistory
  const now = new Date();
  const weekAgo = new Date(now); weekAgo.setDate(now.getDate() - 7);
  const monthAgo = new Date(now); monthAgo.setDate(now.getDate() - 30);
  const tasksThisWeek = earningsHistory.filter(e => e.source === 'task' && new Date(e.date) >= weekAgo).length;
  const tasksThisMonth = earningsHistory.filter(e => e.source === 'task' && new Date(e.date) >= monthAgo).length;
  const nextLevel = profile ? LEVELS.find(l => l.level === profile.level + 1) : undefined;
  const progressToNext = nextLevel && profile ? Math.min(100, Math.round((profile.investment / nextLevel.investment) * 100)) : 100;
  // Recent activity: combine last 5 from earningsHistory and paymentHistory
  const recentActivity = [
    ...earningsHistory.slice(-3).map(e => ({ type: e.source === 'task' ? 'Task' : e.source === 'referral' ? 'Referral' : 'Bonus', desc: e.description || '', date: e.date.slice(0,10) })),
    ...paymentHistory.slice(-2).map(p => ({ type: 'Withdraw', desc: `Withdrew KSh ${p.amount}`, date: p.date.slice(0,10) }))
  ].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);

  if (!profile || !currentLevelConfig) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-12">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-3xl w-full border border-gray-100">
        <h1 className="text-4xl font-bold mb-4 text-blue-900">Welcome, {profile.name || 'User'}!</h1>
        <p className="text-lg text-gray-600 mb-8">Here is your dashboard overview:</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow p-6 text-center border border-gray-100">
            <div className="text-2xl font-bold text-blue-600 mb-2">Level {profile.level}</div>
            <div className="text-gray-700">Current Level</div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow p-6 text-center border border-gray-100">
            <div className="text-2xl font-bold text-blue-600 mb-2">KSh {profile.investment.toLocaleString()}</div>
            <div className="text-gray-700">Investment</div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow p-6 text-center border border-gray-100">
            <div className="text-2xl font-bold text-blue-600 mb-2">{tasksRemaining} / {currentLevelConfig.tasksPerDay}</div>
            <div className="text-gray-700">Tasks Remaining Today</div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2 text-blue-900">Earnings Summary</h2>
            <ul className="text-gray-700 space-y-1 mb-4">
              <li>Total Earnings: <span className="font-bold text-green-700">KSh {earnings}</span></li>
              <li>From Tasks: <span className="font-bold">KSh {earningsHistory.filter(e => e.source === 'task').reduce((sum, e) => sum + e.amount, 0)}</span></li>
              <li>From Referrals: <span className="font-bold">KSh {earningsHistory.filter(e => e.source === 'referral').reduce((sum, e) => sum + e.amount, 0)}</span></li>
              <li>Referrals: <span className="font-bold">{referralCount}</span></li>
            </ul>
            <h2 className="text-xl font-semibold mb-2 text-blue-900">Task Stats</h2>
            <ul className="text-gray-700 space-y-1">
              <li>Total Tasks Completed: <span className="font-bold">{earningsHistory.filter(e => e.source === 'task').length}</span></li>
              <li>This Week: <span className="font-bold">{tasksThisWeek}</span></li>
              <li>This Month: <span className="font-bold">{tasksThisMonth}</span></li>
            </ul>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2 text-yellow-900">Progress to Next Level</h2>
            {nextLevel && profile ? (
              <>
                <div className="mb-2">Level {profile.level} → Level {nextLevel.level}</div>
                <div className="w-full h-3 bg-yellow-100 rounded-full overflow-hidden mb-2">
                  <div className="h-3 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full" style={{ width: `${progressToNext}%` }}></div>
                </div>
                <div className="text-sm text-gray-700 mb-2">Invest KSh {nextLevel.investment - profile.investment} more to reach Level {nextLevel.level}.</div>
              </>
            ) : (
              <div className="text-green-700 font-bold">You are at the highest level!</div>
            )}
            <h2 className="text-xl font-semibold mb-2 mt-4 text-yellow-900">Tips to Earn More</h2>
            <ul className="list-disc pl-5 text-gray-700 text-sm">
              <li>Complete all daily tasks for maximum earnings.</li>
              <li>Invite friends using your referral link.</li>
              <li>Upgrade your level to unlock higher pay per task.</li>
            </ul>
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-2 text-blue-900">Recent Activity</h2>
          <ul className="divide-y divide-gray-200">
            {recentActivity.map((a, i) => (
              <li key={i} className="py-2 flex justify-between items-center">
                <span className="font-semibold text-blue-700">{a.type}</span>
                <span className="text-gray-700">{a.desc}</span>
                <span className="text-xs text-gray-500">{a.date}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2 text-blue-900">Level Details</h2>
            <ul className="text-gray-700 space-y-1">
              <li>Pay per Task: <span className="font-bold">KSh {currentLevelConfig.payPerTask}</span></li>
              <li>Tasks per Day: <span className="font-bold">{currentLevelConfig.tasksPerDay}</span></li>
              <li>Investment Required: <span className="font-bold">KSh {currentLevelConfig.investment.toLocaleString()}</span></li>
            </ul>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2 text-yellow-900">Upgrade Level</h2>
            <ul className="mb-4">
              {LEVELS.filter(l => l.level > profile.level).map(l => (
                <li key={l.level} className="mb-2 flex items-center justify-between">
                  <span>Level {l.level} - KSh {l.investment.toLocaleString()}</span>
                  <button
                    className="bg-yellow-400 text-blue-900 px-3 py-1 rounded font-semibold hover:bg-yellow-300 transition-colors shadow disabled:opacity-50"
                    onClick={() => upgradeLevel(l.level)}
                    disabled={profile.level >= l.level}
                  >
                    Upgrade
                  </button>
                </li>
              ))}
            </ul>
            {profile.level === 1 && <div className="text-sm text-gray-600">No investment required for Level 1.</div>}
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2 text-blue-900">Your Referral Link</h2>
          <div className="flex items-center space-x-2">
            <span className="bg-gray-100 px-3 py-1 rounded text-gray-700 select-all">
              https://zenithagency.com/ref/{profile.name || 'your-id'}
            </span>
            <button
              className="bg-yellow-400 text-blue-900 px-3 py-1 rounded font-semibold hover:bg-yellow-300 transition-colors shadow"
              onClick={() => navigator.clipboard.writeText(`https://zenithagency.com/ref/${profile.name || 'your-id'}`)}
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;