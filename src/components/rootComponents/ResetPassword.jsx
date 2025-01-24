import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [searchParams] = useSearchParams(); // Extract query parameters
  const [newPassword, setNewPassword] = useState(""); // State for the new password
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirm password
  const [message, setMessage] = useState(""); // Success message
  const [error, setError] = useState(""); // Error message
  const [loading, setLoading] = useState(false); // Loading state
  const [buttonDisabled, setButtonDisabled] = useState(false); // Disable button after success
  const [countdown, setCountdown] = useState(10); // Countdown timer

  const handleResetPassword = async () => {
    setError("");
    setMessage("");
    setLoading(true);

    // Ensure both password fields match
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/reset-password", {
        token: searchParams.get("token"), // Get token from the URL
        newPassword, // Password entered by the user
      });
      setMessage(response.data.message || "Password reset successfully!");

      // Disable the button to prevent further clicks
      setButtonDisabled(true);

      // Start countdown to close or redirect the page
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            window.close(); // Close the page
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-800 via-yellow-500 to-gray-500">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
        <p className="mb-2 text-gray-600">Enter your new password below.</p>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-md mb-4"
          placeholder="New Password"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-md mb-4"
          placeholder="Confirm Password"
        />
        <button
          onClick={handleResetPassword}
          className={`w-full ${
            buttonDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-800 hover:bg-yellow-500 hover:scale-105"
          } text-white py-2 px-4 rounded-md transition duration-300`}
          disabled={buttonDisabled || loading}
        >
          {loading ? "Processing..." : "Reset Password"}
        </button>
        {message && (
          <p className="mt-4 text-green-600">
            {message} {buttonDisabled && `Page will close in ${countdown} seconds.`}
          </p>
        )}
        {error && <p className="mt-4 text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
