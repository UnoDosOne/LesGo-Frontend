import React from 'react';

export const FailureModal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
        <h2 className="text-xl font-bold text-red-600 mb-4">Something Went Wrong</h2>
        <p className="text-gray-700 mb-6">
          {message || "An unexpected error occurred. Please try again later."}
        </p>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};
