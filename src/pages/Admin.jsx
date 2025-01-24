import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar.jsx";
import Navbar from "../components/admin/Navbar.jsx";
import Dashboard1 from "../screens/admin/dashboard/Dashboard.jsx";
import RegistrarRecords from "../screens/admin/records/RegistrarRecords.jsx";
import RegistrarFeedbacks from "../screens/admin/feedbacks/RegistrarFeedbacks.jsx";
import Footer from "../components/rootComponents/Footer.jsx";
import Errorpage from "./Errorpage.jsx";
import ReportsManagement1 from "../screens/admin/preferences/RegistrarPreferences.jsx";
import UserManagement1 from "../screens/admin/usermanagement/UserManagement.jsx";
import QueueManagement1 from "../screens/admin/todays/Queue.jsx";
import WindowAssignment from "../screens/admin/WindowAssignment/AssignPersonnel.jsx";

const Admin = ({ user }) => {
  return (
    <div className="flex bg-gray-300">
      <div className="">
        <Sidebar />
        <Navbar />
      </div>
      <div className="w-screen h-screen ">
        <Routes>
          <Route path="feedbacks/" element={<RegistrarFeedbacks />} />
          <Route path="user-management/" element={<UserManagement1 />} />
          <Route path="reports/" element={<ReportsManagement1/>} />
          <Route path="records/" element={<RegistrarRecords />} />
          <Route path="assignment/" element={<WindowAssignment />} />
          <Route path="queue/" element={<QueueManagement1 />} />
          <Route path="dashboard/" element={<Dashboard1 />} />
          <Route path="*" element={<Errorpage />} />
        </Routes>
      </div>
      <div className="absolute w-full bottom-0">
        <Footer />
      </div>
    </div>
  );
};
 //humana dapat ni 
export default Admin;
