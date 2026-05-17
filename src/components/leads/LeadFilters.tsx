import React from 'react';
import { Button, Input } from '@components/common/index';

interface LeadFiltersProps {
  filters: { search: string; status: string };
  onFiltersChange: (filters: { search: string; status: string }) => void;
  onReset: () => void;
  onExport: () => void;
  isLoading: boolean;
}

export const LeadFilters: React.FC<LeadFiltersProps> = ({ filters, onFiltersChange, onReset, onExport, isLoading }) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="grid gap-4 lg:grid-cols-[1fr_auto_auto] lg:items-end">
        <Input
          label="Search leads"
          name="search"
          value={filters.search}
          onChange={(event) => onFiltersChange({ ...filters, search: event.target.value })}
          placeholder="Search by name, email, source, or status"
        />

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-100">Status</span>
          <select
            name="status"
            value={filters.status}
            onChange={(event) => onFiltersChange({ ...filters, status: event.target.value })}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          >
            <option value="All">All</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Lost">Lost</option>
          </select>
        </label>

        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="secondary" onClick={onReset} disabled={isLoading}>
            Reset
          </Button>
          <Button type="button" onClick={onExport} disabled={isLoading}>
            Export CSV
          </Button>
        </div>
      </div>
    </div>
  );
};
