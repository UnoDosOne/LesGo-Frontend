import React from "react";
import { FaBell } from "react-icons/fa6";

const NotificationModal = ({ isOpen, setIsOpen, message }) => {
  return (
    <div
      className={`${
        isOpen
          ? "opacity-100 inset-0 z-50"
          : " inset-0 -z-50 opacity-0 pointer-events-none"
      } bg-black/70 backdrop-blur-sm absolute w-screen h-screen overflow-hidden duration-300`}
    >
      <div className="h-full w-full flex justify-center items-center">
        <div className="bg-white rounded-lg p-4 flex flex-col justify-center items-center">
          <div>
            <FaBell className="text-9xl text-green-700" />
          </div>
          <p className="text-center font-bold font-inter text-lg p-2">
            Notice!
          </p>
          <div className="w-96">
            <p className="text-center font-inter">{message}</p>
          </div>

          <div className="flex justify-center py-3">
            <button
              onClick={() => setIsOpen(false)} // Change to setIsOpen(false) to close the modal
              className="bg-red-500 rounded-md hover:bg-red-700 text-white font-inter font-bold p-2"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
