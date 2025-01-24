import React, { useState, useEffect, useCallback } from 'react';
import { FaQrcode, FaBell, FaTimesCircle } from 'react-icons/fa';
import QRCode from 'react-qr-code';
import axios from 'axios';

const StudentFeedbacks = () => {
  const [notificationOpen, setNotificationOpen] = useState(true);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [qrData, setQrData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch QR data from backend
 const fetchQrData = useCallback(async () => {
  setLoading(true);
  setError('');

  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found, please log in again.');
    }

    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}api/qrdata`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log('Fetched QR Data:', response.data);
    setQrData(response.data);

    // Persist QR data in local storage
    localStorage.setItem('qrData', JSON.stringify(response.data));
  } catch (err) {
    console.error('Error fetching QR data:', err);

    // User-friendly error message
    setError(
      err.response?.status === 404
        ? 'QR code will only generate on the date appointed.'
        : err.message || 'An unexpected error occurred.'
    );
  } finally {
    setLoading(false);
  }
}, []);


  // Automatically open the QR modal after 3 seconds
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
              onClick={() => {
                setQrModalOpen(true);
                if (!qrData) fetchQrData(); // Fetch data if not already available
              }}
              className="bg-[#0b1933] text-white px-6 py-3 rounded-lg hover:bg-[#fcb414] transition-colors duration-300 flex items-center space-x-2"
            >
              <FaQrcode />
              <span>View My QR Code</span>
            </button>
          </div>

          {/* Additional Info */}
          <div className="text-center text-gray-600">
            <p className="text-sm">Scan the QR code to finish the transaction.</p>
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
              Your QR Code isn't ready yet.
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

            <div className="bg-white p-4 rounded-xl mb-4">
              {loading ? (
                <p>Loading QR Code...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : qrData ? (
                <div style={{ height: 'auto', margin: '0 auto', maxWidth: 256, width: '100%' }}>
                  <QRCode
                    size={128}
                    style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                    value={JSON.stringify(qrData)}
                    viewBox={`0 0 128 128`}
                  />
                </div>
              ) : (
                <p>QR Code will generate on the date appointed.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentFeedbacks;