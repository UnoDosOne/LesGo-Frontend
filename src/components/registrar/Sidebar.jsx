import React, { useState, useEffect } from 'react';
import {
    IoIosPeople,
    IoIosListBox,
    IoIosAlbums,
    IoIosNotifications,
    IoMdLogOut,
} from 'react-icons/io';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [hasActiveQueue, setHasActiveQueue] = useState(false);
    const [pendingRequestsCount, setPendingRequestsCount] = useState(0);

    useEffect(() => {
        // Check active queue from localStorage
        const isTimerRunning = localStorage.getItem('isTimerRunning') === 'true';
        setHasActiveQueue(isTimerRunning);

        // Fetch pending requests
        const fetchPendingRequests = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const response = await axios.get('http://localhost:5000/api/request', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const pendingRequests = response.data.filter(
                    request => request.requestStatus === 'Pending'
                );

                setPendingRequestsCount(pendingRequests.length);
                localStorage.setItem('pendingRequestsCount', pendingRequests.length.toString());
            } catch (error) {
                console.error('Error fetching pending requests:', error);
            }
        };

        const storedPendingRequests = localStorage.getItem('pendingRequestsCount');
        if (storedPendingRequests) {
            setPendingRequestsCount(parseInt(storedPendingRequests));
        }

        fetchPendingRequests();
        const handleStorageChange = (e) => {
            if (e.key === 'isTimerRunning') {
                setHasActiveQueue(e.newValue === 'true');
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const isActive = (path) => location.pathname === path;

    const menuItems = [
        { 
            path: '/registrar/queue', 
            label: "Today's Queue", 
            icon: IoIosPeople,
        },
        { 
            path: '/registrar/requests', 
            label: 'Requests', 
            icon: IoIosListBox,
            hasBadge: pendingRequestsCount > 0,
            badgeCount: pendingRequestsCount
        },
        { path: '/registrar/records', label: 'Records', icon: IoIosAlbums },
        { path: '/registrar/notifications', label: 'Logs', icon: IoIosNotifications },
    ];

    return (
        <aside className="h-full w-72 sticky top-0 bg-white shadow-lg flex flex-col">
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
                                onClick={() => navigate(item.path)}
                                className={`
                                    w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm
                                    ${isActive(item.path)
                                        ? 'bg-[rgba(252,180,10,0.1)] text-amber-500 font-medium'
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                    }
                                    transition-colors duration-200
                                `}>
                                <item.icon
                                    className={`
                                        w-5 h-5 
                                        ${isActive(item.path) ? 'text-[#fcb414]' : 'text-gray-500'}
                                    `}
                                />
                                {item.label}
                                
                                {item.hasBadge && (
                                    <span className="absolute right-0 top-1/2 -translate-y-1/2 
                                        bg-red-500 text-white text-xs rounded-full 
                                        w-5 h-5 flex items-center justify-center">
                                        {item.badgeCount || 1}
                                    </span>
                                )}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Logout Section */}
            <div className="absolute bottom-10 left-0 right-0 border-t p-4">
                <button
                    onClick={() => {
                        navigate('/');
						localStorage.clear();
                    }}
                    className="
                        w-full flex items-center gap-3 px-3 py-2 rounded-md 
                        text-sm text-red-600 hover:bg-red-50 
                        transition-colors duration-200
                    ">
                    <IoMdLogOut className="w-5 h-5 text-red-600" />
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;