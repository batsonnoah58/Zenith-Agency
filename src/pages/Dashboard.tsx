import * as React from 'react';
import { useAuthStore } from '../store/auth';

const Dashboard = () => {
  const { user } = useAuthStore();

  // Mock stats
  const stats = [
    { label: 'Referrals', value: 12 },
    { label: 'Tasks Completed', value: 34 },
    { label: 'Total Earnings', value: 'KSh 1,200' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-12">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-3xl w-full border border-gray-100">
        <h1 className="text-4xl font-bold mb-4 text-blue-900">Welcome, {user?.name || 'User'}!</h1>
        <p className="text-lg text-gray-600 mb-8">Here is your dashboard overview:</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow p-6 text-center border border-gray-100">
              <div className="text-2xl font-bold text-blue-600 mb-2">{stat.value}</div>
              <div className="text-gray-700">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2 text-blue-900">Your Referral Link</h2>
          <div className="flex items-center space-x-2">
            <span className="bg-gray-100 px-3 py-1 rounded text-gray-700 select-all">
              https://zenithagency.com/ref/{user?.id || 'your-id'}
            </span>
            <button
              className="bg-yellow-400 text-blue-900 px-3 py-1 rounded font-semibold hover:bg-yellow-300 transition-colors shadow"
              onClick={() => navigator.clipboard.writeText(`https://zenithagency.com/ref/${user?.id || 'your-id'}`)}
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