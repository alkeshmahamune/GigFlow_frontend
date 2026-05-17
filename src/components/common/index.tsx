import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  loading?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  loading = false,
  className = '',
  disabled,
  children,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500';
  const variantStyles =
    variant === 'secondary'
      ? 'bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600'
      : variant === 'danger'
      ? 'bg-red-600 text-white hover:bg-red-700'
      : 'bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-400';

  return (
    <button
      type="button"
      disabled={disabled || loading}
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
};

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => (
  <label className="block">
    <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-100">{label}</span>
    <input
      className={`w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-200 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white ${className}`}
      {...props}
    />
    {error && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>}
  </label>
);

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Card: React.FC<CardProps> = ({ className = '', children, ...props }) => (
  <div className={`rounded-3xl bg-white p-6 shadow-lg dark:bg-slate-800 ${className}`} {...props}>
    {children}
  </div>
);

export const CardHeader: React.FC<{ title: string; description?: string; className?: string }> = ({ title, description, className = '' }) => (
  <div className={`mb-4 ${className}`}>
    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
    {description && <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>}
  </div>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = '', ...props }) => (
  <div className={`space-y-4 ${className}`} {...props}>
    {children}
  </div>
);

export const Badge: React.FC<{ variant?: 'status' | 'source'; children: React.ReactNode }> = ({ variant = 'status', children }) => {
  const styles =
    variant === 'source'
      ? 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-100'
      : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200';

  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${styles}`}>{children}</span>;
};

export const ErrorAlert: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => (
  <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-700 dark:bg-red-950 dark:text-red-200">
    <div className="flex items-center justify-between gap-4">
      <p>{message}</p>
      <button onClick={onClose} className="font-semibold underline">
        Close
      </button>
    </div>
  </div>
);

export const Loading: React.FC<{ message?: string }> = ({ message = 'Loading...' }) => (
  <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
    {message}
  </div>
);
