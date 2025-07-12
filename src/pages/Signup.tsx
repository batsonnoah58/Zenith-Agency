import * as React from 'react';
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const demoUsers = [
  { phone: '+254700000000', password: 'demo123', label: 'Demo User' },
  { phone: '+254700000001', password: 'admin123', label: 'Admin User' },
  { phone: '+254700000002', password: 'test123', label: 'Test User' },
];
const demoInvitation = 'INVITE123';

const steps = [
  'Name',
  'Details',
  'Password',
];

const Signup = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signup, loading, error, user } = useAuthStore();
  const navigate = useNavigate();
  const [formError, setFormError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [verificationCode, setVerificationCode] = useState(generateVerificationCode());
  const [inputVerification, setInputVerification] = useState('');
  const [invitationCode, setInvitationCode] = useState('');

  // Generate a more complex verification code (captcha-like)
  function generateVerificationCode(length = 6) {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%';
    let code = '';
    for (let i = 0; i < length; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  // Generate a simple verification code (captcha-like)
  React.useEffect(() => {
    setVerificationCode(Math.random().toString(36).substring(2, 8).toUpperCase());
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!phone.trim() || !password || !confirmPassword || !inputVerification.trim() || !invitationCode.trim()) {
      setFormError('Please fill in all required fields.');
      return;
    }
    if (password !== confirmPassword) {
      setFormError('Passwords do not match.');
      return;
    }
    if (inputVerification !== verificationCode) {
      setFormError('Verification code is incorrect.');
      return;
    }
    if (!isValidPhoneNumber(phone)) {
      setFormError('Please enter a valid phone number.');
      return;
    }
    setFormError(null);
    const fullPhone = phone;
    await signup(fullPhone, fullPhone, password); // Use phone as name and email placeholder
    if (useAuthStore.getState().user) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate('/dashboard');
      }, 2000);
    }
  };

  React.useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  function isStrongPassword(pw: string) {
    return pw.length >= 6 && /[A-Z]/.test(pw) && /[0-9]/.test(pw);
  }
  function getPasswordStrength(pw: string) {
    if (pw.length < 6) return 'Too short';
    if (!/[A-Z]/.test(pw)) return 'Add uppercase letter';
    if (!/[0-9]/.test(pw)) return 'Add a number';
    return 'Strong';
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-12">
      {/* Demo Users Section */}
      <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md w-full text-xs text-blue-900">
        <div className="font-semibold mb-1">Demo Accounts for Testing:</div>
        <ul className="list-disc ml-5">
          {demoUsers.map(u => (
            <li key={u.phone}><span className="font-mono">{u.phone}</span> / <span className="font-mono">{u.password}</span> <span className="text-gray-500">({u.label})</span></li>
          ))}
        </ul>
        <div className="mt-2">Sample Invitation Code: <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">{demoInvitation}</span></div>
      </div>
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full space-y-6 border border-gray-100 relative">
        {/* Logo and Title */}
        <div className="flex flex-col items-center mb-2">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-2">
            <span className="text-white font-bold text-2xl">Z</span>
          </div>
          <h2 className="text-2xl font-bold text-blue-900">Join Zenith Agency</h2>
          <p className="text-blue-700 mt-1 text-sm">Sign up for free and start earning today!</p>
        </div>
        {/* Animated Steps */}
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium" htmlFor="phone">Mobile Number</label>
            <PhoneInput
              placeholder="Enter phone number"
              value={phone}
              onChange={value => setPhone(value || '')}
              defaultCountry="KE"
              international
              countryCallingCodeEditable={false}
              className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
            />
          </div>
          <div className="relative">
            <label className="block mb-1 font-medium" htmlFor="password">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className={`w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition pr-10`}
              />
              <button type="button" tabIndex={-1} className="absolute right-2 top-2 text-gray-400" onClick={() => setShowPassword(v => !v)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                )}
              </button>
            </div>
            {/* Password Strength Meter */}
            {password && (
              <div className={`text-xs mt-1 ${getPasswordStrength(password) === 'Strong' ? 'text-green-600' : 'text-orange-500'}`}>Password strength: {getPasswordStrength(password)}</div>
            )}
          </div>
          <div className="relative">
            <label className="block mb-1 font-medium" htmlFor="confirmPassword">Confirm Password</label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                className={`w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition pr-10`}
              />
              <button type="button" tabIndex={-1} className="absolute right-2 top-2 text-gray-400" onClick={() => setShowConfirmPassword(v => !v)} aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}>
                {showConfirmPassword ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                )}
              </button>
            </div>
          </div>
          <div>
            <label className="block mb-1 font-medium" htmlFor="verification">Verification Code</label>
            <div className="flex items-center gap-2">
              <input
                id="verification"
                type="text"
                value={inputVerification}
                onChange={e => setInputVerification(e.target.value)}
                required
                className="w-1/2 border px-3 py-2 rounded focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition uppercase"
                placeholder="Enter code"
                autoComplete="off"
              />
              <span className="select-none">
                <svg width="120" height="40" viewBox="0 0 120 40" className="bg-gray-100 rounded shadow" style={{ display: 'block' }}>
                  {/* Noisy background */}
                  <defs>
                    <pattern id="noise" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
                      <circle cx="1" cy="1" r="0.5" fill="#cbd5e1" />
                      <circle cx="3" cy="3" r="0.5" fill="#e0e7ef" />
                    </pattern>
                  </defs>
                  <rect width="120" height="40" fill="url(#noise)" />
                  {/* Render each char with random style */}
                  {Array.from(verificationCode).map((char, i) => {
                    const x = 15 + i * 16 + Math.random() * 2;
                    const y = 24 + Math.random() * 6;
                    const rotate = (Math.random() - 0.5) * 40;
                    const skew = (Math.random() - 0.5) * 20;
                    const colors = ['#1e293b', '#334155', '#0ea5e9', '#f59e42', '#e11d48', '#16a34a'];
                    const color = colors[Math.floor(Math.random() * colors.length)];
                    return (
                      <text
                        key={i}
                        x={x}
                        y={y}
                        fontSize="22"
                        fontFamily="monospace"
                        fill={color}
                        transform={`rotate(${rotate} ${x} ${y}) skewX(${skew})`}
                        style={{ fontWeight: 700, userSelect: 'none' }}
                      >
                        {char}
                      </text>
                    );
                  })}
                  {/* Add some random lines for extra noise */}
                  {Array.from({ length: 4 }).map((_, i) => (
                    <line
                      key={i}
                      x1={Math.random() * 120}
                      y1={Math.random() * 40}
                      x2={Math.random() * 120}
                      y2={Math.random() * 40}
                      stroke="#64748b"
                      strokeWidth={Math.random() * 1.5 + 0.5}
                      opacity={0.3 + Math.random() * 0.3}
                    />
                  ))}
                </svg>
              </span>
              <button type="button" className="ml-2 text-xs text-blue-600 underline" onClick={() => setVerificationCode(generateVerificationCode())}>Refresh</button>
            </div>
          </div>
          <div>
            <label className="block mb-1 font-medium" htmlFor="invitation">Invitation Code</label>
            <input
              id="invitation"
              type="text"
              value={invitationCode}
              onChange={e => setInvitationCode(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
              placeholder="Enter invitation code"
            />
          </div>
        </div>
        {/* Error Message */}
        {(formError || error) && <div className="text-red-500 text-center text-sm">{formError || error}</div>}
        {/* Continue/Submit Button */}
        <button type="submit" className="w-full bg-yellow-400 text-blue-900 py-2 rounded font-semibold hover:bg-yellow-300 transition-colors shadow mt-2" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
        <div className="text-center text-sm">
          Already have an account? <a href="/login" className="text-blue-600 hover:underline">Sign in</a>
        </div>
        {/* Add a note that signup is free */}
        <div className="text-center text-green-600 font-semibold text-sm mb-2">Sign up is 100% free!</div>
      </form>
      {/* Success Toast/Modal */}
      {showSuccess && (
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }} className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black/30">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center border border-gray-100">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-green-700 mb-2">Signup Successful!</h3>
            <p className="text-gray-700 mb-4">Welcome to Zenith Agency. Redirecting to your dashboard...</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Signup;