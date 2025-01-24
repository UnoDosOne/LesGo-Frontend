import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../pagination/pagination";
import { 
  FaEye, 
  FaExclamationCircle
} from "react-icons/fa";

const MyRequest = () => {
  // Dummy data for resubmission
  const DUMMY_RESUBMISSION_REQUESTS = [
    {
      id: 1,
      formType: "Honorable Dismissal",
      dateValidated: "2024-03-15",
      reasonForResubmission: "Invalid payment reciept",
      status: "Pending",
      details: {
        originalName: "John Doe",
        correctedName: "John A. Doe",
        requiredDocuments: [
          "Birth Certificate",
          "Government ID",
          "Affidavit of Name Change"
        ]
      }
    },
    // ... (rest of the dummy data remains the same)
  ];

  const [approvalRequests, setApprovalRequests] = useState([]);
  const [resubmissionRequests, setResubmissionRequests] = useState(DUMMY_RESUBMISSION_REQUESTS);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [currentView, setCurrentView] = useState('approval');
  
  // Pagination states
  const [currentApprovalPage, setCurrentApprovalPage] = useState(1);
  const [currentResubmissionPage, setCurrentResubmissionPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const fetchApprovalRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get("http://localhost:5000/api/request", {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      setApprovalRequests(response.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    fetchApprovalRequests();
  }, []);

  // Pagination logic for approval requests
  const paginatedApprovalRequests = approvalRequests.slice(
    (currentApprovalPage - 1) * ITEMS_PER_PAGE,
    currentApprovalPage * ITEMS_PER_PAGE
  );

  // Pagination logic for resubmission requests
  const paginatedResubmissionRequests = resubmissionRequests.slice(
    (currentResubmissionPage - 1) * ITEMS_PER_PAGE,
    currentResubmissionPage * ITEMS_PER_PAGE
  );

  const renderStatusBadge = (status) => {
    const statusColors = {
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Rejected': 'bg-red-100 text-red-800',
      'Accepted': 'bg-green-100 text-green-800',
      'In Review': 'bg-blue-100 text-blue-800'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  const RequestDetailsModal = ({ request, onClose }) => {
    if (!request) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">{request.formType} Details</h2>
            <button 
              onClick={onClose} 
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center">
              <FaExclamationCircle className="mr-2 text-blue-500" />
              <p className="font-semibold">Reason for Resubmission:</p>
            </div>
            <p className="text-gray-600">{request.reasonForResubmission}</p>

            <div className="bg-gray-100 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Required Documents:</h3>
              <ul className="list-disc list-inside text-gray-700">
                {request.details.requiredDocuments.map((doc, index) => (
                  <li key={index}>{doc}</li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end">
              <button 
                onClick={onClose}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      {selectedRequest && (
        <RequestDetailsModal 
          request={selectedRequest} 
          onClose={() => setSelectedRequest(null)} 
        />
      )}

      <div className="mb-6 flex justify-start space-x-4">
        <button
          onClick={() => setCurrentView('approval')}
          className={`px-6 py-2 rounded-md transition ${
            currentView === 'approval' 
              ? 'bg-[#0b1933] text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Approval Requests
        </button>
        <button
          onClick={() => setCurrentView('resubmission')}
          className={`px-6 py-2 rounded-md transition ${
            currentView === 'resubmission' 
              ? 'bg-[#0b1933] text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Resubmission Requests
        </button>
      </div>

      {currentView === 'approval' ? (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left">Form Type</th>
                <th className="px-6 py-3 text-left">Date Submitted</th>
                <th className="px-6 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedApprovalRequests.map(request => (
                <tr key={request._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{request.documentType}</td>
                  <td className="px-6 py-4">
                    {new Date(request.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    {renderStatusBadge(request.requestStatus)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <Pagination 
            currentPage={currentApprovalPage}
            totalPages={Math.ceil(approvalRequests.length / ITEMS_PER_PAGE)}
            onPageChange={setCurrentApprovalPage}
          />
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left">Form Type</th>
                <th className="px-6 py-3 text-left">Date Validated</th>
                <th className="px-6 py-3 text-left">Reason</th>
              </tr>
            </thead>
            <tbody>
              {paginatedResubmissionRequests.map(request => (
                <tr key={request.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{request.formType}</td>
                  <td className="px-6 py-4">{request.dateValidated}</td>
                  <td className="px-6 py-4">{request.reasonForResubmission}</td>
                
                </tr>
              ))}
            </tbody>
          </table>
          
          <Pagination 
            currentPage={currentResubmissionPage}
            totalPages={Math.ceil(resubmissionRequests.length / ITEMS_PER_PAGE)}
            onPageChange={setCurrentResubmissionPage}
          />
        </div>
      )}
    </div>
  );
};

export default MyRequest;