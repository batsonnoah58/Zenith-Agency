import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import useToast from '../hooks/useToast';
import Card from '../components/Card';
import Button from '../components/Button';
import FormField from '../components/FormField';
import { FaSpinner } from 'react-icons/fa';

const Login = () => {
  const navigate = useNavigate();
  const { login, loading, error } = useAuthStore();
  const showToast = useToast();
  const [formData, setFormData] = React.useState({
    phone: '',
    password: '',
  });
  const [validationErrors, setValidationErrors] = React.useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\+254\d{9}$/.test(formData.phone)) {
      errors.phone = 'Phone number must be in format +254XXXXXXXXX';
    }
    
    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await login(formData.phone, formData.password);
      showToast('Login successful!', 'success');
      navigate('/dashboard');
    } catch (err) {
      showToast('Login failed. Please check your credentials.', 'error');
    }
  };

  const handleDemoLogin = async (phone: string, password: string) => {
    setFormData({ phone, password });
    try {
      await login(phone, password);
      showToast('Demo login successful!', 'success');
      navigate('/dashboard');
    } catch (err) {
      showToast('Demo login failed.', 'error');
    }
  };

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-12">
      <Card className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full border border-gray-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-blue-600 font-bold text-2xl">Z</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your Zenith Agency account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField
            label="Phone Number"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange('phone')}
            placeholder="+254700000000"
            error={validationErrors.phone}
            required
          />

          <FormField
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleInputChange('password')}
            placeholder="Enter your password"
            error={validationErrors.password}
            required
            isPassword
          />

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>

        {/* Demo Login Buttons */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-3 text-center">Try demo accounts:</p>
          <div className="grid grid-cols-1 gap-2">
            <Button
              onClick={() => handleDemoLogin('+254700000000', 'demo123')}
              className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors text-sm"
              disabled={loading}
            >
              Demo User
            </Button>
            <Button
              onClick={() => handleDemoLogin('+254700000001', 'admin123')}
              className="w-full bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors text-sm"
              disabled={loading}
            >
              Admin User
            </Button>
            <Button
              onClick={() => handleDemoLogin('+254700000002', 'test123')}
              className="w-full bg-orange-600 text-white py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors text-sm"
              disabled={loading}
            >
              Test User
            </Button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don&apos;t have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login;