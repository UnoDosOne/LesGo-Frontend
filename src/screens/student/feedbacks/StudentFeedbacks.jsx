import React, { useState, useEffect } from 'react';
import { FaQrcode, FaBell, FaTimesCircle } from 'react-icons/fa';

const StudentFeedbacks = () => {
  const [notificationOpen, setNotificationOpen] = useState(true);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [isQRReady, setIsQRReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotificationOpen(false);
      setQrModalOpen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#0b1933] text-white p-4 text-center">
          <h2 className="text-2xl font-bold">Student Feedback</h2>
        </div>

        {/* QR Code Section */}
        <div className="p-6 flex flex-col items-center space-y-6">
          <div className="bg-blue-50 p-6 rounded-xl shadow-md">
            <FaQrcode className="text-7xl text-[#0b1933] mx-auto mb-4" />
            <button 
              onClick={() => setQrModalOpen(true)}
              className="bg-[#0b1933] text-white px-6 py-3 rounded-lg hover:bg-[#fcb414] transition-colors duration-300 flex items-center space-x-2"
            >
              <FaQrcode />
              <span>View My QR Code</span>
            </button>
          </div>

          {/* Additional Info */}
          <div className="text-center text-gray-600">
            <p className="text-sm">
              Scan the QR code to finish transaction.
            </p>
          </div>
        </div>
      </div>

      {/* Notification Modal */}
      {notificationOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-center shadow-2xl">
            <FaBell className="text-7xl text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-4">Notice!</h3>
            <p className="text-gray-600 mb-6">
              Your QR Code isn't ready yet. The staff will assign it to you when it's ready.
            </p>
            <button 
              onClick={() => setNotificationOpen(false)}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {qrModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-center relative shadow-2xl">
            <button 
              onClick={() => setQrModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <FaTimesCircle className="text-2xl" />
            </button>
            
            <h3 className="text-xl font-bold text-gray-800 mb-4">Your QR Code</h3>
            
            <div className="bg-blue-50 p-4 rounded-xl mb-4">
              <p>basta qr ni dari</p>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">
              This QR Code will vanish at 8 PM today!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentFeedbacks;