import * as React from 'react';
import { useState, type FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import toast from 'react-hot-toast';
import FormField from '../components/FormField';
import { FaSpinner } from 'react-icons/fa';

const demoUsers = [
  { phone: '+254700000000', password: 'demo123', label: 'Demo User' },
  { phone: '+254700000001', password: 'admin123', label: 'Admin User' },
  { phone: '+254700000002', password: 'test123', label: 'Test User' },
];

const Login = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, loading, error, user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setIsSubmitting(true);

    try {
      if (!isValidPhoneNumber(phone)) {
        setFormError('Please enter a valid phone number.');
        return;
      }

      await login(phone, password);
      
      if (useAuthStore.getState().user) {
        toast.success('Welcome back!');
        navigate('/dashboard');
      }
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    toast('Password reset feature coming soon!');
  };

  const handleSocialLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    toast('Social login coming soon!');
  };

  const handleDemoLogin = (demoUser: typeof demoUsers[0]) => {
    setPhone(demoUser.phone);
    setPassword(demoUser.password);
    toast.success(`Using ${demoUser.label} credentials`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-12">
      {/* Demo Users Section */}
      <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md w-full">
        <div className="font-semibold mb-3 text-blue-900">Quick Demo Login:</div>
        <div className="space-y-2">
          {demoUsers.map(u => (
            <button
              key={u.phone}
              onClick={() => handleDemoLogin(u)}
              className="w-full text-left p-2 rounded border border-blue-200 hover:bg-blue-100 transition-colors text-sm"
            >
              <div className="font-medium text-blue-800">{u.label}</div>
              <div className="text-blue-600 font-mono text-xs">{u.phone} / {u.password}</div>
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full space-y-6 border border-gray-100">
        <div className="flex flex-col items-center mb-2">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-2">
            <span className="text-white font-bold text-2xl">Z</span>
          </div>
          <h2 className="text-2xl font-bold text-blue-900">Sign in to Zenith Agency</h2>
          <p className="text-blue-700 mt-1 text-sm">Welcome back! Enter your credentials to continue.</p>
        </div>

        {(formError || error) && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
            {formError || error}
          </div>
        )}

        <div>
          <label className="block mb-1 font-medium text-gray-700">Mobile Number</label>
          <PhoneInput
            placeholder="Enter phone number"
            value={phone}
            onChange={value => setPhone(value || '')}
            defaultCountry="KE"
            international
            countryCallingCodeEditable={false}
            className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
            autoFocus
          />
        </div>

        <FormField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          isPassword
          helperText="Enter your account password"
          validation={{
            minLength: 3,
            custom: (value) => {
              if (value.length < 3) return 'Password must be at least 3 characters';
              return null;
            }
          }}
        />

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-blue-600 hover:underline text-sm"
          >
            Forgot password?
          </button>
        </div>

        <button 
          type="submit" 
          className="w-full bg-yellow-400 text-blue-900 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors shadow flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed" 
          disabled={loading || isSubmitting}
        >
          {loading || isSubmitting ? (
            <>
              <FaSpinner className="animate-spin" />
              Signing in...
            </>
          ) : (
            'Sign in'
          )}
        </button>

        <div className="flex items-center my-2">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="mx-2 text-gray-400 text-xs">or</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <div className="space-y-3">
          <button 
            type="button" 
            className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-3 font-semibold hover:bg-gray-50 transition-colors" 
            onClick={handleSocialLogin}
          >
            <svg className="h-5 w-5" viewBox="0 0 48 48">
              <g>
                <circle fill="#fff" cx="24" cy="24" r="24"/>
                <path fill="#4285F4" d="M35.3 24.2c0-.7-.1-1.4-.2-2H24v4.1h6.4c-.3 1.4-1.5 3.5-4.4 3.5-2.7 0-5-2.2-5-5s2.2-5 5-5c1.5 0 2.5.6 3.1 1.1l2.1-2.1C29.9 17.7 27.9 17 26 17c-5 0-9 4-9 9s4 9 9 9c5.2 0 8.7-3.7 8.7-8.7z"/>
                <path fill="#34A853" d="M24 35c2.4 0 4.4-.8 5.9-2.1l-2.9-2.3c-.8.5-1.8.8-3 .8-2.3 0-4.2-1.6-4.9-3.7H12v2.3C13.6 32.9 18.4 35 24 35z"/>
                <path fill="#FBBC05" d="M19.1 27.7c-.2-.5-.3-1-.3-1.7s.1-1.2.3-1.7v-2.3H12c-.5 1-1 2.1-1 3.3s.5 2.3 1 3.3l7.1-2.3z"/>
                <path fill="#EA4335" d="M24 17c1.3 0 2.5.4 3.4 1.1l2.6-2.6C28.4 13.7 26.3 13 24 13c-5.6 0-10.4 2.1-13.1 5.7l7.1 2.3c.7-2.1 2.6-3.7 4.9-3.7z"/>
              </g>
            </svg>
            Sign in with Google
          </button>
          <button 
            type="button" 
            className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-3 font-semibold hover:bg-gray-50 transition-colors" 
            onClick={handleSocialLogin}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path fill="#1877F2" d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 6.006 4.438 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.797c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.235 2.686.235v2.953h-1.513c-1.491 0-1.953.926-1.953 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.562 22.954 24 18.006 24 12z"/>
            </svg>
            Sign in with Facebook
          </button>
        </div>

        <div className="text-center text-sm">
          Don&apos;t have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign up</a>
        </div>
      </form>
    </div>
  );
};

export default Login;