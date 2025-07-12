import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSpinner, FaDownload, FaUpload, FaEye, FaEyeSlash } from 'react-icons/fa';
import ResponsiveTable from '../components/ResponsiveTable';
import Skeleton from '../components/Skeleton';
import toast from 'react-hot-toast';

const mockTransactions = [
  { id: 1, date: '2024-06-01', type: 'Recharge', amount: 1000, status: 'Completed', reference: 'REF001' },
  { id: 2, date: '2024-06-02', type: 'Withdraw', amount: -500, status: 'Pending', reference: 'REF002' },
  { id: 3, date: '2024-06-03', type: 'Task Reward', amount: 150, status: 'Completed', reference: 'REF003' },
  { id: 4, date: '2024-06-04', type: 'Referral Bonus', amount: 200, status: 'Completed', reference: 'REF004' },
];

const Wallet = () => {
  const [balance, setBalance] = useState(1500);
  const [showBalance, setShowBalance] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState(mockTransactions);
  const [showRechargeModal, setShowRechargeModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleRecharge = () => {
    setShowRechargeModal(true);
    toast.success('Recharge feature coming soon!');
  };

  const handleWithdraw = () => {
    setShowWithdrawModal(true);
    toast.success('Withdrawal feature coming soon!');
  };

  const columns = [
    {
      key: 'date',
      label: 'Date',
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
    {
      key: 'type',
      label: 'Type',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Recharge' ? 'bg-green-100 text-green-800' :
          value === 'Withdraw' ? 'bg-red-100 text-red-800' :
          value === 'Task Reward' ? 'bg-blue-100 text-blue-800' :
          'bg-purple-100 text-purple-800'
        }`}>
          {value}
        </span>
      ),
    },
    {
      key: 'amount',
      label: 'Amount',
      render: (value: number) => (
        <span className={`font-semibold ${value > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {value > 0 ? '+' : ''}KSh {Math.abs(value).toLocaleString()}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Completed' ? 'bg-green-100 text-green-800' :
          value === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {value}
        </span>
      ),
    },
    {
      key: 'reference',
      label: 'Reference',
      hideOnMobile: true,
    },
  ];

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <Skeleton className="w-32 h-8 mb-6" />
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <Skeleton className="w-24 h-4 mb-2" />
          <Skeleton className="w-32 h-8 mb-4" />
          <div className="flex gap-4">
            <Skeleton className="w-24 h-10" />
            <Skeleton className="w-24 h-10" />
          </div>
        </div>
        <Skeleton className="w-full h-64" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <h1 className="text-3xl font-bold text-blue-900">Wallet</h1>
        
        {/* Balance Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Current Balance</h2>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label={showBalance ? 'Hide balance' : 'Show balance'}
            >
              {showBalance ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>
          
          <div className="text-4xl font-bold text-green-600 mb-4">
            {showBalance ? `KES ${balance.toLocaleString()}` : '••••••'}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleRecharge}
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow"
            >
              <FaUpload />
              Recharge
            </button>
            <button
              onClick={handleWithdraw}
              className="flex items-center justify-center gap-2 bg-yellow-400 text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors shadow"
            >
              <FaDownload />
              Withdraw
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow p-4 border border-gray-100">
            <div className="text-sm text-gray-600 mb-1">Total Deposits</div>
            <div className="text-2xl font-bold text-green-600">
              KSh {transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0).toLocaleString()}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border border-gray-100">
            <div className="text-sm text-gray-600 mb-1">Total Withdrawals</div>
            <div className="text-2xl font-bold text-red-600">
              KSh {Math.abs(transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0)).toLocaleString()}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border border-gray-100">
            <div className="text-sm text-gray-600 mb-1">This Month</div>
            <div className="text-2xl font-bold text-blue-600">
              KSh {transactions.filter(t => new Date(t.date).getMonth() === new Date().getMonth()).reduce((sum, t) => sum + t.amount, 0).toLocaleString()}
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-lg shadow border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
            <p className="text-sm text-gray-600 mt-1">Your recent wallet activity</p>
          </div>
          <ResponsiveTable
            columns={columns}
            data={transactions}
            emptyMessage="No transactions found"
            className="rounded-b-lg"
          />
        </div>

        {/* Info Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">Wallet Information</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Minimum withdrawal: KSh 100</li>
            <li>• Maximum withdrawal: KSh 50,000 per day</li>
            <li>• Withdrawals are processed within 24 hours</li>
            <li>• All transactions are secure and encrypted</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default Wallet; 