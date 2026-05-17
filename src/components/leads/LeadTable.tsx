import React from 'react';
import type { Lead } from '@app-types/index';

interface LeadTableProps {
  leads: Lead[];
  onView: (lead: Lead) => void;
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
  isLoading: boolean;
}

export const LeadTable: React.FC<LeadTableProps> = ({ leads, onView, onEdit, onDelete, isLoading }) => {
  if (isLoading && leads.length === 0) {
    return <div className="text-center text-sm text-slate-500">Loading leads...</div>;
  }

  if (leads.length === 0) {
    return <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">No leads found.</div>;
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-700">
      <table className="w-full min-w-full divide-y divide-slate-200 dark:divide-slate-700">
        <thead className="bg-slate-100 text-left text-sm uppercase tracking-wide text-slate-500 dark:bg-slate-900 dark:text-slate-400">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Source</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-700 dark:bg-slate-900">
          {leads.map((lead) => (
            <tr key={lead.id} className="hover:bg-slate-50 dark:hover:bg-slate-800">
              <td className="px-4 py-4 text-sm text-slate-900 dark:text-white">{lead.name}</td>
              <td className="px-4 py-4 text-sm text-slate-500 dark:text-slate-300">{lead.email}</td>
              <td className="px-4 py-4 text-sm text-slate-500 dark:text-slate-300">{lead.status}</td>
              <td className="px-4 py-4 text-sm text-slate-500 dark:text-slate-300">{lead.source}</td>
              <td className="px-4 py-4 text-sm text-slate-500 dark:text-slate-300">
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => onView(lead)} className="text-primary-600 hover:underline">View</button>
                  <button onClick={() => onEdit(lead)} className="text-slate-600 hover:underline dark:text-slate-300">Edit</button>
                  <button onClick={() => onDelete(lead)} className="text-red-600 hover:underline">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
