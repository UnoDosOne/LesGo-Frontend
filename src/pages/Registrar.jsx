import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../components/registrar/Sidebar.jsx";
import Navbar from "../components/registrar/Navbar.jsx";
import RegistrarForms from "../screens/registrar/forms/RegistrarForms.jsx";
import Queue from "../screens/registrar/todays/Queue.jsx";
import RegistrarNotifications from "../screens/registrar/notifications/RegistrarNotifications.jsx";
import RegistrarRecords from "../screens/registrar/records/RegistrarRecords.jsx";
import RegistrarRequest from "../screens/registrar/requests/RegistrarRequest.jsx";
import RegistrarFeedbacks from "../screens/registrar/feedbacks/RegistrarFeedbacks.jsx";
import Footer from "../components/rootComponents/Footer.jsx";
import Errorpage from "./Errorpage.jsx";

const Student = ({ user }) => {
  return (
    <div className="flex bg-gray-300">
      <div className="">
        <Sidebar />
        <Navbar />
      </div>
      <div className="w-screen h-screen ">
        <Routes>
          <Route index element={<Queue />} /> {/* Default route for /student */}
          <Route path="feedbacks/" element={<RegistrarFeedbacks />} />
          <Route path="notifications/" element={<RegistrarNotifications />} />
          <Route path="records/" element={<RegistrarRecords />} />
          <Route path="requests/" element={<RegistrarRequest />} />
          <Route path="queue/" element={<Queue />} />
          <Route path="forms/" element={<RegistrarForms />} />
          <Route path="*" element={<Errorpage />} />
        </Routes>
      </div>
      <div className="absolute w-full bottom-0">
        <Footer />
      </div>
    </div>
  );
};

export default Student;
