// UserContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the UserContext
const UserContext = createContext();

// Custom hook to use the user context
export const useUser = () => {
  return useContext(UserContext);
};

// UserProvider component to provide the user context
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({}); // Manage user state

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // Decode the token to get user info (You might want to use a library like jwt-decode)
        const decodedUser = JSON.parse(atob(token.split('.')[1])); // This assumes your token is a JWT
        setUser(decodedUser);
        console.log(decodedUser);
      } catch (err) {
        console.error('Error decoding token', err);
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
