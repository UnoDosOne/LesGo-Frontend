import React, { useState } from "react";

const UserManagement = () => {
  // Initial dummy data for users
  const initialUsers = [
    { name: "John Doe", email: "john.doe@example.com", role: "Student" },
    { name: "Jane Smith", email: "jane.smith@example.com", role: "Staff" },
    { name: "Mark Johnson", email: "mark.johnson@example.com", role: "Faculty" },
    { name: "Sara Lee", email: "sara.lee@example.com", role: "Admin" },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "" });
  const [filter, setFilter] = useState("");

  const handleAddUser = () => {
    setUsers([...users, newUser]);
    setNewUser({ name: "", email: "", role: "" });
  };

  const handleDeleteUser = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };

  // Filtered users based on the filter input
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(filter.toLowerCase()) ||
      user.email.toLowerCase().includes(filter.toLowerCase()) ||
      user.role.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="p-5 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-blue-900">User Management</h1>

      {/* Filter Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter by name, email, or role"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg w-full"
        />
      </div>

      {/* Add User Form */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="border border-gray-300 p-2 rounded-lg w-full"
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="border border-gray-300 p-2 rounded-lg w-full"
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          className="border border-gray-300 p-2 rounded-lg w-full"
        >
          <option value="">Select Role</option>
          <option value="Student">Student</option>
          <option value="Staff">Staff</option>
          <option value="Faculty">Faculty</option>
          <option value="Admin">Admin</option>
        </select>
        <button onClick={handleAddUser} className="bg-blue-500 text-white p-2 rounded-lg">
          Add User
        </button>
      </div>

      {/* User Table */}
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-900 text-white">
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Role</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2">{user.name}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <td className="border border-gray-300 p-2">{user.role}</td>
              <td className="border border-gray-300 p-2">
                <button onClick={() => handleDeleteUser(index)} className="bg-red-500 text-white p-1 rounded-lg">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
