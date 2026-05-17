import React from 'react';
import { X } from 'lucide-react';
import { Card } from '@components/common/index';
import { LeadForm } from './LeadForm';
import type { Lead, CreateLeadRequest, UpdateLeadRequest } from '@app-types/index';

interface LeadModalProps {
  isOpen: boolean;
  lead?: Lead | null;
  isLoading?: boolean;
  onSubmit: (data: CreateLeadRequest | UpdateLeadRequest) => Promise<void>;
  onClose: () => void;
}

export const LeadModal: React.FC<LeadModalProps> = ({ isOpen, lead, isLoading = false, onSubmit, onClose }) => {
  if (!isOpen) {
    return null;
  }

  const title = lead ? `Edit Lead: ${lead.name}` : 'Create New Lead';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <Card className="w-full max-w-md animate-slide-in-up">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{title}</h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
          >
            <X size={24} />
          </button>
        </div>

        <div className="mt-6">
          <LeadForm
            key={lead?.id ?? 'new-lead'}
            lead={lead}
            isLoading={isLoading}
            onSubmit={onSubmit}
            onCancel={onClose}
          />
        </div>
      </Card>
    </div>
  );
};
