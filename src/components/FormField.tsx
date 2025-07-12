import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  success?: string;
  helperText?: string;
  isPassword?: boolean;
  required?: boolean;
  validation?: {
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
    custom?: (value: string) => string | null;
  };
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  success,
  helperText,
  isPassword = false,
  required = false,
  validation,
  className = '',
  onChange,
  onBlur,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Clear local error when user starts typing
    if (localError) {
      setLocalError(null);
    }

    // Real-time validation
    if (validation) {
      const validationError = validateField(value, validation);
      if (validationError) {
        setLocalError(validationError);
      }
    }

    onChange?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    
    // Final validation on blur
    if (validation) {
      const validationError = validateField(e.target.value, validation);
      if (validationError) {
        setLocalError(validationError);
      }
    }

    onBlur?.(e);
  };

  const validateField = (value: string, validation: FormFieldProps['validation']): string | null => {
    if (required && !value.trim()) {
      return `${label} is required`;
    }

    if (validation?.minLength && value.length < validation.minLength) {
      return `${label} must be at least ${validation.minLength} characters`;
    }

    if (validation?.maxLength && value.length > validation.maxLength) {
      return `${label} must be no more than ${validation.maxLength} characters`;
    }

    if (validation?.pattern && !validation.pattern.test(value)) {
      return `${label} format is invalid`;
    }

    if (validation?.custom) {
      return validation.custom(value);
    }

    return null;
  };

  const displayError = error || localError;
  const hasError = !!displayError;
  const hasSuccess = !!success;

  return (
    <div className="mb-4">
      <label 
        htmlFor={props.id} 
        className={`block text-sm font-medium mb-2 ${
          hasError ? 'text-red-600' : hasSuccess ? 'text-green-600' : 'text-gray-700'
        }`}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="relative">
        <input
          {...props}
          type={isPassword && !showPassword ? 'password' : props.type || 'text'}
          className={`
            w-full px-3 py-2 border rounded-lg transition-all duration-200
            ${isFocused ? 'ring-2 ring-blue-200' : ''}
            ${hasError 
              ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-200' 
              : hasSuccess 
                ? 'border-green-300 bg-green-50 focus:border-green-400 focus:ring-green-200'
                : 'border-gray-300 focus:border-blue-400 focus:ring-blue-200'
            }
            ${className}
          `}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          aria-describedby={`${props.id}-helper ${props.id}-error`}
          aria-invalid={hasError}
        />
        
        {/* Password toggle */}
        {isPassword && (
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
          </button>
        )}

        {/* Status icons */}
        {hasError && (
          <FaExclamationCircle 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500" 
            size={16} 
          />
        )}
        {hasSuccess && !hasError && (
          <FaCheckCircle 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500" 
            size={16} 
          />
        )}
      </div>

      {/* Helper text */}
      {helperText && (
        <p id={`${props.id}-helper`} className="mt-1 text-sm text-gray-500">
          {helperText}
        </p>
      )}

      {/* Error message */}
      {displayError && (
        <p id={`${props.id}-error`} className="mt-1 text-sm text-red-600 flex items-center">
          <FaExclamationCircle className="mr-1" size={12} />
          {displayError}
        </p>
      )}

      {/* Success message */}
      {success && (
        <p className="mt-1 text-sm text-green-600 flex items-center">
          <FaCheckCircle className="mr-1" size={12} />
          {success}
        </p>
      )}
    </div>
  );
};

export default FormField; 