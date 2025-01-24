import React, { useState, useMemo, useEffect } from "react";
import {
  Filter,
  ArrowUpDown,
  CheckCircle,
  AlertCircle,
  Clock,
  FileText,
  RefreshCw,
  OctagonX,
} from "lucide-react";
import axios from "axios";

const NotificationTypes = {
  Pending: {
    icon: RefreshCw,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  Rejected: {
    icon: OctagonX,
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
  Cleared: {
    icon: FileText,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
};

const NotificationTable = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found. Please log in.");
      return;
    }

    const eventSource = new EventSource(
      `${import.meta.env.VITE_API_BASE_URL}api/notifications?token=${token}`
    );

    eventSource.onmessage = (event) => {
      const newNotification = JSON.parse(event.data);
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        newNotification,
      ]);
    };

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const [filters, setFilters] = useState({
    type: "",
    status: "",
    sortOrder: "desc",
  });

  const filteredNotifications = useMemo(() => {
    return notifications
      .filter(
        (notification) =>
          (!filters.type || notification.type === filters.type) &&
          (filters.status === "" ||
            (filters.status === "read" && notification.read) ||
            (filters.status === "unread" && !notification.read))
      )
      .sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return filters.sortOrder === "desc" ? dateB - dateA : dateA - dateB;
      });
  }, [notifications, filters]);

  const markAsRead = async (id) => {
    try {
      const request = await axios.put(
        "http://localhost:5000/api/updateNotification",
        { id: id }
      );

      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === id
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const renderFilterDropdown = (
    value,
    options,
    onChange,
    placeholder = "Select Option"
  ) => (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="appearance-none w-full pl-3 pr-10 py-2 
        border border-gray-300 rounded-md 
        focus:outline-none focus:ring-2 focus:ring-blue-500
        text-sm text-gray-700"
      >
        <option value="">{placeholder}</option>
        {Object.entries(options).map(([key, label]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <Filter className="w-4 h-4" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Audit Logs & Notifications
          </h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              Total Notifications: {filteredNotifications.length}
            </span>
            <button
              className="text-blue-600 hover:bg-blue-50 p-2 rounded-full"
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </header>

        <div className="bg-white shadow-md rounded-lg">
          {/* Filters */}
          <div className="p-4 border-b border-gray-200 grid grid-cols-3 gap-4">
            {renderFilterDropdown(
              filters.type,
              {
                Cleared: "Cleared",
                Pending: "Pending",
                Rejected: "Rejected",
              },
              (e) => setFilters((prev) => ({ ...prev, type: e.target.value })),
              "All Notification Types"
            )}

            {renderFilterDropdown(
              filters.status,
              { read: "Read", unread: "Unread" },
              (e) =>
                setFilters((prev) => ({ ...prev, status: e.target.value })),
              "Notification Status"
            )}

            {renderFilterDropdown(
              filters.sortOrder,
              { desc: "Newest First", asc: "Oldest First" },
              (e) =>
                setFilters((prev) => ({ ...prev, sortOrder: e.target.value })),
              "Sort Order"
            )}
          </div>

          {/* Notification List */}
          <div className="max-h-[70vh] overflow-y-auto">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                <AlertCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p>No notifications found</p>
              </div>
            ) : (
              filteredNotifications.map((notification) => {
                const TypeConfig = NotificationTypes[notification.type] || {};
                const TypeIcon = TypeConfig.icon || AlertCircle;

                return (
                  <div
                    key={notification.id}
                    className={`
                      p-4 border-b border-gray-200 flex items-start 
                      hover:bg-gray-50 transition-colors cursor-pointer
                      ${notification.read ? "opacity-60" : ""}
                    `}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div
                      className={`
                      mr-4 p-2 rounded-full 
                      ${TypeConfig.bgColor || "bg-gray-100"}
                    `}
                    >
                      <TypeIcon
                        className={`w-6 h-6 ${
                          TypeConfig.color || "text-gray-500"
                        }`}
                      />
                    </div>

                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-800">
                          {notification.formType}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {new Date(
                            notification.createdAt
                          ).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {notification.message}
                      </p>
                    </div>

                    {notification.read && (
                      <CheckCircle className="w-5 h-5 text-green-500 ml-4" />
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationTable;
