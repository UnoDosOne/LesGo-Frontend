import React, { useEffect, useState } from "react";
import QRCodeModal from "../../../components/student/StudentFeeback/QRCodeModal";
import RegistrarSurvey from "../../../components/student/StudentFeeback/RegistrarSurvey";
import NotificationModal from "../../../components/rootComponents/Modals/NotificationModal";
import QRModal from "../../../components/student/StudentFeeback/QRModal";

const RegistrarFeedbacks = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [qrModal, setQrModal] = useState(false);
  useEffect(() => {
    const handleTimeout = () => {
      setTimeout(() => {
        setIsOpen(false);
        setQrModal(true);
        console.log("qrmodal set to true");
      }, 3000);
    };
    handleTimeout();
  }, []);
  return (
    <div className="h-screen w-full justify-center  flex items-center  ">
      <div className="  bg-white rounded-md shadow-md  ">
        <div className="flex items-center justify-center h-12">
          <h2 className="font-inter font-bold text-2xl text-center text-blue-950">
            Feedback
          </h2>
        </div>
        <div className=" p-4  px-6 flex gap-4 justify-center  items-center     flex-wrap">
          <RegistrarSurvey />
        </div>
      </div>
    </div>
  );
};

export default RegistrarFeedbacks;
