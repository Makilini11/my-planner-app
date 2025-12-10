// src/components/Profile.jsx

import React from 'react';
import colors from '../constants/colors';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {

    const { currentUser } = useAuth();
    
    return (
        <div style={{padding: '30px', backgroundColor: 'white', borderRadius: '12px', color: colors.Text, maxWidth: '600px', margin: '20px auto', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)'}}>
            <h2 style={{ color: colors.Text, borderBottom: `2px solid ${colors.Secondary}`, paddingBottom: '10px' }}>
            Profile Settings
            </h2>
            
            <div style={{ lineHeight: '1.8' }}>
                <p><strong>Email:</strong> {currentUser?.email}</p>
                <p><strong>UID:</strong> {currentUser?.firstName}</p>
                <p><strong>Accont Activated Date:</strong> {currentUser?.metadata?.creationTime ? new Date(currentUser.metadata.creationTime).toLocaleDateString('ta-IN') : 'N/A'}</p>
            </div>
            
            <h4 style={{ marginTop: '20px', color: colors.Primary }}>Settings</h4>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
              
            </ul>
        </div>
    );
}
export default Profile;