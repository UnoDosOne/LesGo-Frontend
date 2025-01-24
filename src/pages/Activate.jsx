import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const Activate = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const activateAccount = async () => {
      const token = searchParams.get("token");

      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}api/auth/activate?token=${token}`);
        setMessage(response.data.message);
      } catch (error) {
        setError(error.response?.data?.message || "Activation failed. Please try again.");
      }
    };

    activateAccount();
  }, [searchParams]);

  return (
    <div>
      {message ? <h1>{message}</h1> : <h1>{error}</h1>}
    </div>
  );
};

export default Activate;
