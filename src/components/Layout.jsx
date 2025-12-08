

import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Outlet } from 'react-router-dom';
import Navbar from './NavBar'; 
import colors from '../constants/colors';

function Layout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      alert("Log out failed: " + error.message);
    }
  };

  const containerStyle = { backgroundColor: colors.Neutral, minHeight: '100vh' };
  const contentStyle = { padding: '20px', maxWidth: '1200px', margin: '0 auto' };

  return (
    <div style={containerStyle}>
    
      <Navbar handleLogout={handleLogout} /> 

     
      <div style={contentStyle}>
        <Outlet /> 
      </div>
    </div>
  );
}

export default Layout;