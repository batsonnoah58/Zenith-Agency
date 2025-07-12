import React from 'react';

interface ReferralSectionProps {
  referralCode: string;
  referralEarnings: number;
  onCopy: () => void;
}

const ReferralSection: React.FC<ReferralSectionProps> = ({ referralCode, referralEarnings, onCopy }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4 flex flex-col items-center">
      <div className="text-lg font-semibold mb-2">Your Referral Code</div>
      <div className="font-mono text-xl mb-2">{referralCode}</div>
      <button
        onClick={onCopy}
        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mb-2"
      >
        Copy Referral Link
      </button>
      <div className="text-sm text-gray-600">Referral Earnings: <span className="font-bold">KES {referralEarnings.toLocaleString()}</span></div>
    </div>
  );
};

export default ReferralSection; 