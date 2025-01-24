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
	AlertCircle,
	X,
} from 'lucide-react';

const RecordsTable = () => {
	const [records, setRecords] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [filters, setFilters] = useState({
		searchQuery: '',
		documentType: '',
		dateFilter: '',
		page: 1,
	});
	const [showExportModal, setShowExportModal] = useState(false);
	const [exportOptions, setExportOptions] = useState({
		startDate: '',
		endDate: '',
		selectedYear: '',
		selectedMonth: '',
		selectedFormTypes: [],
	});

	const ITEMS_PER_PAGE = 10;
	const DOCUMENT_TYPES = [
		'Transcript of Records',
		'Honorable Dismissal',
		'CAV (Certification Authentication & Verification)',
		'Diploma Replacement',
		'Evaluation',
		'Permit to Study',
		'Correction of Name',
		'Authentication',
		'Rush Fee',
	];

	useEffect(() => {
		const fetchRecords = async () => {
			try {
				const token = localStorage.getItem('token');
				if (!token) throw new Error('No token found');

				const response = await axios.get(`${API_BASE_URL}/api/request`, {
					headers: { Authorization: `Bearer ${token}` },
				});

				const processedRecords = response.data
					.filter((record) => record.requestStatus !== 'Pending')
					.map((record) => ({
						...record,
						registrarName: record.registrarName || 'Unknown',
					}))
					.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

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
		return records.filter(
			(record) =>
				(!filters.searchQuery ||
					record.userId?.fName?.toLowerCase().includes(filters.searchQuery.toLowerCase())) &&
				(!filters.documentType || record.documentType === filters.documentType) &&
				(!filters.dateFilter ||
					new Date(record.updatedAt).toLocaleDateString() ===
						new Date(filters.dateFilter).toLocaleDateString())
		);
	}, [records, filters]);

	const paginatedRecords = useMemo(() => {
		const startIndex = (filters.page - 1) * ITEMS_PER_PAGE;
		return filteredRecords.slice(startIndex, startIndex + ITEMS_PER_PAGE);
	}, [filteredRecords, filters.page]);

	const totalPages = Math.ceil(filteredRecords.length / ITEMS_PER_PAGE);

	// PDF Export Function
	const handleExport = () => {
		const doc = new jsPDF();
		const tableColumn = ['Student Name', 'Form Type', 'Request Status', 'Date of Completion'];

		// Filter records based on selected export options
		let filteredRecordsForExport = records;

		// Date Range Filter
		if (exportOptions.startDate && exportOptions.endDate) {
			filteredRecordsForExport = filteredRecordsForExport.filter((record) => {
				const recordDate = new Date(record.updatedAt);
				return (
					recordDate >= new Date(exportOptions.startDate) &&
					recordDate <= new Date(exportOptions.endDate)
				);
			});
		}

		// Year Filter
		if (exportOptions.selectedYear) {
			filteredRecordsForExport = filteredRecordsForExport.filter((record) => {
				const recordYear = new Date(record.updatedAt).getFullYear();
				return recordYear === parseInt(exportOptions.selectedYear);
			});
		}

		// Month Filter
		if (exportOptions.selectedMonth) {
			filteredRecordsForExport = filteredRecordsForExport.filter((record) => {
				const recordMonth = new Date(record.updatedAt).getMonth() + 1;
				return recordMonth === parseInt(exportOptions.selectedMonth);
			});
		}

		// Form Types Filter
		if (exportOptions.selectedFormTypes.length > 0) {
			filteredRecordsForExport = filteredRecordsForExport.filter((record) =>
				exportOptions.selectedFormTypes.includes(record.documentType)
			);
		}

    if (exportOptions.selectedStatus) {
      filteredRecordsForExport = filteredRecordsForExport.filter(
        (record) => record.requestStatus === exportOptions.selectedStatus
      );
    }

		const tableRows = filteredRecordsForExport.map((record) => [
			record.userId?.fName || 'N/A', // Student Name
			record.documentType, // Form Type
			record.requestStatus, // Request Status (Cleared or Rejected)
			new Date(record.updatedAt).toLocaleDateString(), // Date of Completion
		]);

		doc.text('Registrar Transactions Records', 14, 15);
		doc.autoTable({
			startY: 20,
			head: [tableColumn],
			body: tableRows,
		});

		// Generate filename based on export options
		let filename = 'Registrar_Transactions_Records';
		if (exportOptions.startDate && exportOptions.endDate) {
			filename += `_${exportOptions.startDate}_to_${exportOptions.endDate}`;
		}
		if (exportOptions.selectedYear) {
			filename += `_Year_${exportOptions.selectedYear}`;
		}
		if (exportOptions.selectedMonth) {
			filename += `_Month_${exportOptions.selectedMonth}`;
		}
		if (exportOptions.selectedFormTypes.length > 0) {
			filename += `_Forms_${exportOptions.selectedFormTypes.join('_')}`;
		}
		filename += '.pdf';

		doc.save(filename);
		setShowExportModal(false);
	};

	const renderExportModal = () => {
		const currentYear = new Date().getFullYear();
		const years = Array.from({ length: 10 }, (_, i) => currentYear - i);
		const months = [
			{ value: 1, label: 'January' },
			{ value: 2, label: 'February' },
			{ value: 3, label: 'March' },
			{ value: 4, label: 'April' },
			{ value: 5, label: 'May' },
			{ value: 6, label: 'June' },
			{ value: 7, label: 'July' },
			{ value: 8, label: 'August' },
			{ value: 9, label: 'September' },
			{ value: 10, label: 'October' },
			{ value: 11, label: 'November' },
			{ value: 12, label: 'December' },
		];

		// Handle form type selection
		const handleFormTypeToggle = (formType) => {
			setExportOptions((prev) => ({
				...prev,
				selectedFormTypes: prev.selectedFormTypes.includes(formType)
					? prev.selectedFormTypes.filter((type) => type !== formType)
					: [...prev.selectedFormTypes, formType],
			}));
		};

		return (
			<div
				className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
				role="dialog"
				aria-labelledby="exportModalTitle"
				aria-describedby="exportModalDescription">
				<div className="bg-white rounded-lg shadow-xl w-[80vw] p-6 m-12 relative max-h-[90vh] overflow-y-auto animate-fade-in">
					<button
						onClick={() => setShowExportModal(false)}
						className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring focus:ring-gray-300 rounded-full"
						aria-label="Close export modal">
						<X className="w-6 h-6" />
					</button>
					<h2
						id="exportModalTitle"
						className="text-xl font-bold text-gray-800 mb-4 text-center">
						Export Options
					</h2>
					<p id="exportModalDescription" className="text-sm text-gray-600 mb-6 text-center">
						Select your preferred filters to export the data.
					</p>

					{/* Date Range Section */}
					<div className="mb-4">
						<label className="block mb-2 font-semibold text-gray-700">Date Range</label>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
							<input
								type="date"
								className="border rounded p-2 w-full focus:ring focus:ring-blue-300"
								value={exportOptions.startDate}
								onChange={(e) =>
									setExportOptions((prev) => ({ ...prev, startDate: e.target.value }))
								}
							/>
							<input
								type="date"
								className="border rounded p-2 w-full focus:ring focus:ring-blue-300"
								value={exportOptions.endDate}
								onChange={(e) =>
									setExportOptions((prev) => ({ ...prev, endDate: e.target.value }))
								}
							/>
						</div>
					</div>

					{/* Year Selection */}
					<div className="mb-4">
						<label className="block mb-2 font-semibold text-gray-700">Select Year</label>
						<select
							className="border rounded p-2 w-full focus:ring focus:ring-blue-300"
							value={exportOptions.selectedYear}
							onChange={(e) =>
								setExportOptions((prev) => ({ ...prev, selectedYear: e.target.value }))
							}>
							<option value="">All Years</option>
							{years.map((year) => (
								<option key={year} value={year}>
									{year}
								</option>
							))}
						</select>
					</div>

					{/* Month Selection */}
					<div className="mb-4">
						<label className="block mb-2 font-semibold text-gray-700">Select Month</label>
						<select
							className="border rounded p-2 w-full focus:ring focus:ring-blue-300"
							value={exportOptions.selectedMonth}
							onChange={(e) =>
								setExportOptions((prev) => ({ ...prev, selectedMonth: e.target.value }))
							}>
							<option value="">All Months</option>
							{months.map((month) => (
								<option key={month.value} value={month.value}>
									{month.label}
								</option>
							))}
						</select>
					</div>

					<div className="mb-4">
						<label className="block mb-2 font-semibold text-gray-700">
							Select Request Status
						</label>
						<select
							value={exportOptions.selectedStatus || ''}
							onChange={(e) =>
								setExportOptions((prev) => ({
									...prev,
									selectedStatus: e.target.value || null,
								}))
							}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
							<option value="">All</option>
							<option value="Cleared">Cleared</option>
							<option value="Rejected">Rejected</option>
						</select>
					</div>
					{/* Form Types Selection */}
					<div className="mb-4">
						<label className="block mb-2 font-semibold text-gray-700">
							Select Form Types
						</label>
						<div className="flex flex-row flex-wrap gap-5 space-y-1">
							{DOCUMENT_TYPES.map((type) => (
								<label key={type} className="flex items-center text-gray-700">
									<input
										type="checkbox"
										checked={exportOptions.selectedFormTypes.includes(type)}
										onChange={() => handleFormTypeToggle(type)}
										className="mr-2 focus:ring focus:ring-blue-300"
									/>
									{type}
								</label>
							))}
						</div>
					</div>

					{/* Action Buttons */}
					<div className="flex justify-end space-x-3">
						<button
							onClick={() => setShowExportModal(false)}
							className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded focus:outline-none focus:ring focus:ring-gray-300">
							Cancel
						</button>
						<button
							onClick={handleExport}
							className="px-4 py-2 bg-[#0b1933] hover:bg-[#fcb414] text-white rounded focus:outline-none focus:ring focus:ring-blue-300">
							Export
						</button>
					</div>
				</div>
			</div>
		);
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
							onClick={() => window.location.reload()}>
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
						<h1 className="text-xl md:text-3xl font-bold text-white">Registrar Records</h1>
					</div>
					<button
						onClick={() => setShowExportModal(true)}
						className="flex items-center space-x-2 bg-white text-blue-600 px-3 py-2 md:px-4 md:py-2 rounded-lg hover:bg-blue-50 transition-colors text-sm md:text-base">
						<Download className="w-4 h-4 md:w-5 md:h-5" />
						<span>Export PDF</span>
					</button>
				</div>
				{showExportModal && renderExportModal()}
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
								onChange={(e) =>
									setFilters((prev) => ({ ...prev, searchQuery: e.target.value, page: 1 }))
								}
							/>
						</div>

						<div className="relative col-span-1">
							<Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
							<select
								className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
								value={filters.documentType}
								onChange={(e) =>
									setFilters((prev) => ({
										...prev,
										documentType: e.target.value,
										page: 1,
									}))
								}>
								<option value="">All Types</option>
								{DOCUMENT_TYPES.map((type) => (
									<option key={type} value={type}>
										{type}
									</option>
								))}
							</select>
						</div>

						<div className="relative col-span-1">
							<Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
							<input
								type="date"
								className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
								value={filters.dateFilter}
								onChange={(e) =>
									setFilters((prev) => ({ ...prev, dateFilter: e.target.value, page: 1 }))
								}
							/>
						</div>
					</div>
				</div>

				{/* Table Container with Scrollable Body */}
				<div className="flex-grow overflow-auto">
					<table className="w-full table-auto">
						<thead className="sticky top-0 bg-gray-100 border-b z-10">
							<tr>
								{['Student Name', 'Form Type', 'Request Status', 'Date of Completion'].map(
									(header) => (
										<th
											key={header}
											className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky top-0 bg-gray-100">
											{header}
										</th>
									)
								)}
							</tr>
						</thead>
						<tbody>
							{paginatedRecords.length > 0 ? (
								paginatedRecords.map((record, index) => (
									<tr key={index} className="hover:bg-blue-50 transition-colors">
										<td className="px-4 py-4 whitespace-nowrap">
											{record.userId?.fName || 'N/A'}
										</td>
										<td className="px-4 py-4 whitespace-nowrap">{record.documentType}</td>
										<td className="px-4 py-4 whitespace-nowrap">
											{record.requestStatus}
										</td>
										<td className="px-4 py-4 whitespace-nowrap">
											{new Date(record.updatedAt).toLocaleDateString()}
										</td>
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
						onClick={() =>
							setFilters((prev) => ({ ...prev, page: Math.max(prev.page - 1, 1) }))
						}
						disabled={filters.page === 1}
						className="flex items-center text-blue-600 disabled:opacity-50">
						<ArrowLeft className="w-5 h-5" />
						<span>Previous</span>
					</button>
					<span className="text-gray-700">
						Page {filters.page} of {totalPages}
					</span>
					<button
						onClick={() =>
							setFilters((prev) => ({ ...prev, page: Math.min(prev.page + 1, totalPages) }))
						}
						disabled={filters.page === totalPages}
						className="flex items-center text-blue-600 disabled:opacity-50">
						<span>Next</span>
						<ArrowRight className="w-5 h-5" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default RecordsTable;
