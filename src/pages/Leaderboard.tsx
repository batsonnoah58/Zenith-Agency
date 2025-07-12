import React from 'react';
import { FaMedal, FaFire, FaTrophy } from 'react-icons/fa';
import EarningLevelsTable from '../components/EarningLevelsTable';
import Card from '../components/Card';
import Button from '../components/Button';

const mockLeaderboard = [
  { id: 1, name: 'Alice', badges: 3, streak: 10, earnings: 5000, level: 'J5' },
  { id: 2, name: 'Bob', badges: 2, streak: 7, earnings: 4000, level: 'J4' },
  { id: 3, name: 'Carol', badges: 1, streak: 5, earnings: 3000, level: 'J3' },
];

export default function Leaderboard() {
  const [showLevelsModal, setShowLevelsModal] = React.useState(false);
  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-blue-900 flex items-center gap-2"><FaTrophy className="text-yellow-500" /> Leaderboard</h1>
      <Button
        onClick={() => setShowLevelsModal(true)}
      >
        See Earning Levels Table
      </Button>
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
      <Card className="mt-6">
        <table className="w-full text-xs overflow-x-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-1">Rank</th>
              <th className="p-1">Name</th>
              <th className="p-1">Level</th>
              <th className="p-1">Badges</th>
              <th className="p-1">Streak</th>
              <th className="p-1">Earnings</th>
            </tr>
          </thead>
          <tbody>
            {mockLeaderboard.map((user, idx) => (
              <tr key={user.id} className="text-center">
                <td className="p-1 font-bold">{idx + 1}</td>
                <td className="p-1">{user.name}</td>
                <td className="p-1">{user.level}</td>
                <td className="p-1 flex items-center justify-center gap-1">{Array(user.badges).fill(0).map((_, i) => <FaMedal key={i} className="text-yellow-400" />)}</td>
                <td className="p-1 flex items-center justify-center gap-1"><FaFire className="text-orange-500" /> {user.streak}d</td>
                <td className="p-1 text-green-600 font-semibold">KES {user.earnings}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
} 