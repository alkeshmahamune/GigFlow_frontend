import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, ErrorAlert, DarkModeToggle } from '@components/common/index';
import { useAuth } from '@hooks/index';
import { validateLoginForm } from '@utils/validation';
import type { ValidationError } from '@utils/validation';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading, error, isAuthenticated, clearError } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<ValidationError>({});

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    const validationErrors = validateLoginForm(formData.email, formData.password);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    await login(formData);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 px-4">
      {/* Dark Mode Toggle - Top Right */}
      <div className="fixed right-4 top-4">
        <DarkModeToggle />
      </div>

      <div className="w-full max-w-md">
        <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-slate-800">
          <div className="mb-8 text-center">
            <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-slate-900 dark:bg-white rounded-lg flex items-center justify-center">
              <span className="text-white dark:text-slate-900 font-bold text-lg">LD</span>
            </div>
            <span className="text-xl font-semibold text-slate-900 dark:text-white">
              Leads Dashboard
            </span>
          </div>
            {/* <h1 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">Leads Dashboard</h1> */}
            <p className="mt-2 text-slate-600 dark:text-slate-400 font-semibold text-xl">Sign in to your account</p>
          </div>

          {error && <ErrorAlert message={error} onClose={clearError} />}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              error={errors.email}
              required
            />

            <Input
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              error={errors.password}
              required
            />

              <Button type="submit" variant="primary" className="w-full" loading={isLoading}>
                Sign In
              </Button>
          </form>

          <p className="mt-4 text-center text-sm text-slate-600 dark:text-slate-400">
            Demo credentials: admin@example.com / password123
          </p>
        </div>
      </div>
    </div>
  );
};