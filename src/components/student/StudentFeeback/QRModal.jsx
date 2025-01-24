import React from "react";

const QRModal = ({ isOpen, setIsOpen, optionalMessage }) => {
  return (
    <div
      className={`${
        isOpen
          ? "opacity-100 inset-0 z-50"
          : " inset-0 -z-50 opacity-0 pointer-events-none"
      } bg-black/70 backdrop-blur-sm absolute w-screen h-screen overflow-hidden  duration-300 `}
    >
      <div className="h-full w-full flex justify-center items-center">
        <div className="bg-white rounded-lg w-[90%]  flex flex-col justify-center items-center px-12 sm:w-auto">
          <p className="text-center font-bold font-inter  text-lg p-2">
            Your QR Code
          </p>
          <div className="w-full h-full sm:w-56 sm:h-56">
            <img
              className="  w-full h-full object-cover"
              src="https://via.placeholder.com/150"
            />
          </div>
          <p className="text-center font-inter  text-md p-2">
            {optionalMessage}
          </p>
          <div className="flex justify-center py-3">
            <button
              onClick={setIsOpen}
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

export default QRModal;
