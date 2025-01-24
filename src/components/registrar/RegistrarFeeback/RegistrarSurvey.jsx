import React, { useState } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import RegsitrarSurveyModal from "./RegistrarSurveyModal";
const RegistrarSurvey = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => {
          console.log("clicked");
          setIsOpen(true);
        }}
        className="flex flex-col items-center justify-center bg-amber-600 text-white  p-6 px-8 rounded-xl"
      >
        <FaBarsStaggered className="text-9xl  " />
        <p className="font-inter font-bold text-lg ">Registrar Survey</p>
      </button>
      <RegsitrarSurveyModal
        isOpen={isOpen}
        setIsOpen={() => setIsOpen(false)}
      />
    </div>
  );
};

export default RegistrarSurvey;
