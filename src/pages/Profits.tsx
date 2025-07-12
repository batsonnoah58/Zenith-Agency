import React from 'react';

export default function Profits() {
  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-blue-900">Profits</h1>
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <div className="flex justify-between mb-2">
          <span>Total Earnings:</span>
          <span className="font-bold text-green-600">KES 12,000</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Referral Earnings:</span>
          <span className="font-bold text-blue-600">KES 3,000</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Task Earnings:</span>
          <span className="font-bold text-yellow-600">KES 9,000</span>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-4">
        <div className="font-semibold mb-2">Earnings Breakdown</div>
        <ul className="text-sm">
          <li className="mb-1">2024-06-01: Task - KES 500</li>
          <li className="mb-1">2024-06-02: Referral - KES 200</li>
          <li className="mb-1">2024-06-03: Task - KES 700</li>
        </ul>
      </div>
    </div>
  );
} 