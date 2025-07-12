import React, { useState } from 'react';

interface RechargeModalProps {
  open: boolean;
  onClose: () => void;
  currentLevel: number;
  nextLevel: { level: number; investment: number } | null;
  onRecharge: (amount: number) => void;
}

const RechargeModal: React.FC<RechargeModalProps> = ({ open, onClose, currentLevel, nextLevel, onRecharge }) => {
  const [amount, setAmount] = useState('');
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80 relative">
        <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>&times;</button>
        <h2 className="text-xl font-bold mb-2">Upgrade Level</h2>
        <div className="mb-2">Current Level: <span className="font-semibold">J{currentLevel}</span></div>
        {nextLevel ? (
          <div className="mb-4">
            Next Level: <span className="font-semibold">J{nextLevel.level}</span><br />
            Required Bond: <span className="font-semibold">KES {nextLevel.investment.toLocaleString()}</span>
          </div>
        ) : (
          <div className="mb-4 text-green-600 font-semibold">You are at the highest level!</div>
        )}
        {nextLevel && (
          <>
            <input
              type="number"
              className="border rounded px-2 py-1 w-full mb-3"
              placeholder="Enter amount to recharge"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              min={nextLevel.investment}
            />
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
              onClick={() => onRecharge(Number(amount))}
              disabled={Number(amount) < nextLevel.investment}
            >
              Recharge & Upgrade
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default RechargeModal; 