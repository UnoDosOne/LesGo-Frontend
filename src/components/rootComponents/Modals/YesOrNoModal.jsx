import React, { useState } from "react";

const YesOrNoModal = ({ isOpen, setIsOpen, onConfirm, titleName }) => {
  return (
    <div
      className={`${
        isOpen
          ? "opacity-100 inset-0 z-50"
          : "inset-0 -z-50 opacity-0 pointer-events-none"
      } bg-black/70 backdrop-blur-sm absolute w-screen h-screen overflow-hidden duration-300`}
    >
      <div className="h-full w-full flex justify-center items-center">
        <div className="bg-white rounded-lg p-6">
          <p className="text-center font-bold text-lg mb-4">{titleName}</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => {
                setIsOpen(false);
                onConfirm();
              }}
              className="bg-green-500 rounded-md hover:bg-green-700 text-white font-semibold font-inter text-sm w-32   border-black border border-dashed  py-2"
            >
              Yes
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
              }}
              className="bg-red-500 rounded-md hover:bg-red-700 text-white font-semibold font-inter text-sm w-32   border-black border border-dashed py-2 "
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YesOrNoModal;
