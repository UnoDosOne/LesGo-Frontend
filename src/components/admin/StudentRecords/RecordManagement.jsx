import React, { useState } from "react";

const RecordManagement = () => {
  // Initial dummy data for records
  const initialRecords = [
    { name: "John Doe", id: "20230001", status: "Completed" },
    { name: "Jane Smith", id: "20230002", status: "Pending" },
    { name: "Emily Johnson", id: "20230003", status: "Completed" },
    { name: "Michael Brown", id: "20230004", status: "Rejected" },
  ];

  const [records, setRecords] = useState(initialRecords);
  const [newRecord, setNewRecord] = useState({ name: "", id: "", status: "" });

  const handleAddRecord = () => {
    setRecords([...records, newRecord]);
    setNewRecord({ name: "", id: "", status: "" });
  };

  const handleDeleteRecord = (index) => {
    const updatedRecords = records.filter((_, i) => i !== index);
    setRecords(updatedRecords);
  };

  return (
    <div className="p-5 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-blue-900">Record Management</h1>
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Student Name"
          value={newRecord.name}
          onChange={(e) => setNewRecord({ ...newRecord, name: e.target.value })}
          className="border border-gray-300 p-2 rounded-lg w-full"
        />
        <input
          type="text"
          placeholder="Student ID"
          value={newRecord.id}
          onChange={(e) => setNewRecord({ ...newRecord, id: e.target.value })}
          className="border border-gray-300 p-2 rounded-lg w-full"
        />
        <input
          type="text"
          placeholder="Status"
          value={newRecord.status}
          onChange={(e) => setNewRecord({ ...newRecord, status: e.target.value })}
          className="border border-gray-300 p-2 rounded-lg w-full"
        />
        <button onClick={handleAddRecord} className="bg-blue-500 text-white p-2 rounded-lg">
          Add Record
        </button>
      </div>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-900 text-white">
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2">{record.name}</td>
              <td className="border border-gray-300 p-2">{record.id}</td>
              <td className="border border-gray-300 p-2">{record.status}</td>
              <td className="border border-gray-300 p-2">
                <button onClick={() => handleDeleteRecord(index)} className="bg-red-500 text-white p-1 rounded-lg">
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

export default RecordManagement;
