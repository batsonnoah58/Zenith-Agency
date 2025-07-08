import * as React from 'react';
import { useUserStore } from '../store/user';
import { LEVELS } from '../utils/levels';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/auth';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';

const Account = () => {
  const profile = useUserStore((s) => s.profile);
  const currentLevelConfig = useUserStore((s) => s.currentLevelConfig());
  const tasksRemaining = useUserStore((s) => s.tasksRemaining());
  const upgradeLevel = useUserStore((s) => s.upgradeLevel);

  const [editMode, setEditMode] = React.useState(false);
  const [profileForm, setProfileForm] = React.useState({ name: profile?.name || '', email: profile?.email || '' });
  const [passwords, setPasswords] = React.useState({ current: '', new: '', confirm: '' });
  const [pwSuccess, setPwSuccess] = React.useState(false);

  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  // Use real data from store
  const accountCreated = profile?.createdAt ? profile.createdAt.slice(0,10) : 'N/A';
  const lastLogin = profile?.lastLogin ? profile.lastLogin.slice(0,10) : 'N/A';
  const passwordLastChanged = profile?.passwordLastChanged ? profile.passwordLastChanged.slice(0,10) : 'N/A';
  const referrals = profile?.referralCount || 0;
  const referralEarnings = profile?.stats?.referrals || 0;
  const profileFields = [profile?.name, profile?.email, profile?.phone];
  const profileComplete = Math.round((profileFields.filter(Boolean).length / profileFields.length) * 100);
  const handleDownload = () => {
    // Mock download
    alert('Account data download (mock)');
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
  };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setEditMode(false);
    toast.success('Profile updated (mock)!');
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      toast.error('New passwords do not match');
      return;
    }
    setPwSuccess(true);
    setTimeout(() => setPwSuccess(false), 2000);
    setPasswords({ current: '', new: '', confirm: '' });
    toast.success('Password changed (mock)!');
  };

  if (!profile || !currentLevelConfig) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-12">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-lg w-full border border-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-blue-900">My Account</h1>
        {/* Level/Investment Info */}
        <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="mb-2 font-semibold text-blue-900">Level {profile.level} (Investment: KSh {profile.investment.toLocaleString()})</div>
          <div className="mb-2">Pay per Task: <span className="font-bold">KSh {currentLevelConfig.payPerTask}</span></div>
          <div className="mb-2">Tasks per Day: <span className="font-bold">{currentLevelConfig.tasksPerDay}</span></div>
          <div className="mb-2">Tasks Remaining Today: <span className="font-bold">{tasksRemaining}</span></div>
          <div className="mb-2">Referrals: <span className="font-bold">{referrals}</span> (Earnings: KSh {referralEarnings})</div>
          <div className="mb-2">Account Created: <span className="font-bold">{accountCreated}</span></div>
          <div className="mb-2">Last Login: <span className="font-bold">{lastLogin}</span></div>
          <div className="mb-2">Password Last Changed: <span className="font-bold">{passwordLastChanged}</span></div>
          <div className="mb-2">Profile Completeness:</div>
          <div className="w-full h-3 bg-blue-100 rounded-full overflow-hidden mb-2">
            <div className="h-3 bg-gradient-to-r from-blue-400 to-green-400 rounded-full" style={{ width: `${profileComplete}%` }}></div>
          </div>
          <div className="text-sm text-gray-700 mb-2">{profileComplete}% complete</div>
          <button onClick={handleDownload} className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 transition-colors shadow text-sm">Download Account Data</button>
        </div>
        {/* Profile Form */}
        <form onSubmit={handleProfileSave} className="mb-8 space-y-4">
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input name="name" value={profileForm.name} onChange={handleProfileChange} required className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input name="email" type="email" value={profileForm.email} onChange={handleProfileChange} required className="w-full border px-3 py-2 rounded" />
          </div>
          <button type="submit" className="w-full bg-yellow-400 text-blue-900 py-2 rounded font-semibold hover:bg-yellow-300 transition-colors shadow">
            Save Changes
          </button>
        </form>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-blue-900">Change Password</h2>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Current Password</label>
              <input name="current" type="password" value={passwords.current} onChange={handlePasswordChange} required className="w-full border px-3 py-2 rounded" />
            </div>
            <div>
              <label className="block font-medium mb-1">New Password</label>
              <input name="new" type="password" value={passwords.new} onChange={handlePasswordChange} required className="w-full border px-3 py-2 rounded" />
            </div>
            <div>
              <label className="block font-medium mb-1">Confirm New Password</label>
              <input name="confirm" type="password" value={passwords.confirm} onChange={handlePasswordChange} required className="w-full border px-3 py-2 rounded" />
            </div>
            <button type="submit" className="w-full bg-yellow-400 text-blue-900 py-2 rounded font-semibold hover:bg-yellow-300 transition-colors shadow">
              Change Password
            </button>
          </form>
        </div>
        <button
          className="w-full bg-red-500 text-white py-2 rounded font-semibold hover:bg-red-600 transition-colors shadow flex items-center justify-center gap-2 mt-2"
          onClick={() => { logout(); navigate('/'); }}
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
};

export default Account;