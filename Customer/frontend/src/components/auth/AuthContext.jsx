import React, { createContext, useState, useEffect } from 'react';
import UserService from '../service/UserService';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(UserService.isAuthenticated());
  const [isAdmin, setIsAdmin] = useState(UserService.isAdmin());

  const setAuthStatus = (authStatus, adminStatus) => {
    setIsAuthenticated(authStatus);
    setIsAdmin(adminStatus);
  };

  useEffect(() => {
    const updateAuthStatus = () => {
      const authStatus = UserService.isAuthenticated();
      const adminStatus = UserService.isAdmin();
      setIsAuthenticated(authStatus);
      setIsAdmin(adminStatus);
    };

    window.addEventListener('authChanged', updateAuthStatus);
    updateAuthStatus(); // Initial check

    return () => {
      window.removeEventListener('authChanged', updateAuthStatus);
    };
  }, []);

  const handleLogout = () => {
    const confirmDelete = window.confirm('Are you sure you want to logout this user?');
    if (confirmDelete) {
      UserService.logout();
      const event = new Event('authChanged');
      window.dispatchEvent(event);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, handleLogout, setAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
