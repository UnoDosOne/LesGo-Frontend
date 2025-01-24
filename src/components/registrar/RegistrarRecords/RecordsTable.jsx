import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { 
  FileText, 
  Search, 
  Filter, 
  Calendar, 
  Download, 
  ArrowRight, 
  ArrowLeft, 
  AlertCircle 
} from 'lucide-react';

const RecordsTable = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    searchQuery: '',
    documentType: '',
    dateFilter: '',
    page: 1
  });

  const ITEMS_PER_PAGE = 10;
  const DOCUMENT_TYPES = [
    'Transcript of Records',
    'Honorable Dismissal',
    'CAV',
    'Diploma Replacement',
    'Rush Fee',
    'Permit to Study'
  ];

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const response = await axios.get('http://localhost:5000/api/request', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const processedRecords = response.data
          .filter(record => record.requestStatus !== 'Pending')
          .map(record => ({
            ...record,
            registrarName: record.registrarName || 'Unknown'
          }));

        setRecords(processedRecords);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  const filteredRecords = useMemo(() => {
    return records.filter(record => 
      (!filters.searchQuery || 
        record.userId?.fName?.toLowerCase().includes(filters.searchQuery.toLowerCase())) &&
      (!filters.documentType || record.documentType === filters.documentType) &&
      (!filters.dateFilter || 
        new Date(record.updatedAt).toLocaleDateString() === new Date(filters.dateFilter).toLocaleDateString())
    );
  }, [records, filters]);

  const paginatedRecords = useMemo(() => {
    const startIndex = (filters.page - 1) * ITEMS_PER_PAGE;
    return filteredRecords.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredRecords, filters.page]);

  const totalPages = Math.ceil(filteredRecords.length / ITEMS_PER_PAGE);

  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ['Student Name', 'Form Type', 'Request Status', 'Date of Completion'];
    const tableRows = records.map(record => [
      record.userId?.fName || 'N/A',
      record.documentType,
      record.requestStatus,
      new Date(record.updatedAt).toLocaleDateString()
    ]);

    doc.text('Registrar Transactions Records', 14, 15);
    doc.autoTable({
      startY: 20,
      head: [tableColumn],
      body: tableRows
    });
    doc.save('Registrar_Transactions_Records.pdf');
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
              onClick={() => window.location.reload()}
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
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col h-[90vh]">
        {/* Header */}
        <div className="bg-[#0b1933] p-4 md:p-6 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <FileText className="w-8 h-8 md:w-10 md:h-10 text-white" />
            <h1 className="text-xl md:text-3xl font-bold text-white">
              Registrar Records
            </h1>
          </div>
          <button 
            onClick={exportToPDF}
            className="flex items-center space-x-2 bg-white text-blue-600 px-3 py-2 md:px-4 md:py-2 rounded-lg hover:bg-blue-50 transition-colors text-sm md:text-base"
          >
            <Download className="w-4 h-4 md:w-5 md:h-5" />
            <span>Export PDF</span>
          </button>
        </div>

        {/* Filters */}
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
            <div className="relative col-span-2 md:col-span-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by student name"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                value={filters.searchQuery}
                onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value, page: 1 }))}
              />
            </div>

            <div className="relative col-span-1">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                value={filters.documentType}
                onChange={(e) => setFilters(prev => ({ ...prev, documentType: e.target.value, page: 1 }))}
              >
                <option value="">All Types</option>
                {DOCUMENT_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="relative col-span-1">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                value={filters.dateFilter}
                onChange={(e) => setFilters(prev => ({ ...prev, dateFilter: e.target.value, page: 1 }))}
              />
            </div>
          </div>
        </div>

        {/* Table Container with Scrollable Body */}
        <div className="flex-grow overflow-auto">
          <table className="w-full table-auto">
            <thead className="sticky top-0 bg-gray-100 border-b z-10">
              <tr>
                {['Student Name', 'Form Type', 'Request Status', 'Date of Completion'].map(header => (
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
              {paginatedRecords.length > 0 ? (
                paginatedRecords.map((record, index) => (
                  <tr 
                    key={index} 
                    className="hover:bg-blue-50 transition-colors"
                  >
                    <td className="px-4 py-4 whitespace-nowrap">{record.userId?.fName || 'N/A'}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{record.documentType}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{record.requestStatus}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{new Date(record.updatedAt).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No records found.
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

export default RecordsTable;