import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/common/Navbar';
import LoginPage from './components/auth/LoginPage';
import RegistrationPage from './components/auth/RegistrationPage';
import FooterComponent from './components/common/Footer';
import UpdateUser from './components/userspage/UpdateUser';
import UserManagementPage from './components/userspage/UserManagementPage';
import ProfilePage from './components/userspage/ProfilePage';
import { AuthProvider, AuthContext } from './components/auth/AuthContext';

const AppRoutes = () => {
  const { isAuthenticated, isAdmin } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      {isAuthenticated ? (
        <>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin/user-management" element={<UserManagementPage />} />
          {isAdmin && (
            <>
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="/update-user/:userId" element={<UpdateUser />} />
            </>
          )}
          <Route path="*" element={<Navigate to="/profile" />} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <div className="content">
            <AppRoutes />
          </div>
          <FooterComponent />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
