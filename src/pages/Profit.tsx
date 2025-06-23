import * as React from 'react';
import toast from 'react-hot-toast';

const paymentHistory = [
  { id: 1, date: '2024-06-20', amount: 500, status: 'Completed' },
  { id: 2, date: '2024-06-10', amount: 300, status: 'Completed' },
  { id: 3, date: '2024-05-28', amount: 400, status: 'Completed' },
];

const Profit = () => {
  const earnings = {
    referrals: 900,
    tasks: 300,
    total: 1200,
  };

  const [withdrawing, setWithdrawing] = React.useState(false);

  const handleWithdraw = () => {
    setWithdrawing(true);
    setTimeout(() => {
      setWithdrawing(false);
      toast.success('Withdrawal request submitted!');
    }, 1200);
  };

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
        <button
          className="w-full bg-yellow-400 text-blue-900 py-2 rounded font-semibold hover:bg-yellow-300 transition-colors shadow mb-6"
          onClick={handleWithdraw}
          disabled={withdrawing}
        >
          {withdrawing ? 'Processing...' : 'Withdraw' }
        </button>
        <div className="bg-white rounded-xl shadow p-4 border border-gray-100">
          <h2 className="text-lg font-semibold mb-2 text-blue-900">Payment History</h2>
          <ul className="divide-y divide-gray-200">
            {paymentHistory.map((p) => (
              <li key={p.id} className="py-2 flex justify-between items-center">
                <span>{p.date}</span>
                <span className="font-semibold">KSh {p.amount}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${p.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{p.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profit;