import * as React from 'react';
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const steps = [
  'Name',
  'Details',
  'Payment',
];

const Signup = () => {
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [referral, setReferral] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const { signup, loading, error, user } = useAuthStore();
  const navigate = useNavigate();
  const [formError, setFormError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Progress bar percentage
  const progress = (step - 1) / (steps.length - 1) * 100;

  // Animated step transitions
  const stepVariants = {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  const handleContinue = (e: FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (!firstName.trim() || !lastName.trim()) {
        setFormError('Please enter your first and last name.');
        return;
      }
      setFormError(null);
      setStep(2);
    } else if (step === 2) {
      if (!email.trim() || !phone.trim() || !password || !confirmPassword) {
        setFormError('Please fill in all required fields.');
        return;
      }
      if (password !== confirmPassword) {
        setFormError('Passwords do not match.');
        return;
      }
      setFormError(null);
      setStep(3);
    } else if (step === 3) {
      if (!paymentComplete) {
        setFormError('Please pay the activation fee to proceed.');
        return;
      }
      setFormError(null);
      handleSubmit(e);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await signup(`${firstName} ${lastName}`, email, password);
    if (useAuthStore.getState().user) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate('/dashboard');
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-12">
      {/* Progress Bar */}
      <div className="w-full max-w-md mb-4">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-blue-600 to-yellow-400 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      <form onSubmit={handleContinue} className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full space-y-6 border border-gray-100 relative">
        {/* Logo and Title */}
        <div className="flex flex-col items-center mb-2">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-2">
            <span className="text-white font-bold text-2xl">Z</span>
          </div>
          <h2 className="text-2xl font-bold text-blue-900">Join Zenith Agency</h2>
          <p className="text-blue-700 mt-1 text-sm">Start earning with just KSh 100 activation fee</p>
        </div>
        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg ${step === 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>1</div>
          <div className="h-1 w-8 bg-gray-300 rounded"></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg ${step === 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>2</div>
          <div className="h-1 w-8 bg-gray-300 rounded"></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg ${step === 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>3</div>
        </div>
        {/* Animated Steps */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="space-y-4">
              <div>
                <label className="block mb-1 font-medium" htmlFor="firstName">First Name</label>
                <input id="firstName" type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition" autoFocus />
              </div>
              <div>
                <label className="block mb-1 font-medium" htmlFor="lastName">Last Name</label>
                <input id="lastName" type="text" value={lastName} onChange={e => setLastName(e.target.value)} required className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition" />
              </div>
            </motion.div>
          )}
          {step === 2 && (
            <motion.div key="step2" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="space-y-4">
              <div>
                <label className="block mb-1 font-medium" htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className={`w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition ${email && !/^\S+@\S+\.\S+$/.test(email) ? 'border-red-400' : ''}`}
                  aria-invalid={email && !/^\S+@\S+\.\S+$/.test(email) ? 'true' : 'false'}
                  aria-describedby="emailHelp"
                />
                {email && !/^\S+@\S+\.\S+$/.test(email) && (
                  <span className="text-xs text-red-500" id="emailHelp">Enter a valid email address.</span>
                )}
              </div>
              <div>
                <label className="block mb-1 font-medium" htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  required
                  className={`w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition ${phone && !/^\d{10,}$/.test(phone) ? 'border-red-400' : ''}`}
                  aria-invalid={phone && !/^\d{10,}$/.test(phone) ? 'true' : 'false'}
                  aria-describedby="phoneHelp"
                  placeholder="e.g. 0712345678"
                />
                {phone && !/^\d{10,}$/.test(phone) && (
                  <span className="text-xs text-red-500" id="phoneHelp">Enter a valid phone number (at least 10 digits).</span>
                )}
              </div>
              <div className="relative">
                <label className="block mb-1 font-medium" htmlFor="password">
                  Password
                  <span className="ml-1 inline-block align-middle cursor-pointer group relative">
                    <svg className="w-4 h-4 text-blue-400 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01" /></svg>
                    <span className="absolute left-5 top-0 z-10 hidden group-hover:block bg-white border border-gray-200 text-xs text-gray-700 rounded px-2 py-1 shadow-lg w-48">Password must be at least 8 characters, include a number and a letter.</span>
                  </span>
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className={`w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition pr-10 ${password && !isStrongPassword(password) ? 'border-red-400' : ''}`}
                    aria-invalid={password && !isStrongPassword(password) ? 'true' : 'false'}
                    aria-describedby="passwordHelp"
                  />
                  <button type="button" tabIndex={-1} className="absolute right-2 top-2 text-gray-400" onClick={() => setShowPassword(v => !v)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.336-3.236.938-4.675M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    )}
                  </button>
                </div>
                {/* Password Strength Meter */}
                {password && (
                  <div className="mt-1 flex items-center gap-2">
                    <div className="flex-1 h-2 rounded bg-gray-200 overflow-hidden">
                      <div className={`h-2 rounded transition-all duration-300 ${getPasswordStrength(password).color}`} style={{ width: `${getPasswordStrength(password).percent}%` }}></div>
                    </div>
                    <span className={`text-xs font-semibold ${getPasswordStrength(password).textColor}`}>{getPasswordStrength(password).label}</span>
                  </div>
                )}
                {password && !isStrongPassword(password) && (
                  <span className="text-xs text-red-500" id="passwordHelp">Password is too weak.</span>
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
                    className={`w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition pr-10 ${confirmPassword && confirmPassword !== password ? 'border-red-400' : ''}`}
                    aria-invalid={confirmPassword && confirmPassword !== password ? 'true' : 'false'}
                    aria-describedby="confirmPasswordHelp"
                  />
                  <button type="button" tabIndex={-1} className="absolute right-2 top-2 text-gray-400" onClick={() => setShowConfirmPassword(v => !v)} aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}>
                    {showConfirmPassword ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.336-3.236.938-4.675M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    )}
                  </button>
                </div>
                {confirmPassword && confirmPassword !== password && (
                  <span className="text-xs text-red-500" id="confirmPasswordHelp">Passwords do not match.</span>
                )}
              </div>
              <div className="relative">
                <label className="block mb-1 font-medium" htmlFor="referral">
                  Referral Code (optional)
                  <span className="ml-1 inline-block align-middle cursor-pointer group relative">
                    <svg className="w-4 h-4 text-blue-400 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01" /></svg>
                    <span className="absolute left-5 top-0 z-10 hidden group-hover:block bg-white border border-gray-200 text-xs text-gray-700 rounded px-2 py-1 shadow-lg w-48">If you were referred, enter your code here for a bonus!</span>
                  </span>
                </label>
                <input
                  id="referral"
                  type="text"
                  value={referral}
                  onChange={e => setReferral(e.target.value)}
                  className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
                  aria-describedby="referralHelp"
                />
              </div>
              {/* Social Signup Buttons */}
              <div className="flex items-center my-2">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="mx-2 text-gray-400 text-xs">or</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>
              <div className="flex flex-col gap-2">
                <button type="button" className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded py-2 font-semibold hover:bg-gray-50 transition">
                  <svg className="h-5 w-5" viewBox="0 0 48 48"><g><circle fill="#fff" cx="24" cy="24" r="24"/><path fill="#4285F4" d="M35.3 24.2c0-.7-.1-1.4-.2-2H24v4.1h6.4c-.3 1.4-1.5 3.5-4.4 3.5-2.7 0-5-2.2-5-5s2.2-5 5-5c1.5 0 2.5.6 3.1 1.1l2.1-2.1C29.9 17.7 27.9 17 26 17c-5 0-9 4-9 9s4 9 9 9c5.2 0 8.7-3.7 8.7-8.7z"/><path fill="#34A853" d="M24 35c2.4 0 4.4-.8 5.9-2.1l-2.9-2.3c-.8.5-1.8.8-3 .8-2.3 0-4.2-1.6-4.9-3.7H12v2.3C13.6 32.9 18.4 35 24 35z"/><path fill="#FBBC05" d="M19.1 27.7c-.2-.5-.3-1-.3-1.7s.1-1.2.3-1.7v-2.3H12c-.5 1-1 2.1-1 3.3s.5 2.3 1 3.3l7.1-2.3z"/><path fill="#EA4335" d="M24 17c1.3 0 2.5.4 3.4 1.1l2.6-2.6C28.4 13.7 26.3 13 24 13c-5.6 0-10.4 2.1-13.1 5.7l7.1 2.3c.7-2.1 2.6-3.7 4.9-3.7z"/></g></svg>
                  Sign up with Google
                </button>
                <button type="button" className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded py-2 font-semibold hover:bg-gray-50 transition">
                  <svg className="h-5 w-5" viewBox="0 0 24 24"><path fill="#1877F2" d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 6.006 4.438 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.797c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.235 2.686.235v2.953h-1.513c-1.491 0-1.953.926-1.953 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.562 22.954 24 18.006 24 12z"/></svg>
                  Sign up with Facebook
                </button>
              </div>
            </motion.div>
          )}
          {step === 3 && (
            <motion.div key="step3" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col items-center space-y-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-blue-900 font-bold text-2xl">KSh</span>
                </div>
                <h3 className="text-2xl font-bold text-blue-900 mb-2">Pay KSh 100 Activation Fee</h3>
                <p className="text-gray-700 mb-4">A one-time activation fee is required to join Zenith Agency and start earning.</p>
              </div>
              {!paymentComplete ? (
                <button
                  type="button"
                  className="w-full bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-700 transition-colors shadow"
                  onClick={() => setPaymentComplete(true)}
                >
                  Simulate Payment (KSh 100)
                </button>
              ) : (
                <div className="w-full bg-green-100 text-green-800 py-2 rounded font-semibold text-center shadow">Payment Successful!</div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        {/* Error Message */}
        {(formError || error) && <div className="text-red-500 text-center text-sm">{formError || error}</div>}
        {/* Back Button */}
        {step > 1 && (
          <button type="button" onClick={handleBack} className="absolute left-6 top-6 text-blue-600 hover:underline text-sm">Back</button>
        )}
        {/* Continue/Submit Button */}
        <button type="submit" className="w-full bg-yellow-400 text-blue-900 py-2 rounded font-semibold hover:bg-yellow-300 transition-colors shadow mt-2" disabled={loading}>
          {loading ? 'Signing up...' : step === 1 ? 'Continue' : step === 2 ? 'Continue' : 'Sign Up'}
        </button>
        <div className="text-center text-sm">
          Already have an account? <a href="/login" className="text-blue-600 hover:underline">Sign in</a>
        </div>
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

function isStrongPassword(pw: string) {
  // At least 8 chars, 1 letter, 1 number
  return pw.length >= 8 && /[A-Za-z]/.test(pw) && /\d/.test(pw);
}

function getPasswordStrength(pw: string) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[a-z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return { label: 'Weak', color: 'bg-red-400', percent: 33, textColor: 'text-red-500' };
  if (score === 2) return { label: 'Fair', color: 'bg-yellow-400', percent: 60, textColor: 'text-yellow-600' };
  if (score === 3) return { label: 'Good', color: 'bg-blue-400', percent: 80, textColor: 'text-blue-600' };
  return { label: 'Strong', color: 'bg-green-500', percent: 100, textColor: 'text-green-600' };
}

export default Signup;