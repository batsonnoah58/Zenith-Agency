import * as React from 'react';
import { Link } from 'react-router-dom';
import { useUserStore } from '../store/user';
import { LEVELS as LEVELS_CONFIG } from '../utils/levels';
import { LEVELS as LEVELS_DATA } from '../data/levels';
import { FaMedal, FaFire, FaTrophy, FaSpinner } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import EarningLevelsTable from '../components/EarningLevelsTable';
import { getManagementFees } from '../utils/managementFee';
import Card from '../components/Card';
import Button from '../components/Button';
import Tooltip from '../components/Tooltip';
import { FaInfoCircle } from 'react-icons/fa';
import Skeleton, { SkeletonCard } from '../components/Skeleton';

const mockBadges = [
  { icon: <FaMedal className="text-yellow-400" />, label: 'First Task' },
  { icon: <FaMedal className="text-blue-400" />, label: 'First Referral' },
  { icon: <FaTrophy className="text-green-500" />, label: 'Level Up' },
];

const Dashboard = () => {
  const profile = useUserStore((s) => s.profile);
  const tasksRemaining = useUserStore((s) => s.tasksRemaining());
  const upgradeLevel = useUserStore((s) => s.upgradeLevel);
  const [streak, setStreak] = useState(5); // mock streak
  const [showLevelsModal, setShowLevelsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

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
  const nextLevel = profile ? LEVELS_CONFIG.find(l => l.level === profile.level + 1) : undefined;
  const progressToNext = nextLevel && profile ? Math.min(100, Math.round((profile.investment / nextLevel.investment) * 100)) : 100;
  // Recent activity: combine last 5 from earningsHistory and paymentHistory
  const recentActivity = [
    ...earningsHistory.slice(-3).map(e => ({ type: e.source === 'task' ? 'Task' : e.source === 'referral' ? 'Referral' : 'Bonus', desc: e.description || '', date: e.date.slice(0,10) })),
    ...paymentHistory.slice(-2).map(p => ({ type: 'Withdraw', desc: `Withdrew KSh ${p.amount}`, date: p.date.slice(0,10) }))
  ].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);

  const currentLevelData = profile ? LEVELS_DATA.find(l => l.level === `J${profile.level}`) : undefined;
  const managementFees = currentLevelData ? getManagementFees(currentLevelData.level) : null;
  const currentLevelConfig = profile ? LEVELS_CONFIG.find(l => l.level === profile.level) : undefined;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] py-12">
        <div className="max-w-3xl w-full space-y-6">
          <SkeletonCard />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] py-12">
        <Card className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full border border-gray-100 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaFire className="text-red-500 text-2xl" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Unable to load dashboard</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </Card>
      </div>
    );
  }

  if (!profile || !currentLevelConfig) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] py-12">
        <Card className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full border border-gray-100 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaSpinner className="text-blue-500 text-2xl animate-spin" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Loading your profile...</h1>
          <p className="text-gray-600">Please wait while we fetch your data.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-12">
      <Card className="bg-white rounded-2xl shadow-2xl p-10 max-w-3xl w-full border border-gray-100">
        <h1 className="text-4xl font-bold mb-4 text-blue-900">Welcome, {profile.name || 'User'}!</h1>
        <p className="text-lg text-gray-600 mb-8">Here is your dashboard overview:</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow p-6 text-center border border-gray-100">
            <div className="text-2xl font-bold text-blue-600 mb-2">Level {profile.level}</div>
            <div className="text-gray-700">Current Level</div>
          </Card>
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow p-6 text-center border border-gray-100">
            <div className="text-2xl font-bold text-blue-600 mb-2">KSh {profile.investment.toLocaleString()}</div>
            <div className="text-gray-700">Investment</div>
          </Card>
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow p-6 text-center border border-gray-100">
            <div className="text-2xl font-bold text-blue-600 mb-2">{tasksRemaining} / {currentLevelConfig.tasksPerDay}</div>
            <div className="text-gray-700">Tasks Remaining Today</div>
          </Card>
        </div>
        {/* New: Daily Wage & Management Fee Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2 text-green-900">Your Daily Wage & Management Fee</h2>
            <ul className="text-gray-700 space-y-1 mb-4">
              <li>Daily Wage: <span className="font-bold text-green-700">KSh {currentLevelData?.dailyWages?.toLocaleString() || '--'}</span></li>
              <li>Management Fee <Tooltip text="A bonus you earn daily from your direct subordinates' activity."><FaInfoCircle className="inline ml-1 text-blue-400" /></Tooltip> (Level A <Tooltip text="Direct subordinates you recruited."><FaInfoCircle className="inline ml-1 text-blue-400" /></Tooltip>): <span className="font-bold">KSh {managementFees?.A ?? '--'}</span></li>
              <li>Level B <Tooltip text="Indirect subordinates (your subordinates' recruits)."><FaInfoCircle className="inline ml-1 text-blue-400" /></Tooltip> Fee: <span className="font-bold">KSh {managementFees?.B ?? '--'}</span></li>
              <li>Level C <Tooltip text="Third-level subordinates (recruited by your Level B team)."><FaInfoCircle className="inline ml-1 text-blue-400" /></Tooltip> Fee: <span className="font-bold">KSh {managementFees?.C ?? '--'}</span></li>
            </ul>
            <Button
              className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 transition-colors shadow text-sm"
              onClick={() => setShowLevelsModal(true)}
            >
              See All Levels
            </Button>
          </Card>
        </div>
        {/* Modal for Earning Levels Table */}
        {showLevelsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl font-bold"
                onClick={() => setShowLevelsModal(false)}
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold mb-4 text-blue-900">Earning Levels Table</h2>
              <EarningLevelsTable />
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-blue-50 border border-blue-200 rounded-lg p-6">
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
          </Card>
          <Card className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
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
          </Card>
        </div>
        <Card className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
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
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2 text-blue-900">Level Details</h2>
            <ul className="text-gray-700 space-y-1">
              <li>Pay per Task: <span className="font-bold">KSh {currentLevelConfig.payPerTask}</span></li>
              <li>Tasks per Day: <span className="font-bold">{currentLevelConfig.tasksPerDay}</span></li>
              <li>Investment Required: <span className="font-bold">KSh {currentLevelConfig.investment.toLocaleString()}</span></li>
            </ul>
          </Card>
          <Card className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2 text-yellow-900">Upgrade Level</h2>
            <ul className="mb-4">
              {LEVELS_CONFIG.filter(l => l.level > profile.level).map(l => (
                <li key={l.level} className="mb-2 flex items-center justify-between">
                  <span>Level {l.level} - KSh {l.investment.toLocaleString()}</span>
                  <Button
                    className="bg-yellow-400 text-blue-900 px-3 py-1 rounded font-semibold hover:bg-yellow-300 transition-colors shadow disabled:opacity-50"
                    onClick={() => upgradeLevel(l.level)}
                    disabled={profile.level >= l.level}
                  >
                    Upgrade
                  </Button>
                </li>
              ))}
            </ul>
            {profile.level === 1 && <div className="text-sm text-gray-600">No investment required for Level 1.</div>}
          </Card>
        </div>
        <Card className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2 text-blue-900">Your Referral Link</h2>
          <div className="flex items-center space-x-2">
            <span className="bg-gray-100 px-3 py-1 rounded text-gray-700 select-all">
              https://zenithagency.com/ref/{profile.name || 'your-id'}
            </span>
            <Button
              className="bg-yellow-400 text-blue-900 px-3 py-1 rounded font-semibold hover:bg-yellow-300 transition-colors shadow"
              onClick={() => navigator.clipboard.writeText(`https://zenithagency.com/ref/${profile.name || 'your-id'}`)}
            >
              Copy
            </Button>
          </div>
        </Card>
      </Card>
      {/* Gamification Section */}
      <Card className="bg-white rounded-lg shadow p-4 mb-4 flex flex-col items-center">
        <div className="font-semibold mb-2 flex items-center gap-2"><FaMedal className="text-yellow-400" /> Badges</div>
        <div className="flex gap-3 mb-2">
          {mockBadges.map((b, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="text-3xl">{b.icon}</div>
              <span className="text-xs mt-1">{b.label}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 text-orange-600 font-semibold mb-2"><FaFire /> Streak: {streak} days</div>
        <Link to="/leaderboard" className="text-blue-600 hover:underline text-xs flex items-center gap-1"><FaTrophy /> View Leaderboard</Link>
      </Card>
    </div>
  );
};

export default Dashboard;