

// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import colors from '../constants/colors';



// const Navbar = ({ handleLogout }) => {
//   const location = useLocation();
  

//   const navContainerStyle = {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: '10px 20px',
//     backgroundColor:' #7c817eff',
//     boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//     color: colors.Text,
//   };

//   const navItemStyle = (path) => ({
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     padding: '10px 15px',
//     textDecoration: 'none',
//     color: colors.Text,
//     borderBottom: location.pathname.includes(path) ? `3px solid ${colors.Primary}` : '3px solid transparent', 
//     fontWeight: location.pathname.includes(path) ? 'bold' : 'normal',
//     transition: 'border-bottom 0.3s ease',
//   });

//   const appTitleStyle = {
//       fontSize: '24px',
//       fontWeight: 'bold',
//       color: colors.Text, 
//   };
//   
//   const iconGroupStyle = {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '20px',
//       marginRight: '20px',
//   };
//   
//   const iconStyle = {
//       fontSize: '18px',
//       cursor: 'pointer',
//       color: colors.Text, 
//   };
//   
//   const searchInputStyle = {
//       padding: '8px 15px',
//       borderRadius: '20px',
//       border: `1px solid ${colors.Secondary}`, 
//       outline: 'none',
//       width: '200px',};

//   const logoutButtonStyle = {
        
//         backgroundColor: colors.Primary, 
//         color: 'white', 
//         padding: '10px 18px',
//         borderRadius: '8px', 
//         border: 'none',
//         fontWeight: 'bold',
//         cursor: 'pointer',
//         fontSize: '14px',
//         display: 'flex',
//         alignItems: 'center',
//         gap: '8px', 
//         transition: 'background-color 0.3s ease',
//         textDecoration: 'none', 
//         whiteSpace: 'nowrap'}
//  

//   return (
//     <div style={navContainerStyle}>
//       <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//               <img 
//                   src="/the_ascender_logo.svg" 
//                   alt="The Ascender Planner App Logo" 
//                   style={{ width: '35px', height: '35px' }} 
//               />
//           <h1 style={appTitleStyle}>Planner App</h1>
//           </div>
//           <div style={iconGroupStyle}>
//               <input type="text" placeholder="Search..." style={searchInputStyle} />
//               <span role="img" aria-label="Messages" style={iconStyle}>💬</span>
//           </div>
           
//       </div>
//       
//       
//       <div style={{ display: 'flex' }}>
//         <Link to="/dashboard/home/tasks" style={navItemStyle('/dashboard/home')}>
//           <span role="img" aria-label="Home">🏠</span>
//           Home
//         </Link>
//         <Link to="/dashboard/calendar" style={navItemStyle('/dashboard/calendar')}>
//           <span role="img" aria-label="Calendar">📅</span>
//           Calendar
//         </Link>
//         <Link to="/dashboard/activities" style={navItemStyle('/dashboard/activities')}>
//           <span role="img" aria-label="Activities">🧘‍♀️</span>
//           Activities
//         </Link>
        
//         <Link to="/dashboard/profile" style={navItemStyle('/dashboard/profile')}>
//                 <span role="img" aria-label="User">👤</span> Profile
//         </Link>
//       </div>
//       
//       
//       <button 
//             onClick={handleLogout} 
//             style={logoutButtonStyle}
//         >
//         <span role="img" aria-label="Log Out">👤</span> 
//         Log Out
//       </button>
//     </div>
//   );
// };

// export default Navbar;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import colors from '../constants/colors';

const Navbar = ({ handleLogout }) => {
  const location = useLocation();

  const premiumFont = "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

  const navContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 28px',
    background: colors.cardGlass,       // Glass effect like Login/Register card
    backdropFilter: 'blur(16px)',
    border: `1px solid ${colors.borderGlass}`,
    boxShadow: '0 25px 45px rgba(0,0,0,0.2)',
    color: 'white',
    fontFamily: premiumFont,
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    borderRadius: '0 0 20px 20px',
    margin: '0 20px',
  };

  const navItemStyle = (path) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px 16px',
    textDecoration: 'none',
    color: location.pathname.includes(path) ? '#ffffff' : 'rgba(255,255,255,0.7)',
    borderBottom: location.pathname.includes(path) ? `3px solid ${colors.Primary}` : '3px solid transparent',
    fontWeight: location.pathname.includes(path) ? 700 : 500,
    fontFamily: premiumFont,
    fontSize: '15px',
    transition: 'all 0.3s ease',
    borderRadius: '4px 4px 0 0',
  });

  const logoutButtonStyle = {
    background: colors.accent,  // Matching the accent of Google button
    color: 'white',
    padding: '10px 18px',
    borderRadius: '12px',
    border: 'none',
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: '14px',
    fontFamily: premiumFont,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
  };

  // Optional floating blur circles like login/register background
  const circleStyle1 = {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.12)',
    top: 10,
    left: 10,
    filter: 'blur(60px)',
    zIndex: 0,
  };

  const circleStyle2 = {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.1)',
    bottom: 10,
    right: 10,
    filter: 'blur(80px)',
    zIndex: 0,
  };

  return (
    <div style={{ position: 'relative', marginBottom: 20 }}>
      <div style={circleStyle1}></div>
      <div style={circleStyle2}></div>

      <div style={navContainerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
          <img 
            src="/logo.png" 
            alt="App Logo" 
            style={{ width: 'auto', height: '60px' }} 
          />
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <Link to="/dashboard/home/tasks" style={navItemStyle('/dashboard/home')}>Home</Link>
          <Link to="/dashboard/calendar" style={navItemStyle('/dashboard/calendar')}>Calendar</Link>
          <Link to="/dashboard/activities" style={navItemStyle('/dashboard/activities')}>Activities</Link>
          <Link to="/dashboard/profile" style={navItemStyle('/dashboard/profile')}>Profile</Link>
        </div>

        <button onClick={handleLogout} style={logoutButtonStyle}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Navbar;

