import React from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full relative">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-blue-600 text-xl">&times;</button>
        {title && <h3 className="text-xl font-bold mb-4 text-blue-900">{title}</h3>}
        {children}
      </div>
    </div>
  );
};

export default Modal; 