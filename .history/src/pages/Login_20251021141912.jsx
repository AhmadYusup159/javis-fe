import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LoadingSpinner from '@/components/LoadingSpinner';
import DarkModeToggle from '@/components/DarkModeToggle';
import { validateEmail } from '@/utils/validateEmail';

const Login = ({ isDark, setIsDark }) => {
  const navigate = useNavigate();
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email or Username is required';
    } else if (email.includes('@') && !validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await axios.post('http://127.0.0.1:4000/api/auth/login', {
        {email,
        password},
        { withCredentials: true }
      });

      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    }`}>
      <div className="absolute top-4 right-4">
        <DarkModeToggle isDark={isDark} setIsDark={setIsDark} />
      </div>

      <Card 
        data-testid="login-card"
        className={`w-full max-w-md shadow-2xl border-0 animate-fade-in backdrop-blur-sm ${
          isDark 
            ? 'bg-slate-800/90 text-white' 
            : 'bg-white/90'
        }`}
      >
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-2">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight">
            Welcome Back
          </CardTitle>
          <CardDescription className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className={isDark ? 'text-gray-200' : 'text-gray-700'}>
                Email or Username
              </Label>
              <Input
                data-testid="login-email-input"
                id="email"
                type="text"
                placeholder="Enter your email or username"
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                  if (errors.email) {
                    setErrors({ ...errors, email: '' });
                  }
                }}
                className={`transition-all duration-200 ${
                  errors.email 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'focus:ring-blue-500'
                } ${
                  isDark 
                    ? 'bg-slate-700 border-slate-600 text-white placeholder:text-gray-400' 
                    : 'bg-white border-gray-300'
                }`}
              />
              {errors.email && (
                <p data-testid="email-error" className="text-sm text-red-500 mt-1 animate-slide-in">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className={isDark ? 'text-gray-200' : 'text-gray-700'}>
                Password
              </Label>
              <div className="relative">
                <Input
                  data-testid="login-password-input"
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) {
                      setErrors({ ...errors, password: '' });
                    }
                  }}
                  className={`pr-10 transition-all duration-200 ${
                    errors.password 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'focus:ring-blue-500'
                  } ${
                    isDark 
                      ? 'bg-slate-700 border-slate-600 text-white placeholder:text-gray-400' 
                      : 'bg-white border-gray-300'
                  }`}
                />
                <button
                  data-testid="toggle-password-visibility"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${
                    isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <p data-testid="password-error" className="text-sm text-red-500 mt-1 animate-slide-in">
                  {errors.password}
                </p>
              )}
            </div>

            <Button
              data-testid="login-submit-button"
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <LoadingSpinner />
                  <span>Signing in...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                </div>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
