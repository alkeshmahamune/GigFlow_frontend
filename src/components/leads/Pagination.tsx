import React from 'react';

interface PaginationProps {
  pagination: {
    page: number;
    totalPages: number;
    totalRecords: number;
  };
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ pagination, onPageChange }) => {
  const { page, totalPages, totalRecords } = pagination;

  if (totalPages <= 1) {
    return null;
  }

  const handlePrevious = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      onPageChange(page + 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white px-4 py-4 text-sm text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 sm:flex-row">
      <div>{`${totalRecords} leads found`}</div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handlePrevious}
          disabled={page === 1}
          className="rounded-full border border-slate-300 px-4 py-2 text-sm hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:hover:bg-slate-800"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          type="button"
          onClick={handleNext}
          disabled={page === totalPages}
          className="rounded-full border border-slate-300 px-4 py-2 text-sm hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:hover:bg-slate-800"
        >
          Next
        </button>
      </div>
    </div>
  );
};
