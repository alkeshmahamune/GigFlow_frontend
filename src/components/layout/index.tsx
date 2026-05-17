import React from 'react';
import { DarkModeToggle } from '@components/common/index';

export const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <main className="relative min-h-screen bg-slate-50 p-6 dark:bg-slate-900">
    {/* Dark Mode Toggle - Top Right */}
    <div className="fixed right-4 top-4">
      <DarkModeToggle />
    </div>

    {children}
  </main>
);
