import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@components/common/index';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
  isDangerous?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  isLoading = false,
  isDangerous = false,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="card w-full border border-gray-400 p-5 box-border rounded-2xl max-w-md animate-slide-in-up">
        <div className="flex items-center gap-4">
          {isDangerous && <AlertTriangle className="h-6 w-6 text-red-600" />}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{message}</p>
          </div>
        </div>

        <div className="mt-6 flex gap-3 border-t border-slate-200 pt-6 dark:border-slate-700">
          <Button variant="secondary" onClick={onCancel} disabled={isLoading} className="flex-1">
            Cancel
          </Button>
          <Button
            variant={isDangerous ? 'danger' : 'primary'}
            onClick={onConfirm}
            loading={isLoading}
            className="flex-1"
          >
            {isDangerous ? 'Delete' : 'Confirm'}
          </Button>
        </div>
      </div>
    </div>
  );
};
