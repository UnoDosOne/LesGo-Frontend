import React from "react";

const Footer = () => {
  const currentDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = today.getMonth(); 
    const yyyy = today.getFullYear();

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return monthNames[mm] + " " + dd + ", " + yyyy;
  };
  const currentYear = () => {
    const today = new Date();
    const yyyy = today.getFullYear();

    return yyyy;
  };
  return (
    <div className=" w-full h-10 bg-amber-500 flex -z-50 flex-col-reverse sm:flex-row items-center justify-between  px-2">
      <label className="text-[10px] font-semibold  font-inter  sm:mx-12 mx-0">
        {currentYear()} © USTP Office of Registrar v1.0
      </label>
      <label className="text-[10px] font-semibold sm:mx-12 mx-0 font-inter ">
        {currentDate()}
      </label>
    </div>
  );
};

export default Footer;
