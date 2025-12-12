

import React from 'react';
import { Outlet } from 'react-router-dom';
import colors from '../constants/colors'; 
import SubNavigation from './SubNavigation';

const Activities = () => (
    <div>
        
        <h2 style={{ color: colors.Text, marginBottom: '20px', paddingBottom: '10px', borderBottom: `2px solid ${colors.Secondary}` }}>
           Activities Log
        </h2>
        
        
        <div style={{ padding: '0 10px' }}><SubNavigation /></div>
        
        
        <div style={{padding: '20px', backgroundColor:  '#72717140', borderRadius: '12px', marginTop: '20px', color: colors.Text}}>
            <p>Activities View</p>
           
            <Outlet /> 
        </div>
    </div>
);
export default Activities;