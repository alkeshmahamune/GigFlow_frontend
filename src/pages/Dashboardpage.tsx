import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { MainLayout } from '@components/layout/index';
import {
  Button,
  Loading,
  ErrorAlert,
  Card,
  CardHeader,
} from '@components/common/index';
import {
  LeadTable,
  LeadFilters,
  Pagination,
  LeadModal,
  LeadDetails,
  ConfirmModal,
} from '@components/leads/index';
import { useLeads } from '@hooks/index';
import { exportLeadsToCSV } from '@utils/csv';
import type { Lead, CreateLeadRequest, UpdateLeadRequest } from '@app-types/index';

export const DashboardPage: React.FC = () => {
  const {
    leads,
    isLoading,
    error,
    pagination,
    filters,
    fetchLeads,
    createLead,
    updateLead,
    deleteLead,
    setFilters,
    setPage,
    resetFilters,
    clearError,
  } = useLeads();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const handleCreateLead = async (data: CreateLeadRequest) => {
    setModalLoading(true);
    try {
      const success = await createLead(data);
      if (success) {
        setIsCreateModalOpen(false);
      }
    } finally {
      setModalLoading(false);
    }
  };

  const handleUpdateLead = async (data: UpdateLeadRequest) => {
    if (!selectedLead) return;
    setModalLoading(true);
    try {
      const success = await updateLead(selectedLead.id, data);
      if (success) {
        setIsEditModalOpen(false);
        setSelectedLead(null);
      }
    } finally {
      setModalLoading(false);
    }
  };

  const handleDeleteLead = async () => {
    if (!selectedLead) return;
    setModalLoading(true);
    try {
      const success = await deleteLead(selectedLead.id);
      if (success) {
        setIsDeleteConfirmOpen(false);
        setSelectedLead(null);
      }
    } finally {
      setModalLoading(false);
    }
  };

  const handleViewLead = (lead: Lead) => {
    setSelectedLead(lead);
    setIsDetailsOpen(true);
  };

  const handleEditLead = (lead: Lead) => {
    setSelectedLead(lead);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (lead: Lead) => {
    setSelectedLead(lead);
    setIsDeleteConfirmOpen(true);
  };

  const handleExportCSV = () => {
    if (leads.length > 0) {
      exportLeadsToCSV(leads, `leads-${new Date().toISOString().split('T')[0]}.csv`);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Leads Management</h1>
            <p className="mt-1 text-slate-600 dark:text-slate-400">Manage and track your sales leads</p>
          </div>
          <Button variant="primary" onClick={() => setIsCreateModalOpen(true)} className="flex items-center gap-2">
            <Plus size={20} />
            New Lead
          </Button>
        </div>

        {/* Error Alert */}
        {error && <ErrorAlert message={error} onClose={clearError} />}

        {/* Filters */}
        <LeadFilters
          filters={filters}
          onFiltersChange={setFilters}
          onReset={resetFilters}
          onExport={handleExportCSV}
          isLoading={isLoading}
        />

        {/* Loading State */}
        {isLoading && leads.length === 0 ? (
          <Loading message="Loading leads..." />
        ) : (
          <>
            {/* Table */}
            <Card>
              <CardHeader
                title="All Leads"
                description={`Showing ${leads.length} of ${pagination.totalRecords} leads`}
              />
              <LeadTable
                leads={leads}
                onView={handleViewLead}
                onEdit={handleEditLead}
                onDelete={handleDeleteClick}
                isLoading={isLoading}
              />
            </Card>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <Pagination pagination={pagination} onPageChange={setPage} />
            )}
          </>
        )}
      </div>

      {/* Modals */}
      <LeadModal
        isOpen={isCreateModalOpen}
        onSubmit={handleCreateLead}
        onClose={() => setIsCreateModalOpen(false)}
        isLoading={modalLoading}
      />

      <LeadModal
        isOpen={isEditModalOpen}
        lead={selectedLead}
        onSubmit={handleUpdateLead}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedLead(null);
        }}
        isLoading={modalLoading}
      />

      <LeadDetails isOpen={isDetailsOpen} lead={selectedLead} onClose={() => setIsDetailsOpen(false)} />

      <ConfirmModal
        isOpen={isDeleteConfirmOpen}
        title="Delete Lead"
        message={`Are you sure you want to delete "${selectedLead?.name}"? This action cannot be undone.`}
        onConfirm={handleDeleteLead}
        onCancel={() => {
          setIsDeleteConfirmOpen(false);
          setSelectedLead(null);
        }}
        isLoading={modalLoading}
        isDangerous
      />
    </MainLayout>
  );
};