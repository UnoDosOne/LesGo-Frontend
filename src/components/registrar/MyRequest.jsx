import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { 
  Search, 
  Filter, 
  Calendar, 
  Eye, 
  ArrowRight, 
  ArrowLeft, 
  AlertCircle, 
  FileText,
  XCircle,
  CheckCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import RequirementsModal from './RegistrarRequestComponents/RequirementsModal';

const MyRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    searchTerm: '',
    formType: '',
    startDate: '',
    endDate: '',
    status: 'Pending', // Add a status filter
    page: 1
  });
  const [selectedData, setSelectedData] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const navigation = useNavigate()

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');
  
        const response = await axios.get('http://localhost:5000/api/request', {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        // Sort requests by latest date (descending order)
        const sortedRequests = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
  
        setRequests(sortedRequests);
        setError('');
      } catch (error) {
        console.error('Error fetching requests:', error);
        setError(error.response?.data?.message || 'Failed to fetch requests');
      } finally {
        setLoading(false);
      }
    };
  
    fetchRequests();
  }, []);
  

  const filteredRequests = useMemo(() => {
    return requests.filter(request => {
      const userName = request.userId?.fName?.toLowerCase() || ''; 
      const documentType = request.documentType?.toLowerCase() || '';
      const searchTerm = filters.searchTerm.toLowerCase();
  
      const matchesSearchTerm = searchTerm
        ? userName.includes(searchTerm) || documentType.includes(searchTerm)
        : true;
  
      const matchesFormType = filters.formType
        ? request.documentType === filters.formType
        : true;
  
      const matchesDateRange =
        (!filters.startDate || new Date(request.createdAt) >= new Date(filters.startDate)) &&
        (!filters.endDate || new Date(request.createdAt) <= new Date(filters.endDate));
  
      const matchesStatus = filters.status 
        ? request.requestStatus === filters.status 
        : true;
  
      return (
        matchesSearchTerm &&
        matchesFormType &&
        matchesDateRange &&
        matchesStatus
      );
    });
  }, [requests, filters]);
  

  const paginatedRequests = useMemo(() => {
    const startIndex = (filters.page - 1) * ITEMS_PER_PAGE;
    return filteredRequests.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredRequests, filters.page]);

  const totalPages = Math.ceil(filteredRequests.length / ITEMS_PER_PAGE);
  const formTypes = [...new Set(requests.map(request => request.documentType))];
  const statuses = [...new Set(requests.map(request => request.requestStatus))];

  const handleViewRequest = (request) => {
    setSelectedData(request);
    setIsOpen(true);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="flex items-center justify-center space-x-2 animate-pulse">
          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600 font-medium">Loading requests...</span>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg max-w-md w-full mx-4">
          <div className="flex items-start">
            <AlertCircle className="w-6 h-6 mr-3 text-red-500" />
            <div className="flex-1">
              <h2 className="font-bold text-lg">Something went wrong</h2>
              <p className="mt-1 text-sm">{error}</p>
            </div>
          </div>
          <div className="mt-3 flex justify-end">
            <button
              className="text-red-600 hover:text-red-800 font-semibold underline text-sm"
              onClick={() => navigation('/')}
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }
  

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <RequirementsModal
        isOpen={isOpen}
        setIsOpen={() => {
          setSelectedData({});
          setIsOpen(false);
        }}
        data={selectedData}
      />

      <div className="bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col h-[90vh]">
        {/* Header */}
        <div className="bg-[#0b1933] p-4 md:p-6 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <FileText className="w-8 h-8 md:w-10 md:h-10 text-white" />
            <h1 className="text-xl md:text-3xl font-bold text-white">
              {filters.status} Requests
            </h1>
          </div>
          <div className="text-white text-sm">
            Total {filters.status}: {filteredRequests.length}
          </div>
        </div>

        {/* Filters */}
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4">
            <div className="relative col-span-2 md:col-span-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                value={filters.searchTerm}
                onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value, page: 1 }))}
              />
            </div>

            <div className="relative col-span-1">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                value={filters.formType}
                onChange={(e) => setFilters(prev => ({ ...prev, formType: e.target.value, page: 1 }))}
              >
                <option value="">All Types</option>
                {formTypes.map((formType, index) => (
                  <option key={index} value={formType}>{formType}</option>
                ))}
              </select>
            </div>


            <div className="relative col-span-1">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                value={filters.startDate}
                onChange={(e) => setFilters(prev => ({ ...prev, startDate: e.target.value, page: 1 }))}
              />
            </div>

            <div className="relative col-span-1">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                value={filters.endDate}
                onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value, page: 1 }))}
              />
            </div>
          </div>
        </div>

        {/* Table Container with Scrollable Body */}
        <div className="flex-grow overflow-auto">
          <table className="w-full table-auto">
            <thead className="sticky top-0 bg-gray-100 border-b z-10">
              <tr>
                {['Name', 'Form Type', 'Date of Submission', 'Status', 'Actions'].map(header => (
                  <th 
                    key={header} 
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky top-0 bg-gray-100"
                  >
                    {header}
                  </th>
                ))} 
              </tr>
            </thead>
            <tbody>
              {paginatedRequests.length > 0 ? (
                paginatedRequests.map((request) => (
                  <tr 
                    key={request._id} 
                    className="hover:bg-blue-50 transition-colors"
                  >
                    <td className="px-4 py-4 whitespace-nowrap">
                      {request.userId.fName || 'Unknown'}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {request.documentType}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap hidden sm:table-cell">
                      {new Date(request.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {request.requestStatus === 'Rejected' && (
                        <span className="flex items-center text-red-600">
                          <XCircle className="mr-2 w-5 h-5" />
                          Rejected
                        </span>
                      )}
                      {request.requestStatus === 'Cleared' && (
                        <span className="flex items-center text-green-600">
                          <CheckCircle className="mr-2 w-5 h-5" />
                          Cleared
                        </span>
                      )}
                      {request.requestStatus === 'Pending' && (
                        <span className="flex items-center text-yellow-600">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleViewRequest(request)}
                        className="bg-blue-600 text-white font-medium px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                      >
                        <Eye className="inline-block mr-1" />
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No {filters.status} requests available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center p-4">
          <button 
            onClick={() => setFilters(prev => ({ ...prev, page: Math.max(prev.page - 1, 1) }))}
            disabled={filters.page === 1}
            className="flex items-center text-blue-600 disabled:opacity-50"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>
          <span className="text-gray-700">
            Page {filters.page} of {totalPages}
          </span>
          <button 
            onClick={() => setFilters(prev => ({ ...prev, page: Math.min(prev.page + 1, totalPages) }))}
            disabled={filters.page === totalPages}
            className="flex items-center text-blue-600 disabled:opacity-50"
          >
            <span>Next</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyRequest;