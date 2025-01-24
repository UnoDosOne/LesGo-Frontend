import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

const Loading = ({ loading }) => {
  return (
    <div
      className={`${
        loading ? "opacity-100 z-50" : "opacity-0 -z-50"
      } w-screen h-screen absolute   bg-white duration-1000`}
    >
      <div className="w-full h-full flex flex-col justify-center items-center  gap-y-2">
        <AiOutlineLoading className="h-12 w-12 animate-spin" />
        Loading...
      </div>
    </div>
  );
};

export default Loading;
