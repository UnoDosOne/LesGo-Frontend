import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../components/student/Sidebar.jsx";
import StudentForms from "../screens/student/forms/StudentForms.jsx";
import Queue from "../screens/student/todays/Queue.jsx";
import StudentNotifications from "../screens/student/notifications/StudentNotifications.jsx";
import StudentRecords from "../screens/student/records/StudentRecords.jsx";
import StudentRequest from "../screens/student/requests/StudentRequest.jsx";
import StudentFeedbacks from "../screens/student/feedbacks/StudentFeedbacks.jsx";
import Footer from "../components/rootComponents/Footer.jsx";
import Errorpage from "./Errorpage.jsx";
import RegisSurvey  from "../screens/student/survey/regisSurvey.jsx";

const Student = ({ user }) => {
  return (
    <div className="flex bg-gray-300">
      <div>
        <Sidebar />
      </div>
      <div className="w-screen h-screen">
        <Routes>
          <Route index element={<Queue />} /> {/* Default route for /student */}
          <Route path="feedbacks/" element={<StudentFeedbacks />} />
          <Route path="notifications/" element={<StudentNotifications />} />
          <Route path="records/" element={<StudentRecords />} />
          <Route path="requests/" element={<StudentRequest />} />
          <Route path="queue/" element={<Queue />} />
          <Route path="forms/" element={<StudentForms />} />
          <Route path="survey/" element={<RegisSurvey />} />
          <Route path="*" element={<Errorpage />} />
        </Routes>
      </div>
      <div className="absolute w-full bottom-0 z-50">
        <Footer />
      </div>
    </div>
  );
};

export default Student;
