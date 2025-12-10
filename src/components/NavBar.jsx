

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import colors from '../constants/colors';



const Navbar = ({ handleLogout }) => {
  const location = useLocation();
  

  const navContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor:' #FFFFFF',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    color: colors.Text,
  };

  const navItemStyle = (path) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px 15px',
    textDecoration: 'none',
    color: colors.Text,
    borderBottom: location.pathname.includes(path) ? `3px solid ${colors.Primary}` : '3px solid transparent', 
    fontWeight: location.pathname.includes(path) ? 'bold' : 'normal',
    transition: 'border-bottom 0.3s ease',
  });

  const appTitleStyle = {
      fontSize: '24px',
      fontWeight: 'bold',
      color: colors.Text, 
  };
  
  const iconGroupStyle = {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      marginRight: '20px',
  };
  
  const iconStyle = {
      fontSize: '18px',
      cursor: 'pointer',
      color: colors.Text, 
  };
  
  const searchInputStyle = {
      padding: '8px 15px',
      borderRadius: '20px',
      border: `1px solid ${colors.Secondary}`, 
      outline: 'none',
      width: '200px',};

  const logoutButtonStyle = {
        
        backgroundColor: colors.Primary, 
        color: 'white', 
        padding: '10px 18px',
        borderRadius: '8px', 
        border: 'none',
        fontWeight: 'bold',
        cursor: 'pointer',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px', 
        transition: 'background-color 0.3s ease',
        textDecoration: 'none', 
        whiteSpace: 'nowrap'}
 

  return (
    <div style={navContainerStyle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img 
                  src="/the_ascender_logo.svg" 
                  alt="The Ascender Planner App Logo" 
                  style={{ width: '35px', height: '35px' }} 
              />
          <h1 style={appTitleStyle}>Planner App</h1>
          </div>
          <div style={iconGroupStyle}>
              <input type="text" placeholder="Search..." style={searchInputStyle} />
              <span role="img" aria-label="Messages" style={iconStyle}>💬</span>
          </div>
           
      </div>
      
      
      <div style={{ display: 'flex' }}>
        <Link to="/dashboard/home/tasks" style={navItemStyle('/dashboard/home')}>
          <span role="img" aria-label="Home">🏠</span>
          Home
        </Link>
        <Link to="/dashboard/calendar" style={navItemStyle('/dashboard/calendar')}>
          <span role="img" aria-label="Calendar">📅</span>
          Calendar
        </Link>
        <Link to="/dashboard/activities" style={navItemStyle('/dashboard/activities')}>
          <span role="img" aria-label="Activities">🧘‍♀️</span>
          Activities
        </Link>
        
        <Link to="/dashboard/profile" style={navItemStyle('/dashboard/profile')}>
                <span role="img" aria-label="User">👤</span> Profile
        </Link>
      </div>
      
      
      <button 
            onClick={handleLogout} 
            style={logoutButtonStyle}
        >
        <span role="img" aria-label="Log Out">👤</span> 
        Log Out
      </button>
    </div>
  );
};

export default Navbar;
