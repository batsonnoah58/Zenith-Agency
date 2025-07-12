import React from 'react';
import { FaWhatsapp, FaSms, FaCopy, FaUserFriends } from 'react-icons/fa';
import { LEVELS as LEVELS_DATA } from '../data/levels';
import { getManagementFees } from '../utils/managementFee';
import EarningLevelsTable from '../components/EarningLevelsTable';
import Card from '../components/Card';
import Button from '../components/Button';
import Tooltip from '../components/Tooltip';
import { FaInfoCircle } from 'react-icons/fa';

// Mock referrals with level info
const mockReferrals = [
  { id: 1, name: 'Alice', date: '2024-06-01', bonus: 200, level: 'J2' },
  { id: 2, name: 'Bob', date: '2024-06-02', bonus: 150, level: 'J3' },
  { id: 3, name: 'Carol', date: '2024-06-03', bonus: 100, level: 'J1' },
];

const referralLink = `${window.location.origin}/signup?ref=ZEN123456`;

export default function Referrals() {
  const [showLevelsModal, setShowLevelsModal] = React.useState(false);
  // Calculate total daily management fee from team (Level A only for direct referrals)
  const totalManagementFee = mockReferrals.reduce((sum, r) => {
    const fees = getManagementFees(r.level);
    return sum + (fees?.A || 0);
  }, 0);

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-blue-900">Referrals</h1>
      {/* Share Referral Link */}
      <Card className="mb-4">
        <div className="font-semibold mb-2">Your Referral Link</div>
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-gray-100 px-2 py-1 rounded text-xs select-all">{referralLink}</span>
          <Button onClick={() => {navigator.clipboard.writeText(referralLink)}} className="text-blue-600 hover:text-blue-800" title="Copy"><FaCopy /></Button>
        </div>
        <div className="flex gap-2 mb-2">
          <a href={`https://wa.me/?text=Join%20me%20on%20Zenith%20Agency!%20${encodeURIComponent(referralLink)}`} target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-3 py-1 rounded flex items-center gap-1 text-xs"><FaWhatsapp /> WhatsApp</a>
          <a href={`sms:?body=Join%20me%20on%20Zenith%20Agency!%20${encodeURIComponent(referralLink)}`} className="bg-blue-500 text-white px-3 py-1 rounded flex items-center gap-1 text-xs"><FaSms /> SMS</a>
        </div>
        <div className="text-xs text-gray-500">Share your link to earn bonuses for every friend who joins!</div>
      </Card>
      {/* Referral Progress */}
      <Card className="mb-4">
        <div className="flex items-center gap-2 mb-2 text-blue-700 font-semibold"><FaUserFriends /> {mockReferrals.length} Joined</div>
        <div className="text-green-600 font-bold mb-1">Total Bonuses: KES {mockReferrals.reduce((sum, r) => sum + r.bonus, 0)}</div>
        <div className="text-blue-700 text-sm mb-1">Total Daily Management Fee from Team: <span className="font-bold">KES {totalManagementFee.toFixed(2)}</span></div>
        <Button
          className="bg-blue-600 text-white px-4 py-1 rounded font-semibold hover:bg-blue-700 transition-colors shadow text-xs mt-2"
          onClick={() => setShowLevelsModal(true)}
        >
          See All Levels
        </Button>
      </Card>
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
      {/* Referral Tree Visualization (unchanged) */}
      <Card className="mb-4">
        <div className="w-24 h-24 flex flex-col items-center justify-center">
          {/* Simple tree: user at top, lines to referrals */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold mb-1">U</div>
            <div className="h-4 w-0.5 bg-blue-300" />
            <div className="flex gap-2 mt-1">
              {mockReferrals.map(r => (
                <div key={r.id} className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-green-400 text-white flex items-center justify-center text-xs font-bold">{r.name[0]}</div>
                  <span className="text-xs mt-1">{r.name}</span>
                  <span className="text-[10px] text-blue-700">{r.level}</span>
                  <span className="text-[10px] text-green-700">+KES {getManagementFees(r.level)?.A ?? '--'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
      {/* Referred Users Table */}
      <Card>
        <div className="font-semibold mb-2">Referred Users</div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-1">Name</th>
                <th className="p-1">Date</th>
                <th className="p-1">Level <Tooltip text="Level of your direct referral (Level A)."><FaInfoCircle className="inline ml-1 text-blue-400" /></Tooltip></th>
                <th className="p-1">Daily Fee <Tooltip text="Management fee you earn daily from this referral (Level A)."><FaInfoCircle className="inline ml-1 text-blue-400" /></Tooltip></th>
                <th className="p-1">Bonus</th>
              </tr>
            </thead>
            <tbody>
              {mockReferrals.map(ref => (
                <tr key={ref.id} className="text-center">
                  <td className="p-1">{ref.name}</td>
                  <td className="p-1">{ref.date}</td>
                  <td className="p-1">{ref.level}</td>
                  <td className="p-1 text-green-700">KES {getManagementFees(ref.level)?.A ?? '--'}</td>
                  <td className="p-1 text-green-600">KES {ref.bonus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
} 