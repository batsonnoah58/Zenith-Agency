import * as React from 'react';
import { Link } from 'react-router-dom';
import { useUserStore } from '../store/user';
import ProfileIconGrid from '../components/ProfileIconGrid';
import { FaMedal, FaFire, FaTrophy } from 'react-icons/fa';
import { LEVELS as LEVELS_DATA } from '../data/levels';
import { getManagementFees } from '../utils/managementFee';
import EarningLevelsTable from '../components/EarningLevelsTable';
import Card from '../components/Card';
import Button from '../components/Button';
import Tooltip from '../components/Tooltip';
import { FaInfoCircle } from 'react-icons/fa';

const mockBadges = [
  { icon: <FaMedal className="text-yellow-400" />, label: 'First Task' },
  { icon: <FaMedal className="text-blue-400" />, label: 'First Referral' },
  { icon: <FaTrophy className="text-green-500" />, label: 'Level Up' },
];

const Account = () => {
  const profile = useUserStore((s) => s.profile);
  const [streak] = React.useState(5); // mock streak
  const [showLevelsModal, setShowLevelsModal] = React.useState(false);
  const currentLevelData = profile ? LEVELS_DATA.find(l => l.level === `J${profile.level}`) : undefined;
  const managementFees = currentLevelData ? getManagementFees(currentLevelData.level) : null;
  if (!profile) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-8 w-full bg-gradient-to-br from-blue-50 to-purple-50">
      <Card className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full border border-gray-100 flex flex-col items-center">
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full bg-blue-200 flex items-center justify-center text-4xl font-bold text-blue-800 mb-4">
          {profile.name ? profile.name[0].toUpperCase() : '?'}
        </div>
        {/* Name and Phone */}
        <div className="text-2xl font-bold text-blue-900 mb-1">{profile.name}</div>
        <div className="text-gray-600 mb-2">{profile.phone}</div>
        {/* Level */}
        <div className="mb-4 text-sm text-blue-700 font-semibold bg-blue-100 px-3 py-1 rounded-full">Level J{profile.level}</div>
        {/* Daily Wage & Management Fee */}
        <div className="w-full mb-4">
          <Card className="bg-green-50 border border-green-200 rounded-lg p-4 flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-2 text-green-900">Your Daily Wage & Management Fee</h2>
            <ul className="text-gray-700 space-y-1 mb-3">
              <li>Daily Wage: <span className="font-bold text-green-700">KSh {currentLevelData?.dailyWages?.toLocaleString() || '--'}</span></li>
              <li>Management Fee <Tooltip text="A bonus you earn daily from your direct subordinates' activity."><FaInfoCircle className="inline ml-1 text-blue-400" /></Tooltip> (Level A <Tooltip text="Direct subordinates you recruited."><FaInfoCircle className="inline ml-1 text-blue-400" /></Tooltip>): <span className="font-bold">KSh {managementFees?.A ?? '--'}</span></li>
              <li>Level B <Tooltip text="Indirect subordinates (your subordinates' recruits)."><FaInfoCircle className="inline ml-1 text-blue-400" /></Tooltip> Fee: <span className="font-bold">KSh {managementFees?.B ?? '--'}</span></li>
              <li>Level C <Tooltip text="Third-level subordinates (recruited by your Level B team)."><FaInfoCircle className="inline ml-1 text-blue-400" /></Tooltip> Fee: <span className="font-bold">KSh {managementFees?.C ?? '--'}</span></li>
            </ul>
            <Button
              className="bg-blue-600 text-white px-4 py-1 rounded font-semibold hover:bg-blue-700 transition-colors shadow text-sm"
              onClick={() => setShowLevelsModal(true)}
            >
              See All Levels
            </Button>
          </Card>
        </div>
        {/* Modal for Earning Levels Table */}
        {showLevelsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <Card className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl font-bold"
                onClick={() => setShowLevelsModal(false)}
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold mb-4 text-blue-900">Earning Levels Table</h2>
              <div className="overflow-x-auto">
                <EarningLevelsTable />
              </div>
            </Card>
          </div>
        )}
        {/* Icon Navigation */}
        <ProfileIconGrid />
        {/* Gamification Section */}
        <div className="w-full mt-6">
          <Card className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
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
      </Card>
    </div>
  );
};

export default Account;