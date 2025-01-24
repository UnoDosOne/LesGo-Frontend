import React, { useState } from "react";
import { FaXmark, FaUser, FaUsers } from "react-icons/fa6";
import RelativeForm from "./RelativeForm";
import RequestForm from "./RequestForm";

// USTP Color Palette
const colors = {
  darkBlue: '#0b1933',
  yellow: '#fcb414',
  white: '#ffffff'
};

const RequestClientForm = ({ isOpen, setIsOpen, buttonName, data }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [clientData, setClientData] = useState({});

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
    setClientData((prevClientData) => ({
      ...prevClientData,
      form: {},
      client: "",
    }));
  };

  const handleClose = () => {
    setIsOpen(false);
    setClientData({});
    setCurrentStep(1);
  };

  return (
    <div
    className={`
      fixed inset-0 z-50 
      bg-black bg-opacity-60 
      flex items-center justify-center 
      transition-all duration-300 
      p-4
      ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
    `}
  >
    <div 
      className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden"
      style={{ 
        backgroundColor: colors.white,
        border: `4px solid ${colors.darkBlue}`,
        zIndex: 60, 
      }}
    >
        {/* Header */}
        <div 
          className="flex justify-between items-center p-4 border-b"
          style={{ 
            backgroundColor: colors.darkBlue,
            color: colors.white 
          }}
        >
          <h2 className="text-2xl font-bold">
            {currentStep === 1 ? "Request Type" : 
             clientData.client === "Me" ? "Personal Request" : "Relative Request"}
          </h2>
          <button 
            onClick={handleClose}
            className="text-white hover:text-yellow-300 transition-colors"
            aria-label="Close"
          >
            <FaXmark className="text-2xl" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          {currentStep === 1 && (
            <div className="text-center">
              <p className="text-2xl font-semibold mb-12 text-gray-800">
                Who is this request for?
              </p>
              <div className="flex justify-center space-x-8">
                <button
                  onClick={() => {
                    setClientData({ client: "Me", name: buttonName, form: {} });
                    handleNext();
                  }}
                  className="
                    flex flex-col items-center justify-center 
                    w-48 h-48 
                    rounded-3xl 
                    shadow-lg 
                    transform transition-all duration-300 
                    hover:scale-105 
                    focus:outline-none 
                    focus:ring-2 
                    focus:ring-offset-2
                  "
                  style={{
                    backgroundColor: colors.yellow,
                    color: colors.darkBlue,
                    boxShadow: `0 8px 15px rgba(0,0,0,0.1)`,
                  }}
                >
                  <FaUser className="text-6xl mb-6" />
                  <span className="text-xl font-semibold">Myself</span>
                </button>
                <button
                  onClick={() => {
                    setClientData({
                      client: "Relative",
                      name: buttonName,
                      form: {},
                    });
                    handleNext();
                  }}
                  className="
                    flex flex-col items-center justify-center 
                    w-48 h-48 
                    rounded-3xl 
                    shadow-lg 
                    transform transition-all duration-300 
                    hover:scale-105 
                    focus:outline-none 
                    focus:ring-2 
                    focus:ring-offset-2
                  "
                  style={{
                    backgroundColor: colors.yellow,
                    color: colors.darkBlue,
                    boxShadow: `0 8px 15px rgba(0,0,0,0.1)`,
                  }}
                >
                  <FaUsers className="text-6xl mb-6" />
                  <span className="text-xl font-semibold">A Relative</span>
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && clientData.client === "Relative" && (
            <RelativeForm
              isOpen={currentStep === 2}
              onBack={handleBack}
              data={clientData}
            />
          )}

          {currentStep === 2 && clientData.client === "Me" && (
            <RequestForm
              isOpen={currentStep === 2}
              setIsOpen={setIsOpen}
              data={clientData}
              onBack={handleBack}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestClientForm;