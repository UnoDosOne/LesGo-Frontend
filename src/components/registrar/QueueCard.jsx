import React from "react";

const QueueCard = ({ userName, program, queueNum }) => {
  return (
    <div className="flex h-36 border-b-2 px-4 py-6">
      <div className="w-2/3 px-2 flex flex-col gap-y-2">
        <p className="text-xl sm:text-3xl font-inter font-semibold text-blue-950">
          {userName}
        </p>
        <p className="text-amber-500 text-sm font-semibold">{program}</p>
      </div>
      <div className="w-1/3 flex justify-center items-center p-2">
        <div className="flex items-center justify-center border-4 border-amber-500 h-24 w-full rounded-xl">
          <p className="font-inter font-semibold text-5xl text-amber-500">
            {queueNum}
          </p>
        </div>
      </div>
    </div>
  );
};

export default QueueCard;
