import React, { useState } from "react";

const AssignPersonnel = () => {
  // Dummy data for personnel, departments, and request types
  const personnelList = ["Alice Brown", "John Doe", "Mary Green", "Tom White"];
  const departments = ["Registrar", "Admissions", "Finance", "Academic Records"];
  const requestTypes = ["Transcript Request", "Certification", "Record Correction", "ID Replacement"];

  // State for selected department, request type, and personnel
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedRequestType, setSelectedRequestType] = useState("");
  const [selectedPersonnel, setSelectedPersonnel] = useState("");
  const [assignments, setAssignments] = useState([]);

  // Handle assignment
  const handleAssign = () => {
    if (selectedDepartment && selectedRequestType && selectedPersonnel) {
      const newAssignment = {
        department: selectedDepartment,
        requestType: selectedRequestType,
        personnel: selectedPersonnel,
      };

      // Update assignments
      setAssignments([...assignments, newAssignment]);

      // Reset selections
      setSelectedDepartment("");
      setSelectedRequestType("");
      setSelectedPersonnel("");
    }
  };

  // Render the component
  return (
    <div className="p-5 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-blue-900">Assign Personnel</h1>

      {/* Department Selection */}
      <div className="mb-4">
        <label className="block font-semibold text-gray-700">Select Department:</label>
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg w-full"
        >
          <option value="">Choose a Department</option>
          {departments.map((department, index) => (
            <option key={index} value={department}>
              {department}
            </option>
          ))}
        </select>
      </div>

      {/* Personnel Selection */}
      <div className="mb-4">
        <label className="block font-semibold text-gray-700">Assign Personnel:</label>
        <select
          value={selectedPersonnel}
          onChange={(e) => setSelectedPersonnel(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg w-full"
        >
          <option value="">Choose Personnel</option>
          {personnelList.map((person, index) => (
            <option key={index} value={person}>
              {person}
            </option>
          ))}
        </select>
      </div>

      {/* Assign Button */}
      <button onClick={handleAssign} className="bg-blue-500 text-white p-2 rounded-lg w-full">
        Assign
      </button>

      {/* Assignment List */}
      <h2 className="text-xl font-bold mt-6 mb-2 text-blue-900">Current Assignments</h2>
      <table className="min-w-full border-collapse border border-gray-300 mt-4">
        <thead>
          <tr className="bg-blue-900 text-white">
            <th className="border border-gray-300 p-2">Department</th>
            <th className="border border-gray-300 p-2">Request Type</th>
            <th className="border border-gray-300 p-2">Assigned Personnel</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2">{assignment.department}</td>
              <td className="border border-gray-300 p-2">{assignment.requestType}</td>
              <td className="border border-gray-300 p-2">{assignment.personnel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssignPersonnel;
