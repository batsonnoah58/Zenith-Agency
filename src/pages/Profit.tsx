import * as React from 'react';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useUserStore } from '../store/user';

const Profit = () => {
  const profile = useUserStore(s => s.profile);
  const earnings = {
    referrals: 900,
    tasks: 300,
    total: 1200,
  };

  const [withdrawing, setWithdrawing] = React.useState(false);
  const [mpesaNumber, setMpesaNumber] = React.useState('');
  const [mpesaError, setMpesaError] = React.useState('');
  const [withdrawAmount, setWithdrawAmount] = React.useState('');
  const [amountError, setAmountError] = React.useState('');
  const [fullName, setFullName] = React.useState(profile?.name || '');
  const [nameError, setNameError] = React.useState('');

  const handleWithdraw = () => {
    let valid = true;
    if (!/^\d{10,}$/.test(mpesaNumber)) {
      setMpesaError('Please enter a valid Mpesa number (at least 10 digits).');
      valid = false;
    } else {
      setMpesaError('');
    }
    const amount = parseFloat(withdrawAmount);
    if (!withdrawAmount || isNaN(amount) || amount < 1 || amount > availableBalance) {
      setAmountError(`Enter an amount between KSh 1 and KSh ${availableBalance}`);
      valid = false;
    } else {
      setAmountError('');
    }
    if (!fullName.trim()) {
      setNameError('Please enter your full name.');
      valid = false;
    } else {
      setNameError('');
    }
    if (!valid) return;
    setWithdrawing(true);
    setTimeout(() => {
      setWithdrawing(false);
      toast.success('Withdrawal request submitted!');
    }, 1200);
  };

  // Use real data from store
  const earningsHistory = profile?.earningsHistory || [];
  const paymentHistory = profile?.paymentHistory || [];
  const lifetimeEarnings = profile?.stats?.earnings || 0;
  const availableBalance = profile?.stats?.earnings || 0; // For demo, same as lifetime

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-12">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full border border-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-blue-900">Profit Overview</h1>
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow p-6 mb-6 border border-gray-100">
          <div className="flex justify-between mb-2">
            <span className="font-medium">From Referrals:</span>
            <span className="text-blue-600 font-bold">KSh {earnings.referrals}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-medium">From Tasks:</span>
            <span className="text-blue-600 font-bold">KSh {earnings.tasks}</span>
          </div>
          <div className="border-t my-2"></div>
          <div className="flex justify-between text-lg">
            <span className="font-semibold">Total Earnings:</span>
            <span className="text-green-600 font-bold">KSh {earnings.total}</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow p-6 mb-6 border border-gray-100">
          <div className="flex justify-between mb-2">
            <span className="font-medium">Lifetime Earnings:</span>
            <span className="text-blue-600 font-bold">KSh {lifetimeEarnings}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-medium">Available Balance:</span>
            <span className="text-green-600 font-bold">KSh {availableBalance}</span>
          </div>
        </div>
        {/* Earnings Chart (real data) */}
        <div className="bg-white rounded-xl shadow p-4 border border-gray-100 mb-6">
          <h2 className="text-lg font-semibold mb-2 text-blue-900">Earnings Over Time</h2>
          <div className="w-full h-32 bg-gradient-to-r from-blue-100 to-purple-100 rounded flex items-end gap-2 p-2">
            {earningsHistory.map((e, i) => (
              <div key={i} className="flex flex-col items-center justify-end" style={{height:'100%'}}>
                <div className="bg-blue-500 rounded w-6" style={{height: `${e.amount/6}px`, minHeight: '10px'}}></div>
                <span className="text-xs text-gray-500 mt-1">{e.date.slice(5,10)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1" htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
            placeholder="Your full name"
            required
          />
          {nameError && <div className="text-red-600 text-sm mt-1">{nameError}</div>}
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1" htmlFor="mpesaNumber">Mpesa Number</label>
          <input
            id="mpesaNumber"
            type="tel"
            value={mpesaNumber}
            onChange={e => setMpesaNumber(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
            placeholder="e.g. 0712345678"
            required
          />
          {mpesaError && <div className="text-red-600 text-sm mt-1">{mpesaError}</div>}
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1" htmlFor="withdrawAmount">Amount to Withdraw</label>
          <input
            id="withdrawAmount"
            type="number"
            min={1}
            max={availableBalance}
            value={withdrawAmount}
            onChange={e => setWithdrawAmount(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
            placeholder={`Up to ${availableBalance}`}
            required
          />
          {amountError && <div className="text-red-600 text-sm mt-1">{amountError}</div>}
        </div>
        <button
          className="w-full bg-yellow-400 text-blue-900 py-2 rounded font-semibold hover:bg-yellow-300 transition-colors shadow mb-6"
          onClick={handleWithdraw}
          disabled={withdrawing || !/^\d{10,}$/.test(mpesaNumber) || !withdrawAmount || isNaN(parseFloat(withdrawAmount)) || parseFloat(withdrawAmount) < 1 || parseFloat(withdrawAmount) > availableBalance || !fullName.trim()}
        >
          {withdrawing ? 'Processing...' : 'Withdraw' }
        </button>
        {/* Payment History (real data) */}
        <div className="bg-white rounded-xl shadow p-4 border border-gray-100 mb-6">
          <h2 className="text-lg font-semibold mb-2 text-blue-900">Payment History</h2>
          <ul className="divide-y divide-gray-200">
            {paymentHistory.map((p) => (
              <li key={p.id} className="py-2 flex justify-between items-center">
                <span>{p.date.slice(0,10)}</span>
                <span className="font-semibold">KSh {p.amount}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${p.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{p.status}</span>
                <span className="text-xs text-gray-500 ml-2">Ref: #{p.id}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Tips/FAQ */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2 text-blue-900">How to Withdraw</h2>
          <ul className="list-disc pl-5 text-gray-700 text-sm mb-2">
            <li>Ensure your available balance is above KSh 1.</li>
            <li>Click the Withdraw button and follow the prompts.</li>
            <li>Withdrawals are processed instantly, but may take up to 24 hours in rare cases.</li>
          </ul>
          <h2 className="text-xl font-semibold mb-2 mt-4 text-blue-900">FAQ</h2>
          <ul className="list-disc pl-5 text-gray-700 text-sm">
            <li>Minimum withdrawal is KSh 1.</li>
            <li>Contact support if you have any issues with your withdrawal.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profit;