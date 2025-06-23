import * as React from 'react';
import { useAuthStore } from '../store/auth';
import toast from 'react-hot-toast';

const Account = () => {
  const { user, logout } = useAuthStore();
  const [editMode, setEditMode] = React.useState(false);
  const [profile, setProfile] = React.useState({ name: user?.name || '', email: user?.email || '' });
  const [passwords, setPasswords] = React.useState({ current: '', new: '', confirm: '' });
  const [pwSuccess, setPwSuccess] = React.useState(false);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
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

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-12">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-lg w-full border border-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-blue-900">My Account</h1>
        <form onSubmit={handleProfileSave} className="mb-8 space-y-4">
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input name="name" value={profile.name} onChange={handleProfileChange} required className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input name="email" type="email" value={profile.email} onChange={handleProfileChange} required className="w-full border px-3 py-2 rounded" />
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
        <button onClick={logout} className="w-full bg-red-500 text-white py-2 rounded font-semibold hover:bg-red-600 transition-colors shadow">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Account;