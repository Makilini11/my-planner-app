



import React, { useState, useEffect } from 'react'; 
import TaskGrid from '../components/TaskGrid'; 
import colors from '../constants/colors';
import { Link } from 'react-router-dom';


function Home() {
    
    const homeContainerStyle = {
        padding: '20px',
        backgroundColor: colors.Neutral,
        minHeight: '100vh', 
    };

    return (
        <div style={homeContainerStyle}>
            <h2 style={{ color: colors.Text, marginBottom: '20px', paddingBottom: '10px', borderBottom: `2px solid ${colors.Secondary}` }}>
                Dashboard / All Tasks
            </h2>
            
            <TaskGrid />
           
        </div>
    );
}

export default Home;