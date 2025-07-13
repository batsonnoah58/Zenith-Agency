import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import useToast from '../hooks/useToast';
import Card from '../components/Card';
import Button from '../components/Button';
import FormField from '../components/FormField';
import { FaSpinner } from 'react-icons/fa';

const Signup = () => {
  const navigate = useNavigate();
  const { signup, loading, error } = useAuthStore();
  const showToast = useToast();
  const [formData, setFormData] = React.useState({
    name: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [validationErrors, setValidationErrors] = React.useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
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
    
    if (!formData.confirmPassword.trim()) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
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
      await signup(formData.name, formData.phone, formData.password);
      showToast('Account created successfully!', 'success');
      navigate('/dashboard');
    } catch (err) {
      showToast('Signup failed. Please try again.', 'error');
    }
  };

  const handleDemoSignup = async (name: string, phone: string, password: string) => {
    setFormData({ name, phone, password, confirmPassword: password });
    try {
      await signup(name, phone, password);
      showToast('Demo signup successful!', 'success');
      navigate('/dashboard');
    } catch (err) {
      showToast('Demo signup failed.', 'error');
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600">Join Zenith Agency and start earning</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField
            label="Full Name"
            type="text"
            value={formData.name}
            onChange={handleInputChange('name')}
            placeholder="Enter your full name"
            error={validationErrors.name}
            required
          />

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

          <FormField
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={handleInputChange('confirmPassword')}
            placeholder="Confirm your password"
            error={validationErrors.confirmPassword}
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
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </Button>
        </form>

        {/* Demo Signup Buttons */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-3 text-center">Try demo accounts:</p>
          <div className="grid grid-cols-1 gap-2">
            <Button
              onClick={() => handleDemoSignup('Demo User', '+254700000000', 'demo123')}
              className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors text-sm"
              disabled={loading}
            >
              Demo User
            </Button>
            <Button
              onClick={() => handleDemoSignup('Admin User', '+254700000001', 'admin123')}
              className="w-full bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors text-sm"
              disabled={loading}
            >
              Admin User
            </Button>
            <Button
              onClick={() => handleDemoSignup('Test User', '+254700000002', 'test123')}
              className="w-full bg-orange-600 text-white py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors text-sm"
              disabled={loading}
            >
              Test User
            </Button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Sign in</Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Signup;