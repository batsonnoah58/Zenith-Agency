import React from 'react';

const mockRecords = [
  { id: 1, date: '2024-06-01', type: 'Recharge', amount: 1000 },
  { id: 2, date: '2024-06-02', type: 'Withdraw', amount: -500 },
  { id: 3, date: '2024-06-03', type: 'Earning', amount: 700 },
];

export default function FinancialRecords() {
  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-blue-900">Financial Records</h1>
      <div className="bg-white rounded-lg shadow p-4">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-1">Date</th>
              <th className="p-1">Type</th>
              <th className="p-1">Amount</th>
            </tr>
          </thead>
          <tbody>
            {mockRecords.map(r => (
              <tr key={r.id} className="text-center">
                <td className="p-1">{r.date}</td>
                <td className="p-1">{r.type}</td>
                <td className={`p-1 ${r.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>{r.amount > 0 ? '+' : ''}{r.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 