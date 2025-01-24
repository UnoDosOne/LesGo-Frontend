import React from "react";
import {
  IoMdPaperPlane,
  IoIosPeople,
  IoIosListBox,
  IoIosNotifications,
  IoIosChatboxes,
  IoIosSettings,
  IoIosStats,
  IoMdLogOut,
} from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="h-full w-72 sticky bg-blue-950 duration-700 lg:flex flex-col overflow-hidden hidden">
      <div className="w-full flex lg:flex-row xl:flex-col gap-x-5 items-center xl:justify-center p-10">
        <div className="lg:w-16 lg:h-16 xl:w-28 xl:h-28">
          <img src="/images/lesgologo.png" alt="LesGo Logo" />
        </div>
        <label className="font-inter font-bold text-white text-3xl flex">
          <p className="text-yellow-500 ">Les</p> <p>Go</p>
        </label>
      </div>

      <ul className="w-full">
        <li className="text-lg text-white flex items-center w-full border-t border-blue-900 border-opacity-25 pl-8 gap-x-2 h-14">
          <div
            onClick={() => navigate("/admin/dashboard")}
            className="flex items-center gap-x-2 hover:text-black hover:bg-white hover:translate-x-1 duration-700 p-2 w-56 cursor-pointer rounded-full"
          >
            <IoIosStats className="w-8 h-8 text-yellow-500" />
            <p>Dashboard</p>
          </div>
        </li>
        <li className="text-lg text-white flex items-center w-full border-blue-900 border-opacity-25 pl-8 gap-x-2 h-14">
          <div
            onClick={() => navigate("/admin/queue")}
            className="flex items-center gap-x-2 hover:text-black hover:bg-white hover:translate-x-1 duration-700 p-2 w-56 cursor-pointer rounded-full"
          >
            <IoIosPeople className="w-8 h-8 text-yellow-500" />
            <p>Queue Management</p>
          </div>
        </li>
        <li className="text-lg text-white flex items-center w-full border-blue-900 border-opacity-25 pl-8 gap-x-2 h-14">
          <div
            onClick={() => navigate("/admin/records")}
            className="flex items-center gap-x-2 hover:text-black hover:bg-white hover:translate-x-1 duration-700 p-2 w-56 cursor-pointer rounded-full"
          >
            <IoIosChatboxes className="w-8 h-8 text-yellow-500" />
            <p>Records Management</p>
          </div>
        </li>
        {/* <li className="text-lg text-white flex items-center w-full border-blue-900 border-opacity-25 pl-8 gap-x-2 h-14">
          <div
            onClick={() => navigate("/admin/feedbacks")}
            className="flex items-center gap-x-2 hover:text-black hover:bg-white hover:translate-x-1 duration-700 p-2 w-56 cursor-pointer rounded-full"
          >
            <IoIosChatboxes className="w-8 h-8 text-yellow-500" />
            <p>Feedbacks</p>
          </div>
        </li> */}
        <li className="text-lg text-white flex items-center w-full border-blue-900 border-opacity-25 pl-8 gap-x-2 h-14">
          <div
            onClick={() => navigate("/admin/reports")}
            className="flex items-center gap-x-2 hover:text-black hover:bg-white hover:translate-x-1 duration-700 p-2 w-56 cursor-pointer rounded-full"
          >
            <IoIosStats className="w-8 h-8 text-yellow-500" />
            <p>Reports</p>
          </div>
        </li>
        <li className="text-lg text-white flex items-center w-full border-blue-900 border-opacity-25 pl-8 gap-x-2 h-14">
          <div
            onClick={() => navigate("/admin/user-management")}
            className="flex items-center gap-x-2 hover:text-black hover:bg-white hover:translate-x-1 duration-700 p-2 w-56 cursor-pointer rounded-full"
          >
            <IoIosPeople className="w-8 h-8 text-yellow-500" />
            <p>User Management</p>
          </div>
        </li>
        <li className="text-lg text-white flex items-center w-full border-blue-900 border-opacity-25 pl-8 gap-x-2 h-14">
          <div
            onClick={() => navigate("/admin/assignment")}
            className="flex items-center gap-x-2 hover:text-black hover:bg-white hover:translate-x-1 duration-700 p-2 w-56 cursor-pointer rounded-full"
          >
            <IoIosPeople className="w-8 h-8 text-yellow-500" />
            <p>Windows Assignment</p>
          </div>
        </li>
      </ul>
      <div className="absolute bottom-10">
        <div className="text-lg text-white flex items-center w-full border-t border-blue-900 border-opacity-25 pl-8 gap-x-2 h-14">
          <div
            onClick={() => {
              navigate("/");
              localStorage.removeItem("token");
            }}
            className="flex items-center gap-x-2 hover:text-black hover:bg-white hover:translate-x-1 duration-700 p-2 w-56 cursor-pointer rounded-full"
          >
            <IoMdLogOut className="w-8 h-8 text-yellow-500" />
            <p>Logout</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
