import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const ActivateAccount = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleActivate = async () => {
    const token = searchParams.get("token");
    if (!token) {
      setError("Invalid activation link.");
      setMessage(""); // Clear success message
      return;
    }

    setLoading(true); // Start loading
    try {
      const response = await axios.get(`http://localhost:5000/api/activate?token=${token}`);
      setMessage(response.data.message || "Your account has been activated successfully!");
      setError(""); // Clear error message
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Something went wrong. Please try again later.";
      setError(errorMessage);
      setMessage(""); // Clear success message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-800 via-yellow-500 to-gray-500 flex items-center justify-center font-sans">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center animate-fadeIn">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Activate Your Account</h1>
        <p className="text-gray-600 mb-6">
          Click the button below to activate your account. This step ensures your email is verified.
        </p>
        {!message && !error && (
          <button
            onClick={handleActivate}
            className={`px-6 py-3 text-white text-lg font-semibold rounded-md transition-all ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-800 hover:bg-yellow-500 hover:scale-105"
            }`}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white mr-2"></div>
                Activating...
              </div>
            ) : (
              "Activate Account"
            )}
          </button>
        )}

        {message && (
          <p className="text-lg font-semibold text-green-600 mt-4 animate-fadeIn">
            {message}
          </p>
        )}
        {error && (
          <p className="text-lg font-semibold text-red-600 mt-4 animate-fadeIn">
            {error}
          </p>
        )}
        <p className="text-gray-400 text-center mt-6 text-sm"> If you encounter issues, contact <a href="mailto:registraroffice1@ustp.edu.ph" className="text-blue-500 underline">registraroffice1@ustp.edu.ph</a>. </p>
      </div>
    </div>
  );
};

export default ActivateAccount;
