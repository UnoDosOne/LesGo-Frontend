import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Function to handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center items-center space-x-3 py-4">
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-lg hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-400 transition-all"
      >
        &laquo; Previous
      </button>

      {/* Page Number Display */}
      <span className="text-sm text-gray-600">
        {currentPage} of {totalPages}
      </span>

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-lg hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-400 transition-all"
      >
        Next &raquo;
      </button>
    </div>
  );
};

export default Pagination;
