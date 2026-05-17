import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Input, Button, ErrorAlert, DarkModeToggle } from '@components/common/index';
import { useAuth } from '@hooks/index';
import { validateRegisterForm } from '@utils/validation';
import type { ValidationError } from '@utils/validation';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { register, isLoading, error, isAuthenticated, clearError } = useAuth();

  const [role, setRole] = useState('sales');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<ValidationError>({});

  useEffect(() => {
    const requestedRole = searchParams.get('role');
    if (requestedRole === 'admin' || requestedRole === 'sales') {
      setRole(requestedRole);
    }
  }, [searchParams]);

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

    const validationErrors = validateRegisterForm(
      formData.name,
      formData.email,
      formData.password,
      formData.confirmPassword
    );

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    await register(
      {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      },
      role
    );
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
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary-600">
              <span className="text-xl font-bold text-white">L</span>
            </div>
            <h1 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">Leads Dashboard</h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">Create a new account</p>
          </div>

          {error && <ErrorAlert message={error} onClose={clearError} />}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              error={errors.name}
              required
            />

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
              placeholder="At least 6 characters"
              error={errors.password}
              required
            />

            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              error={errors.confirmPassword}
              required
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-100">Register as</label>
              <select
                value={role}
                onChange={(event) => setRole(event.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              >
                <option value="sales">Sales</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <Button type="submit" variant="primary" className="w-full" loading={isLoading}>
              Create Account
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-slate-600 dark:text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};