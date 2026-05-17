import type { Lead } from '@app-types/index';

export function exportLeadsToCSV(leads: Lead[], filename: string) {
  const header = ['Name', 'Email', 'Status', 'Source', 'Created At', 'Updated At'];
  const rows = leads.map((lead) => [
    lead.name,
    lead.email,
    lead.status,
    lead.source,
    lead.createdAt,
    lead.updatedAt || '',
  ]);

  const csvContent = [header, ...rows]
    .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(','))
    .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', filename);
  link.click();
  URL.revokeObjectURL(link.href);
}
