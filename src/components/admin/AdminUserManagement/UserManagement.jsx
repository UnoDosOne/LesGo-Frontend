import React, { useState, useEffect } from "react";
import axios from "axios";
import MessagesModal from "../../rootComponents/Modals/MessagesModal";

const UserManagement = () => {
  // State management for users, newUser, and filter
  const [users, setUsers] = useState([]);
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    department: "",
    role: "",
    id: "",
  });
  const [filter, setFilter] = useState("");

  const departments = [
    "Technology and Livelihood Education",
    "Technical-Vocational Teacher Education",
    "Technology, Operations, and Management",
    "Architecture",
    "Civil Engineering",
    "Electronics Engineering",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Computer Engineering",
    "Geodetic Engineering",
    "Data Science",
    "Computer Science",
    "Information Technology",
    "Technology Communication Management",
    "Applied Physics",
    "Applied Mathematics",
    "Chemistry",
    "Environmental Science",
    "Food Technology",
    "Autotronics",
    "Electronics Technology",
    "Energy Systems and Management",
    "Electro-Mechanical Technology",
    "Manufacturing Engineering Technology",
    "Secondary Education",
  ];

  // // Fetch users from the backend when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/getall-users`
      );

      if (Array.isArray(response?.data?.data)) {
        setUsers(response?.data?.data);
      } else {
        console.error("API response is not an array", response?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };


  // Add new user to the backend
  const handleAddUser = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/add-user`,
        newUser
      );
      
      setUsers([...users, response.data]);
      setNewUser({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        department: "",
        role: "",
        id: "",
      });
  
      if (response.status === 201) {
        setModalMessage("Account Created Successfully! Head To Email for Activation");
        setIsModalOpen(true);
        setTimeout(() => window.location.reload(), 3000);
      }
    } catch (error) {
      console.error("Error adding user:", error);
  
      setModalMessage("Account Creation Failed. Please Fill the Requirement Carefully.");
      setIsModalOpen(true);
  
      // Close modal after 2 seconds
      setTimeout(() => {
        setIsModalOpen(false);
      }, 2000);
  
      // Optionally handle a redirection (e.g., back to the previous page)
      setTimeout(() => {
        window.location.back(); // Or provide a specific URL for redirection
      }, 2000);
    }
  };
  

  // Delete user from the backend
  const handleDeleteUser = async (id) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}api/delete-user`, { id: id });
      // setUsers(users.filter((user) => user._id !== id)); // Update state after deletion

      if (response.status === 201) {
        setModalMessage("User Successfully Deactivated!");
        setIsModalOpen(true);
        setTimeout(() => window.location.reload(), 3000);
      }

      window.location.reload()
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Filter users based on the filter input
  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName || ""} ${user.lastName || ""}`.toLowerCase();
    const email = (user.email || "").toLowerCase();
    const role = (user.role || "").toLowerCase();
    const department = (user.department || "").toLowerCase();
    const searchQuery = filter.toLowerCase();

    return (
      fullName.includes(searchQuery) ||
      email.includes(searchQuery) ||
      role.includes(searchQuery) ||
      department.includes(searchQuery)
    );
  });

  return (
    <div className="p-5 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-blue-900">User Management</h1>

      {/* Filter Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter by name, email, role, or department"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg w-full"
        />
      </div>

      {/* Add User Form */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="First Name"
          value={newUser.firstName}
          onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
          className="border border-gray-300 p-2 rounded-lg w-full"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={newUser.lastName}
          onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
          className="border border-gray-300 p-2 rounded-lg w-full"
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="border border-gray-300 p-2 rounded-lg w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          className="border border-gray-300 p-2 rounded-lg w-full"
        />
        <input
          type="text"
          placeholder="User ID"
          value={newUser.id}
          onChange={(e) => setNewUser({ ...newUser, id: e.target.value })}
          className="border border-gray-300 p-2 rounded-lg w-full"
        />
        <select
          value={newUser.department}
          onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
          className="border border-gray-300 p-2 rounded-lg w-full"
        >
          <option value="">Select Department</option>
          {departments.map((department, index) => (
            <option key={index} value={department}>
              {department}
            </option>
          ))}
        </select>
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          className="border border-gray-300 p-2 rounded-lg w-full"
        >
          <option value="">Select Role</option>
          <option value="Staff">Staff</option>
          <option value="registrar">Registrar</option>
          <option value="Admin">Admin</option>
        </select>
        <button
          onClick={handleAddUser}
          className="bg-blue-500 text-white p-2 rounded-lg"
        >
          Add User
        </button>
      </div>

      {/* User Table */}
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-900 text-white">
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Department</th>
            <th className="border border-gray-300 p-2">Role</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id} className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2 text-center">
                {user.fName} {user.lastName ? user.lastName : ""}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {user.email}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {user.department}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {user.role}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="bg-red-500 text-white p-1 rounded-lg"
                >
                  Deactivate
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <MessagesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={modalMessage}
      />
    </div>
  );
};

export default UserManagement;
