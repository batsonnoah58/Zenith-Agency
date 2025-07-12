import React from 'react';
import { FaCrown, FaUserFriends, FaInfoCircle } from 'react-icons/fa';
import { LEVELS as LEVELS_DATA } from '../data/levels';
import { getManagementFees } from '../utils/managementFee';
import EarningLevelsTable from '../components/EarningLevelsTable';
import Tooltip from '../components/Tooltip';

const mockTeam = [
  { id: 1, name: 'Alice', level: 2, earnings: 500 },
  { id: 2, name: 'Bob', level: 1, earnings: 200 },
  { id: 3, name: 'Carol', level: 3, earnings: 800 },
];

const sortedTeam = [...mockTeam].sort((a, b) => b.earnings - a.earnings);

export default function TeamReports() {
  const [showLevelsModal, setShowLevelsModal] = React.useState(false);
  // Calculate total daily management fee from team (Level A only for direct subordinates)
  const totalManagementFee = mockTeam.reduce((sum, m) => {
    const fees = getManagementFees(`J${m.level}`);
    return sum + (fees?.A || 0);
  }, 0);

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-blue-900">Team Reports</h1>
      {/* Team Tree Visualization */}
      <div className="bg-white rounded-lg shadow p-4 mb-4 flex flex-col items-center">
        <div className="font-semibold mb-2 flex items-center gap-2"><FaUserFriends /> Your Team Tree</div>
        <div className="w-full flex flex-col items-center">
          <div className="w-24 h-24 flex flex-col items-center justify-center">
            {/* Simple tree: user at top, lines to team */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold mb-1">U</div>
              <div className="h-4 w-0.5 bg-blue-300" />
              <div className="flex gap-2 mt-1">
                {mockTeam.map(member => (
                  <div key={member.id} className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-purple-400 text-white flex items-center justify-center text-xs font-bold">{member.name[0]}</div>
                    <span className="text-xs mt-1">{member.name}</span>
                    <span className="text-[10px] text-blue-700">J{member.level}</span>
                    <span className="text-[10px] text-green-700">+KES {getManagementFees(`J${member.level}`)?.A ?? '--'}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="text-blue-700 text-sm mt-2">Total Daily Management Fee from Team: <span className="font-bold">KES {totalManagementFee.toFixed(2)}</span></div>
        <button
          className="bg-blue-600 text-white px-4 py-1 rounded font-semibold hover:bg-blue-700 transition-colors shadow text-xs mt-2"
          onClick={() => setShowLevelsModal(true)}
        >
          See All Levels
        </button>
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
      {/* Team Leaderboard */}
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <div className="font-semibold mb-2 flex items-center gap-2"><FaCrown className="text-yellow-500" /> Team Leaderboard</div>
        <ol className="list-decimal ml-5">
          {sortedTeam.map((member, idx) => (
            <li key={member.id} className="flex items-center gap-2 mb-1">
              <span className="font-bold text-blue-700">{member.name}</span>
              <span className="text-xs bg-blue-100 text-blue-700 rounded px-2 py-0.5">Level J{member.level}</span>
              <span className="text-green-600 font-semibold">KES {member.earnings}</span>
              <span className="text-xs text-green-700">+KES {getManagementFees(`J${member.level}`)?.A ?? '--'}</span>
              {idx === 0 && <FaCrown className="text-yellow-500 ml-1" title="Top Earner" />}
            </li>
          ))}
        </ol>
      </div>
      {/* Team Table */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="font-semibold mb-2">Your Team</div>
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-1">Name</th>
              <th className="p-1">Level <Tooltip text="Level of your direct subordinate (Level A)."><FaInfoCircle className="inline ml-1 text-blue-400" /></Tooltip></th>
              <th className="p-1">Earnings</th>
              <th className="p-1">Daily Fee <Tooltip text="Management fee you earn daily from this team member (Level A)."><FaInfoCircle className="inline ml-1 text-blue-400" /></Tooltip></th>
            </tr>
          </thead>
          <tbody>
            {mockTeam.map(member => (
              <tr key={member.id} className="text-center">
                <td className="p-1">{member.name}</td>
                <td className="p-1">J{member.level}</td>
                <td className="p-1 text-green-600">KES {member.earnings}</td>
                <td className="p-1 text-green-700">KES {getManagementFees(`J${member.level}`)?.A ?? '--'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 