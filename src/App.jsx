import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Student from "./pages/Student";
import Registrar from "./pages/Registrar";
import Admin from "./pages/Admin"; // Import your Admin component
import ForgotPassword from "./screens/root/ForgotPassword.jsx";
import Errorpage from "./pages/Errorpage.jsx";
import Login from "./screens/root/Login.jsx"; // Import your Login component
import { useEffect, useState } from "react";
import ActivateAccount from "./components/rootComponents/ActivateAccount.jsx"; 
import ResetPassword from "./components/rootComponents/ResetPassword.jsx";

export default function App() {
  // United States 
  const [user, setUser] = useState({}); // Manage user state
  const navigate = useNavigate();

  // async function
  const decodeTokenFunction = () => {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          // Decode the JWT token (assuming the token is a base64 encoded JSON)
          const decodedUser = JSON.parse(atob(token.split(".")[1]));
          resolve(decodedUser);
        } catch (error) {
          reject("Failed to decode token");
        }
      } else {
        reject("No token found");
      }
    });
  };

  // useEffect
  useEffect(() => {
    const fetchFunctionUser = async () => {
      try {
        const decodedUser = await decodeTokenFunction();
        setUser(decodedUser);
      } catch (error) {
        throw error;
      }
    };
    fetchFunctionUser();
  }, [navigate]);


  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/activate" element={<ActivateAccount />} /> {/* Add Activation Route */}
        

        {user?.userType === "student" && (
          <Route path="/student/*" element={<Student user={user} />} />
        )}

        {user?.userType === "registrar" && (
          <Route path="/registrar/*" element={<Registrar user={user} />} />
        )}

        {user?.userType === "admin" && ( // Admin route
          <Route path="/admin/*" element={<Admin user={user} />} />
        )}

        {/* Catch-all route for non-existent routes */}
        <Route path="*" element={<Errorpage />} />
      </Routes>
    </div>
  );
}
