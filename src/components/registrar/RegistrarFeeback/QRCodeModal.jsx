import React, { useState } from "react";
import { FaQrcode } from "react-icons/fa";
import QRModal from "./QRModal";

const QRCodeModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <div className="">
      <button
        onClick={() => setIsOpen(true)}
        className="flex flex-col items-center justify-center bg-amber-600 text-white font-inter p-6 px-10 rounded-xl"
      >
        <FaQrcode className="text-9xl" />{" "}
        <p className="font-inter font-bold text-lg ">My QR Code</p>
      </button>
      <QRModal isOpen={isOpen} setIsOpen={handleClose} />
    </div>
  );
};

export default QRCodeModal;
