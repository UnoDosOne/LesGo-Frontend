import React, { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaExchangeAlt,
} from "react-icons/fa";
import Pagination from "../../pagination/pagination";
import YesOrNoModal from "../../rootComponents/Modals/YesOrNoModal";
import LoadingModal from "../../rootComponents/Modals/LoadingModal";
import NotificationModal from "../../rootComponents/Modals/NotificationModal";
import axios from "axios";

const RecordsTable = () => {
  // const initialRecords = [
  //   {
  //     formType: "Transcript of Records",
  //     dateToAttend: "01-08-2024",
  //     timeToAttend: "10:00 AM",
  //     received: true,

  //     status: {
  //       received: true,
  //     },
  //   },
  //   {
  //     formType: "Diploma Replacement",
  //     dateToAttend: "02-08-2024",
  //     timeToAttend: "11:00 AM",
  //     received: false,
  //   },
  //   {
  //     formType: "SF 10",
  //     dateToAttend: "03-08-2024",
  //     timeToAttend: "12:00 PM",
  //     received: false,
  //   },
  //   {
  //     formType: "Evaluation",
  //     dateToAttend: "04-08-2024",
  //     timeToAttend: "01:00 PM",
  //     received: false,
  //   },
  // ];

  const [records, setRecords] = useState([]);

  const fetchRecordsList = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${API_BASE_URL}/api/get-records-list`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setRecords(response.data.recordsList);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    fetchRecordsList();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [formTypeFilter, setFormTypeFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [receivedFilter, setReceivedFilter] = useState("");
  const [showReschedModal, setShowReschedModal] = useState(false);
  const [selectedData, setSelectedData] = useState("");
  const [isLoading, setIsLoading] = useState(null);
  const [notifcationModal, setNotificationModal] = useState(false);
  const itemsPerPage = 7;

  const months = [
    { value: "", label: "All Months" },
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const years = [
    { value: "", label: "All Years" },
    {value: "2025", label: "2025"},
    { value: "2024", label: "2024" },
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" },
    { value: "2021", label: "2021" },
    // Add more years as needed
  ];

  const handleReschedule = (index) => {
    const updatedRecords = [...records];
    updatedRecords[index].completed = true;
    setRecords(updatedRecords);
    setIsLoading(true);
  };

  useEffect(() => {
    const timerNotif = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
        setNotificationModal(true);
      }
    }, 3000);

    return () => clearTimeout(timerNotif);
  }, [isLoading]);

  const filteredRecords = records.filter((record) => {
    const recordDate = new Date(record.date_appointed);
    const recordMonth = recordDate.getMonth() + 1;
    const recordYear = recordDate.getFullYear();

    return (
      (monthFilter === "" || recordMonth.toString() === monthFilter) &&
      (yearFilter === "" || recordYear.toString() === yearFilter) &&
      (receivedFilter === "" ||
        (receivedFilter === "received" && record.completed === true) ||
        (receivedFilter === "not_received" && record.completed === false))
    );
  });

  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);

  const currentRecords = filteredRecords.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mx-auto px-4 py-4 md:py-8">
      {/* Modals */}
      {isLoading && <LoadingModal isOpen={true} />}
      <NotificationModal
        isOpen={notifcationModal}
        setIsOpen={() => setNotificationModal(false)}
        message="QR Code and Attendance Date has been set to a new date. Please check the new schedule and plan accordingly."
      />

      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#0b1933] text-white px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          <h2 className="text-base md:text-xl font-semibold flex items-center">
            <FaCalendarAlt className="mr-2 md:mr-3" />
            Records Management
          </h2>
        </div>

        {/* Filters */}
        <div className="px-4 md:px-6 py-4 bg-gray-100 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          <div className="flex items-center">
            <FaClock className="mr-2 text-gray-500" />
            <select
              className="w-full border rounded p-2 text-sm md:text-base"
              value={monthFilter}
              onChange={(e) => setMonthFilter(e.target.value)}
            >
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center">
            <FaCalendarAlt className="mr-2 text-gray-500" />
            <select
              className="w-full border rounded p-2 text-sm md:text-base"
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
            >
              {years.map((year) => (
                <option key={year.value} value={year.value}>
                  {year.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center">
            <FaCheckCircle className="mr-2 text-gray-500" />
            <select
              className="w-full border rounded p-2 text-sm md:text-base"
              value={receivedFilter}
              onChange={(e) => setReceivedFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="received">Received</option>
              <option value="not_received">Not Received</option>
            </select>
          </div>
        </div>

        {/* Table Container with Scrolling */}
        <div className="max-h-[500px] overflow-y-auto">
          <table className="w-full">
            {/* Table Header */}
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Form Type
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date and Time
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-200">
              {currentRecords.map((record, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm md:text-base">
                    {record.documentType}
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm md:text-base">
                    {record.date_appointed.split("T")[0]} || {record.date_appointed.split("T")[1].replace("Z", "")}
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    {record.completed ? (
                      <span className="inline-flex items-center px-2 md:px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <FaCheckCircle className="mr-1" />
                        Received
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 md:px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <FaCheckCircle className="mr-1" />
                        Not Received
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {/* Reschedule Modal */}
      <YesOrNoModal
        isOpen={showReschedModal}
        setIsOpen={setShowReschedModal}
        onConfirm={() => {
          handleReschedule(selectedData);
        }}
        titleName={"Are you sure you want to reschedule this record?"}
      />
    </div>
  );
};

export default RecordsTable;
