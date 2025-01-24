import React from "react";
import { TicketIcon } from "lucide-react";
import QueueCard from "./QueueCard";

const QueueList = ({ queueList = [] }) => {
  return (
    <div className="w-full h-[calc(93.8vh-50px)] overflow-y-auto custom-scrollbar">
      {queueList.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-gray-400 h-full">
          <TicketIcon className="w-16 h-16 mb-4 opacity-50" />
          <p className="text-lg font-semibold">No customers in the queue</p>
          <p className="text-sm">All caught up!</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {queueList.map((item, index) => (
            <QueueCard
              key={item.queueNum || index}
              userName={item.userName}
              program={item.program}
              queueNum={item.queueNum}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default QueueList;
