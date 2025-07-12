import React, { useState } from 'react';

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-blue-900">Settings</h1>
      {/* Profile Photo Upload */}
      <div className="bg-white rounded-lg shadow p-4 mb-4 flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-blue-200 flex items-center justify-center text-4xl font-bold text-blue-800 mb-2">
          {/* Show preview if photo selected */}
          {photo ? (
            <img src={URL.createObjectURL(photo)} alt="Profile" className="w-20 h-20 rounded-full object-cover" />
          ) : (
            <span>P</span>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          className="mb-2"
          onChange={e => setPhoto(e.target.files?.[0] || null)}
        />
        <span className="text-xs text-gray-500">Profile Photo (UI only)</span>
      </div>
      {/* Change Password */}
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <div className="font-semibold mb-2">Change Password</div>
        <form className="space-y-2">
          <input
            type="password"
            placeholder="Current Password"
            className="w-full border px-3 py-2 rounded"
            value={currentPw}
            onChange={e => setCurrentPw(e.target.value)}
          />
          <input
            type="password"
            placeholder="New Password"
            className="w-full border px-3 py-2 rounded"
            value={newPw}
            onChange={e => setNewPw(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="w-full border px-3 py-2 rounded"
            value={confirmPw}
            onChange={e => setConfirmPw(e.target.value)}
          />
          <button type="button" className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition-colors shadow text-sm">Change Password</button>
        </form>
      </div>
      {/* Notification Preferences */}
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <div className="font-semibold mb-2">Notification Preferences</div>
        <div className="flex items-center justify-between mb-2">
          <span>Email Notifications</span>
          <input type="checkbox" checked={emailNotif} onChange={() => setEmailNotif(!emailNotif)} className="form-checkbox h-5 w-5 text-blue-600" />
        </div>
        <div className="flex items-center justify-between mb-2">
          <span>SMS Notifications</span>
          <input type="checkbox" checked={smsNotif} onChange={() => setSmsNotif(!smsNotif)} className="form-checkbox h-5 w-5 text-blue-600" />
        </div>
      </div>
      {/* Dark Mode Toggle */}
      <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
        <span className="font-semibold">Dark Mode</span>
        <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} className="form-checkbox h-5 w-5 text-blue-600" />
      </div>
    </div>
  );
} 