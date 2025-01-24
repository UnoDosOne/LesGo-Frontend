import React, { useState, useEffect } from 'react';
import {
  IoIosPeople,
  IoIosListBox,
  IoIosAlbums,
  IoIosNotifications,
  IoIosChatboxes,
  IoMdLogOut,
  IoMdPaperPlane,
  IoMdMenu,
  IoMdQrScanner
} from 'react-icons/io';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [pendingRequestsCount, setPendingRequestsCount] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await axios.get('http://localhost:5000/api/request', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const pendingRequests = response.data.filter(
          (request) => request.requestStatus === 'Pending'
        );

        setPendingRequestsCount(pendingRequests.length);
        localStorage.setItem('pendingRequestsCount', pendingRequests.length.toString());
      } catch (error) {
        console.error('Error fetching pending requests:', error);
      }
    };

    fetchPendingRequests();
  }, []);

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    {
      path: '/student/queue',
      label: "Today's Queue",
      icon: IoIosPeople,
    },
    {
      path: '/student/forms',
      label: 'Request Forms',
      icon: IoIosListBox,
    },
    {
      path: '/student/requests',
      label: 'My Requests',
      icon: IoMdPaperPlane,
    },
    {
      path: '/student/notifications',
      label: 'Notifications',
      icon: IoIosNotifications,
    },
    {
      path: '/student/records',
      label: 'Records',
      icon: IoIosAlbums,
    },
    {
      path: '/student/feedbacks',
      label: 'My QR',
      icon: IoMdQrScanner,
    },
    {
      path: '/student/survey',
      label: 'Feedbacks',
      icon: IoIosChatboxes,
    },
  ];

  return (
    <div className="relative h-full">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-100 rounded-full shadow-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <IoMdMenu className="w-6 h-6 text-gray-600" />
      </button>

      {/* Sidebar */}
      <aside
        className={`
          h-full bg-white shadow-lg z-50 transform transition-transform duration-300
          ${isSidebarOpen 
            ? 'fixed top-0 left-0 w-72 translate-x-0' 
            : 'fixed top-0 left-0 w-72 translate-x-[-100%]'}
          md:sticky md:top-0 md:left-0 md:w-72 md:translate-x-0
          flex flex-col`}
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center border-b py-6 px-4">
          <img src="/images/lesgologo.png" alt="Logo" className="w-16 h-16 mb-3 object-contain" />
          <h1 className="text-xl font-semibold text-[#fcb414]">
            <span className="text-[#0b1933]">Queue</span>Ease
          </h1>
        </div>

        {/* Navigation Section */}
        <nav className="p-4">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.path} className="relative">
                <button
                  onClick={() => {
                    navigate(item.path);
                    setIsSidebarOpen(false); 
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm
                    ${isActive(item.path)
                      ? 'bg-[rgba(252,180,10,0.1)] text-amber-500 font-medium'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
                    transition-colors duration-200`}
                >
                  <item.icon
                    className={`w-5 h-5 
                      ${isActive(item.path) ? 'text-[#fcb414]' : 'text-gray-500'}
                    `}
                  />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Section */}
        <div className="absolute bottom-14 left-0 right-0 border-t p-4">
          <button
            onClick={() => {
              navigate('/');
              localStorage.removeItem('token');
              setIsSidebarOpen(false);
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md 
              text-sm text-red-600 hover:bg-red-50 
              transition-colors duration-200"
          >
            <IoMdLogOut className="w-5 h-5 text-red-600" />
            Logout
          </button>
        </div>
      </aside>

      {/* Backdrop for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div
        className={`transition-all duration-300 
          md:ml-72`}
      >
      </div>
    </div>
  );
};

export default Sidebar;