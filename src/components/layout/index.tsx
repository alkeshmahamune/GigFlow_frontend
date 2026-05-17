import React from 'react';

export const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <main className="min-h-screen bg-slate-50 p-6 dark:bg-slate-900">
    {children}
  </main>
);
