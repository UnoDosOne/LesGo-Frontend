import React, { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";

const LoadingModal = ({ isOpen }) => {
  return (
    <div
      className={`${
        isOpen
          ? "opacity-100 inset-0 z-50"
          : "inset-0 -z-50 opacity-0 pointer-events-none"
      } bg-white/70 backdrop-blur-sm absolute w-screen h-screen overflow-hidden duration-300`}
    >
      <div className="w-full h-full flex flex-col justify-center items-center  gap-y-2">
        <AiOutlineLoading className="h-12 w-12 animate-spin" />
        Loading...
      </div>
    </div>
  );
};

export default LoadingModal;
