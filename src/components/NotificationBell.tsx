import React, { useState } from 'react';
import { FaBell } from 'react-icons/fa';

const mockNotifications = [
  { id: 1, message: 'You received a new referral bonus!', read: false },
  { id: 2, message: 'Admin: System maintenance at 10pm.', read: false },
  { id: 3, message: 'Your withdrawal is being processed.', read: true },
];

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="relative inline-block text-left">
      <button
        className="relative focus:outline-none"
        onClick={() => setOpen(!open)}
        aria-label="Notifications"
      >
        <FaBell className="text-2xl text-blue-700" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">{unreadCount}</span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg z-50 border border-gray-200">
          <div className="p-3 border-b font-semibold text-blue-900">Notifications</div>
          <ul className="max-h-60 overflow-y-auto">
            {notifications.length === 0 && (
              <li className="p-3 text-gray-500 text-sm">No notifications</li>
            )}
            {notifications.map(n => (
              <li key={n.id} className={`p-3 border-b last:border-b-0 text-sm ${n.read ? 'text-gray-500' : 'text-blue-900 font-medium'}`}>{n.message}</li>
            ))}
          </ul>
          <button
            className="w-full text-center py-2 text-xs text-blue-600 hover:bg-blue-50 border-t rounded-b-lg"
            onClick={markAllAsRead}
          >
            Mark all as read
          </button>
        </div>
      )}
    </div>
  );
} 