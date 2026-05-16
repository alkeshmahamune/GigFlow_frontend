import React from 'react';
import { X } from 'lucide-react';
import { Card } from '@components/common/index';
import { Badge } from '@components/common/index';
import { formatDateTime } from '@utils/date';
import type { Lead } from '@types/index';

interface LeadDetailsProps {
  isOpen: boolean;
  lead: Lead | null;
  onClose: () => void;
}

export const LeadDetails: React.FC<LeadDetailsProps> = ({ isOpen, lead, onClose }) => {
  if (!isOpen || !lead) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <Card className="w-full max-w-md animate-slide-in-up">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Lead Details</h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
          >
            <X size={24} />
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Name</p>
            <p className="mt-1 text-base text-slate-900 dark:text-white">{lead.name}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Email</p>
            <p className="mt-1 text-base text-slate-900 dark:text-white">{lead.email}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Status</p>
            <div className="mt-1">
              <Badge variant="status" value={lead.status}>
                {lead.status}
              </Badge>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Source</p>
            <div className="mt-1">
              <Badge variant="source" value={lead.source}>
                {lead.source}
              </Badge>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Created At</p>
            <p className="mt-1 text-base text-slate-900 dark:text-white">{formatDateTime(lead.createdAt)}</p>
          </div>

          {lead.updatedAt && (
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Last Updated</p>
              <p className="mt-1 text-base text-slate-900 dark:text-white">{formatDateTime(lead.updatedAt)}</p>
            </div>
          )}
        </div>

        <div className="mt-6 border-t border-slate-200 pt-6 dark:border-slate-700">
          <button
            onClick={onClose}
            className="btn btn-secondary w-full"
          >
            Close
          </button>
        </div>
      </Card>
    </div>
  );
};
