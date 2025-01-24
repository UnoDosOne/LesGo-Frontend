import React, { useState } from "react";

const ReportsManagement = () => {
  // Initial dummy data for reports
  const initialReports = [
    { title: "Daily Queue Summary", date: "2024-10-01", status: "Published" },
    { title: "Monthly Attendance Report", date: "2024-09-30", status: "Draft" },
    { title: "Annual Performance Review", date: "2024-06-15", status: "Published" },
    { title: "Feedback Analysis Report", date: "2024-08-20", status: "Pending" },
  ];

  const [reports, setReports] = useState(initialReports);
  const [newReport, setNewReport] = useState({ title: "", date: "", status: "" });

  const handleAddReport = () => {
    setReports([...reports, newReport]);
    setNewReport({ title: "", date: "", status: "" });
  };

  const handleDeleteReport = (index) => {
    const updatedReports = reports.filter((_, i) => i !== index);
    setReports(updatedReports);
  };

  return (
    <div className="p-5 bg-gray-50 rounded-lg shadow-md w-[70em] h-[30em]">
      <h1 className="text-2xl font-bold mb-4 text-blue-900">Reports Management</h1>
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Report Title"
          value={newReport.title}
          onChange={(e) => setNewReport({ ...newReport, title: e.target.value })}
          className="border border-gray-300 p-2 rounded-lg w-full"
        />
        <input
          type="date"
          value={newReport.date}
          onChange={(e) => setNewReport({ ...newReport, date: e.target.value })}
          className="border border-gray-300 p-2 rounded-lg w-full"
        />
        <input
          type="text"
          placeholder="Status"
          value={newReport.status}
          onChange={(e) => setNewReport({ ...newReport, status: e.target.value })}
          className="border border-gray-300 p-2 rounded-lg w-full"
        />
        <button onClick={handleAddReport} className="bg-blue-500 text-white p-2 rounded-lg">
          Add Report
        </button>
      </div>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-900 text-white">
            <th className="border border-gray-300 p-2">Title</th>
            <th className="border border-gray-300 p-2">Date</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2">{report.title}</td>
              <td className="border border-gray-300 p-2">{report.date}</td>
              <td className="border border-gray-300 p-2">{report.status}</td>
              <td className="border border-gray-300 p-2">
                <button onClick={() => handleDeleteReport(index)} className="bg-red-500 text-white p-1 rounded-lg">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsManagement;
