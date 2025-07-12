import React from 'react';

export default function DailyStatement() {
  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-blue-900">Daily Statement</h1>
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <div className="flex justify-between mb-2">
          <span>Today's Earnings:</span>
          <span className="font-bold text-green-600">KES 700</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Tasks Completed:</span>
          <span className="font-bold text-blue-600">5</span>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-4">
        <div className="font-semibold mb-2">Summary</div>
        <ul className="text-sm">
          <li className="mb-1">Task 1: KES 100</li>
          <li className="mb-1">Task 2: KES 100</li>
          <li className="mb-1">Task 3: KES 100</li>
          <li className="mb-1">Task 4: KES 200</li>
          <li className="mb-1">Task 5: KES 200</li>
        </ul>
      </div>
    </div>
  );
} 