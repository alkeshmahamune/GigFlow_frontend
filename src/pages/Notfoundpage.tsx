import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@components/common/index';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-slate-900 dark:text-white">404</h1>
        <p className="mt-4 text-xl text-slate-600 dark:text-slate-400">Page not found</p>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          The page you are looking for does not exist.
        </p>
        <Link to="/dashboard" className="mt-8 inline-block">
          <Button variant="primary">Back to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
};