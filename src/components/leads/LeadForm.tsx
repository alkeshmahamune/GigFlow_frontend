import React, { useState } from 'react';
import { Button, Input } from '@components/common/index';
import type { CreateLeadRequest, Lead } from '@app-types/index';

interface LeadFormProps {
  lead?: Lead | null;
  isLoading?: boolean;
  onSubmit: (data: CreateLeadRequest) => Promise<void>;
  onCancel: () => void;
}

export const LeadForm: React.FC<LeadFormProps> = ({ lead, isLoading = false, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<CreateLeadRequest>({
    name: lead?.name ?? '',
    email: lead?.email ?? '',
    status: lead?.status ?? 'New',
    source: lead?.source ?? 'Website',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Lead name"
        required
      />
      <Input
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="lead@example.com"
        required
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-100">Status</span>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          >
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Lost">Lost</option>
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-100">Source</span>
          <input
            name="source"
            value={formData.source}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            required
          />
        </label>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isLoading} className="w-full sm:w-auto">
          Cancel
        </Button>
        <Button type="submit" loading={isLoading} className="w-full sm:w-auto">
          Save Lead
        </Button>
      </div>
    </form>
  );
};
