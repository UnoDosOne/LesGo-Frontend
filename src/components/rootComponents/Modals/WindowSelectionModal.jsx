// WindowSelectionModal.js
import React from "react";
import { FaXmark } from "react-icons/fa6";

const WindowSelectionModal = ({ isOpen, setIsOpen, onSelectWindow }) => {
  const handleWindowSelect = (windowNumber) => {
    onSelectWindow(windowNumber);
    setIsOpen(false); // Close the modal after selection
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-center items-center">
      <div className="w-full md:w-[90%] lg:w-[50%] pb-16 bg-white rounded-xl mx-2">
        <div className="border-b w-full flex justify-between items-center p-2">
          <p className="font-inter text-xl font-semibold">Select Window</p>
          <button onClick={() => setIsOpen(false)} className="p-2">
            <FaXmark />
          </button>
        </div>
        <div className="p-4 flex flex-col gap-y-4">
          {[1, 2, 3, 4].map((window) => (
            <button
              key={window}
              onClick={() => handleWindowSelect(window)}
              className="p-2 bg-amber-500 text-white rounded-md hover:bg-yellow-600"
            >
              Window {window}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WindowSelectionModal;
