import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false); // Disable button after sending
  const [countdown, setCountdown] = useState(30); // Countdown for re-enabling button
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate("/"); // Navigate back to the login page
  };

  const handleForgotPassword = async () => {
    try {
      setError("");
      setMessage("");

      console.log("Sending email:", email); // Log the email being sent

      const response = await axios.post(`${API_BASE_URL}/api/forgot-password`, {
        email,
      });

      console.log("Response from backend:", response.data); // Log the response
      setMessage(response.data.message);

      // Disable button for 30 seconds
      setButtonDisabled(true);
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setButtonDisabled(false);
            setCountdown(30); // Reset countdown
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      console.error("Error during forgot password request:", err); // Log the error
      setError(err.response?.data?.message || "Failed to send password reset link. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-800 via-yellow-500 to-gray-500">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        {/* Back Arrow */}
        <div className="mb-4">
          <button
            onClick={handleBackToLogin}
            className="flex items-center text-gray-600 hover:text-gray-800 transition duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
        <p className="mt-2 text-sm text-gray-600">
          Enter your email to receive a password reset link.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleForgotPassword();
          }}
          className="mt-6"
        >
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className={`mt-4 w-full ${
              buttonDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-800 hover:bg-yellow-500 hover:scale-95"
            } text-white py-2 px-4 rounded-md shadow focus:ring focus:ring-indigo-200 focus:outline-none`}
            disabled={buttonDisabled}
          >
            {buttonDisabled ? `Try again in ${countdown}s` : "Send Reset Link"}
          </button>
        </form>

        {message && <p className="mt-4 text-sm text-green-600">{message}</p>}
        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
