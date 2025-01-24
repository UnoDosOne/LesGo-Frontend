import React from "react";

const colors = {
  darkBlue: '#0b1933',
  yellow: '#fcb414',
  white: '#ffffff'
};

const FormBTN = ({ name, link, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
        w-full 
        max-w-xs 
        rounded-lg 
        shadow-lg 
        p-4 
        text-sm 
        font-semibold 
        transform 
        transition-all 
        duration-300 
        hover:shadow-xl 
        hover:-translate-y-1 
        focus:outline-none 
        focus:ring-2 
        focus:ring-offset-2
        text-left
        truncate
      "
      style={{
        backgroundColor: colors.yellow,
        color: colors.darkBlue,
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}
    >
      {name}
    </button>
  );
};

export default FormBTN;