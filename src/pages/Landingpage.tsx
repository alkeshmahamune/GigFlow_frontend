import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, DarkModeToggle } from '@components/common/index';
import { useAuth } from '@hooks/index';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const roles = [
    {
      id: 'admin',
      title: 'Admin',
      description: 'Manage leads and team members',
      icon: '👨‍💼',
    },
    {
      id: 'sales',
      title: 'Sales Agent',
      description: 'Manage your assigned leads',
      icon: '📞',
    },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 px-4">
      {/* Dark Mode Toggle - Top Right */}
      <div className="fixed right-4 top-4">
        <DarkModeToggle />
      </div>

      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white md:text-5xl">
            Welcome to Leads Dashboard
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Manage your leads efficiently and grow your business
          </p>
        </div>

        {/* Role Selection */}
        <div className="mb-8 grid gap-6 md:grid-cols-3">
          {roles.map((role) => (
            <div
              key={role.id}
              className="rounded-lg bg-white p-6 shadow-lg transition hover:shadow-xl dark:bg-slate-800"
            >
              <div className="mb-4 text-4xl">{role.icon}</div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">
                {role.title}
              </h3>
              <p className="mb-6 text-sm text-slate-600 dark:text-slate-400">
                {role.description}
              </p>
              <div className="space-y-3">
                <Button
                  onClick={() => navigate(`/login?role=${role.id}`)}
                  variant="primary"
                  className="w-full"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => navigate(`/register?role=${role.id}`)}
                  variant="secondary"
                  className="w-full"
                >
                  Create Account
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Demo credentials: admin@example.com / password123
          </p>
        </div>
      </div>
    </div>
  );
};
