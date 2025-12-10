

import React, { useState, useMemo } from 'react';

import colors from '../constants/colors';

const DUMMY_EVENTS = {
    '2025-05-11': 'My Birthdate',
    '2025-12-10': 'Project submit',
    '2025-12-31': 'Start The New Journey',
    '2026-01-06': 'New Feature Planning',
};

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
;

function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());

    const [selectedDate, setSelectedDate] = useState(null); 
    const [selectedEvent, setSelectedEvent] = useState(null);

    const { year, month, monthName, daysInMonth, firstDayOfMonth } = useMemo(() => {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const year = date.getFullYear();
        const month = date.getMonth();
        
        const monthName = date.toLocaleDateString('en-US', { month: 'long',year: 'numeric'});
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfMonth = date.getDay(); 

        return { year, month, monthName, daysInMonth, firstDayOfMonth };
    }, [currentDate]);

    
    const handleDayClick = (day, eventDetails, dateString) => {
        if (eventDetails) {
            
            setSelectedDate(dateString);
            setSelectedEvent(eventDetails);
        } else {
            
            setSelectedDate(dateString);
            setSelectedEvent(null);
        }
    };

    
    const renderCalendarDays = () => {
        const dayCells = [];

        
        for (let i = 0; i < firstDayOfMonth; i++) {
            dayCells.push(<div key={`empty-${i}`} style={calendarDayStyle.emptyCell}></div>);
        }

        
        for (let i = 1; i <= daysInMonth; i++) {
            const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            const isImportant = DUMMY_EVENTS[dateString];
            const isSelected = selectedDate === dateString;
            
            
            let cellStyle = calendarDayStyle.dayCell;
            if (isImportant) {
                cellStyle = calendarDayStyle.importantDay;
            }
            if (isSelected) {
                cellStyle = { ...cellStyle, ...calendarDayStyle.selectedDay };
            }

            dayCells.push(
                <div 
                    key={i} 
                    style={cellStyle} 
                    title={isImportant || ''}
                    onClick={() => handleDayClick(i, isImportant, dateString)} 
                >
                    {i}
                    {isImportant && <span style={calendarDayStyle.eventIndicator}>•</span>}
                </div>
            );
        }

        return dayCells;
    };

    
    const changeMonth = (delta) => {
        setCurrentDate(prev => {
            const newDate = new Date(prev.getFullYear(), prev.getMonth() + delta, 1);
            setSelectedDate(null); 
            setSelectedEvent(null);
            return newDate;
        });
    };

 

    const calendarContainerStyle = {
        padding: '20px', backgroundColor: 'white', borderRadius: '12px', marginTop: '20px', color: colors.Text,
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
    };
    
    const monthHeaderStyle = {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px',
        color: colors.Text, fontWeight: 'bold', fontSize: '1.5em',
    };

    const navButtonStyle = {
        padding: '8px 15px', backgroundColor: colors.Secondary, color: colors.Text, border: 'none', 
        borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold',
    };
    
    const dayHeaderGridStyle = {
        display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', 
        fontWeight: 'bold', marginBottom: '10px', borderBottom: `1px solid ${colors.Secondary}`,
        paddingBottom: '5px',
    };

    const calendarGridStyle = {
        display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px',
        border: `1px solid ${colors.Secondary}`, borderRadius: '4px',
    };

    const calendarDayStyle = {
        baseCell: { padding: '10px', height: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '1.1em', cursor: 'default', transition: 'background-color 0.2s' },
        dayCell: { backgroundColor: colors.Neutral + '33', cursor: 'pointer', ':hover': { backgroundColor: colors.Secondary + '55' } },
        emptyCell: { padding: '10px', height: '60px', backgroundColor: '#f9f9f9' },
        importantDay: { 
            backgroundColor: colors.Primary + '55', 
            border: `2px solid ${colors.Primary}`, color: colors.Text, fontWeight: 'bold',
            cursor: 'pointer', position: 'relative'
        },
        selectedDay: {
            backgroundColor: colors.Text + '40', 
            color: 'white',
            border: `2px solid ${colors.Text}`,
        },
        eventIndicator: {
            position: 'absolute', bottom: '2px', fontSize: '20px', color: colors.Text,
        }
    };

    calendarDayStyle.dayCell = { ...calendarDayStyle.baseCell, ...calendarDayStyle.dayCell };
    calendarDayStyle.importantDay = { ...calendarDayStyle.baseCell, ...calendarDayStyle.importantDay };



    
    return (
        <div>
           
            <h2 style={{ color: colors.Text, marginBottom: '20px', paddingBottom: '10px', borderBottom: `2px solid ${colors.Secondary}` }}>
                Calendar View
            </h2>
            
            
            
            <div style={calendarContainerStyle}>
                
              
                <div style={monthHeaderStyle}>
                    <button onClick={() => changeMonth(-1)} style={navButtonStyle}>← Previous</button>
                    <span>{monthName} {year}</span>
                    <button onClick={() => changeMonth(1)} style={navButtonStyle}>Next →</button>
                </div>

               
                <div style={dayHeaderGridStyle}>
                    {daysOfWeek.map(day => <div key={day}>{day}</div>)}
                </div>


                <div style={calendarGridStyle}>
                    {renderCalendarDays()}
                </div>

                
                <div style={{ marginTop: '30px', borderTop: `1px solid ${colors.Secondary}`, paddingTop: '15px' }}>
                    <h3 style={{ color: colors.Text }}>Summary</h3>
                    
                    {selectedEvent ? (
                        <div style={{ padding: '15px', backgroundColor: colors.Secondary + '55', borderRadius: '8px', borderLeft: `5px solid ${colors.Primary}` }}>
                            <p style={{ fontWeight: 'bold', color: colors.Text, marginBottom: '5px' }}>Selected Date: {selectedDate}</p>
                            <p style={{ color: colors.Text, fontSize: '1.1em' }}><strong>Event:</strong> {selectedEvent}</p>
                        </div>
                    ) : selectedDate ? (
                        <p style={{ color: colors.Text }}>Date: {selectedDate} - There are no important events on this day.</p>
                    ) : (
                        <p style={{ color: colors.Text }}>
                            Click The Important Dates
                        </p>
                    )}
                </div>
            </div>
            
            
        </div>
    );
}

export default Calendar;