

import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import colors from '../constants/colors';

function SubNavigation() {
    const location = useLocation();
    const navigate = useNavigate();

    const subNavContainerStyle = {
        display: 'flex', gap: '20px', borderBottom: `1px solid ${colors.Secondary}`,
        marginBottom: '20px', paddingBottom: '10px', alignItems: 'center',
        backgroundColor: colors.Neutral + '55', padding: '10px 0', borderRadius: '8px',
    };

    const subNavLinkStyle = (path) => ({
        padding: '8px 15px', textDecoration: 'none',
        color: location.pathname.includes(path) ? 'white' : colors.Text,
        backgroundColor: location.pathname.includes(path) ? colors.Primary : 'transparent',
        borderRadius: '6px', fontWeight: 'bold', transition: 'all 0.2s ease', marginLeft: '10px',
    });

    const subNavProfileStyle = {
        marginLeft: 'auto', padding: '8px 15px', color: colors.Text,
        cursor: 'pointer', fontWeight: 'bold', transition: 'all 0.2s ease',
        backgroundColor: location.pathname.includes('/profile') ? colors.Secondary + 'aa' : 'transparent',
        borderRadius: '6px',
    };

    return (
        <div style={subNavContainerStyle}>
          
            <Link to={`tasks`} style={subNavLinkStyle('/tasks')}>Task</Link>
            
            
            <Link to={`expenses`} style={subNavLinkStyle('/expenses')}>Expenses</Link>
         
            <Link to={`notes`} style={subNavLinkStyle('/notes')}>Notes</Link>
            
         
      
        </div>
    );
}

export default SubNavigation;