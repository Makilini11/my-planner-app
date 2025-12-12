import React from 'react'; 
import TaskGrid from '../components/TaskGrid'; 
import Expenses from '../components/Expenses';
import colors from '../constants/colors';

function Home() {
    const homeContainerStyle = {
        padding: '20px',
        background: colors.backgroundGradient, // Match Login/Register gradient
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        position: 'relative',
        overflow: 'hidden',
    };

    const cardStyle = {
        backdropFilter: 'blur(16px)',
        background: colors.cardGlass,
        border: `1px solid ${colors.borderGlass}`,
        borderRadius: '20px',
        padding: '25px',
        boxShadow: '0 25px 45px rgba(0,0,0,0.2)',
        color: colors.Text,
    };

    // Optional floating blurred circles like login/register
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
        <div style={homeContainerStyle}>
            <div style={circleStyle1}></div>
            <div style={circleStyle2}></div>

            <h2 style={{ 
                color: 'white', 
                marginBottom: '20px', 
                paddingBottom: '10px', 
                borderBottom: `2px solid ${colors.Primary}`,
                zIndex: 1,
                position: 'relative',
            }}>
                Dashboard / All Tasks
            </h2>

            <div style={cardStyle}>
                <TaskGrid />
            </div>

         
        </div>
    );
}

export default Home;
