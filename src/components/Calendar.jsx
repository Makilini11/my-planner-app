import React, { useState, useEffect, useMemo } from 'react';
import { db } from '../services/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import Modal from 'react-modal';
import colors from '../constants/colors';

Modal.setAppElement('#root');

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const eventTypeColors = {
  meeting: colors.TaskMeeting || '#ff5a5f',
  birthday: colors.TaskBirthday || '#00a699',
  task: colors.TaskTask || '#fcba03',
  other: colors.TaskOther || '#007aff'
};

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventType, setNewEventType] = useState('meeting');

  // Load events from Firebase
  useEffect(() => {
    const fetchEvents = async () => {
      const snapshot = await getDocs(collection(db, 'events'));
      const eventData = {};
      snapshot.forEach(doc => {
        const data = doc.data();
        if (!eventData[data.date]) eventData[data.date] = [];
        eventData[data.date].push({ title: data.title, type: data.type || 'other' });
      });
      setEvents(eventData);
    };
    fetchEvents();
  }, []);

  const { year, month, monthName, daysInMonth, firstDayOfMonth } = useMemo(() => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const year = date.getFullYear();
    const month = date.getMonth();
    const monthName = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = date.getDay();
    return { year, month, monthName, daysInMonth, firstDayOfMonth };
  }, [currentDate]);

  const handleDayClick = (day) => {
    const dateString = `${year}-${String(month + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    setSelectedDate(dateString);
    if (!events[dateString]) setModalOpen(true);
  };

  const handleAddEvent = async () => {
    if (!selectedDate || !newEventTitle) return;
    await addDoc(collection(db, 'events'), { date: selectedDate, title: newEventTitle, type: newEventType });
    setEvents(prev => ({
      ...prev,
      [selectedDate]: prev[selectedDate] ? [...prev[selectedDate], { title: newEventTitle, type: newEventType }] : [{ title: newEventTitle, type: newEventType }]
    }));
    setNewEventTitle('');
    setNewEventType('meeting');
    setModalOpen(false);
  };

  const changeMonth = (delta) => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + delta, 1));
  };

  const renderCalendarDays = () => {
    const dayCells = [];
    for (let i = 0; i < firstDayOfMonth; i++) dayCells.push(<div key={`empty-${i}`} style={{ height: 60 }}></div>);

    for (let i = 1; i <= daysInMonth; i++) {
      const dateString = `${year}-${String(month + 1).padStart(2,'0')}-${String(i).padStart(2,'0')}`;
      const dayEvents = events[dateString] || [];
      const isSelected = selectedDate === dateString;

      const style = {
        height: 60,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 2,
        background: isSelected ? '#0f1a27' : '#0f1a2740', // Tasks screen dark bg
        color: 'white',
        cursor: 'pointer',
        borderRadius: 12,
        border: isSelected ? `2px solid ${colors.Primary}` : '1px solid rgba(255,255,255,0.15)',
        backdropFilter: 'blur(10px)',
        position: 'relative',
        transition: '0.3s all',
      };

      dayCells.push(
        <div key={i} style={style} onClick={() => handleDayClick(i)}>
          {i}
          <div style={{ position: 'absolute', bottom: 5, display: 'flex', gap: 3, overflowX: 'auto', maxWidth: '90%' }}>
            {dayEvents.map((ev, idx) => (
              <span key={idx} style={{
                width: 8, height: 8, borderRadius: '50%', backgroundColor: eventTypeColors[ev.type] || eventTypeColors.other
              }} title={ev.title}></span>
            ))}
          </div>
        </div>
      );
    }
    return dayCells;
  };

  const cardStyle = {
    backdropFilter: 'blur(16px)',
    background: '#0f1a2740', // Tasks screen color
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '16px',
    padding: 25,
    boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
    color: 'white',
    marginBottom: 20,
  };

  const buttonStyle = {
    padding: '8px 12px',
    borderRadius: 8,
    border: 'none',
    backgroundColor: colors.Primary,
    color: 'white',
    cursor: 'pointer',
    fontWeight: 'bold',
  };

  const inputStyle = {
    width: '100%', padding: 10, borderRadius: 8, border: '1px solid rgba(255,255,255,0.15)',
    backgroundColor: '#0f1a2740', color: 'white', marginBottom: 10, outline: 'none'
  };

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: 'auto' }}>
      <h2 style={{ marginBottom: 20, color: 'white', borderBottom: `2px solid ${colors.Primary}`, paddingBottom: 10 }}>Calendar</h2>

      {/* Month Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20, width: 300 }}>
        <button style={buttonStyle} onClick={() => changeMonth(-1)}>← Previous</button>
        <span>{monthName}</span>
        <button style={buttonStyle} onClick={() => changeMonth(1)}>Next →</button>
      </div>

      {/* Days of week */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', fontWeight: 'bold', marginBottom: 5 }}>
        {daysOfWeek.map(day => <div key={day}>{day}</div>)}
      </div>

      {/* Calendar Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
        {renderCalendarDays()}
      </div>

      {/* Selected Date Summary */}
      <div style={cardStyle}>
        <h3>Selected Date:</h3>
        {selectedDate ? (
          events[selectedDate] ? (
            <ul style={{ paddingLeft: 20 }}>
              {events[selectedDate].map((ev, idx) => (
                <li key={idx} style={{ color: eventTypeColors[ev.type] || eventTypeColors.other }}>
                  {ev.title} ({ev.type})
                </li>
              ))}
            </ul>
          ) : <p>{selectedDate} → No events yet</p>
        ) : <p>Click a date to see events.</p>}
      </div>

      {/* Modal for adding events */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        style={{
          content: {
            maxWidth: 400, margin: 'auto', padding: 20,
            borderRadius: 16, backdropFilter: 'blur(16px)',
            background: '#0f1a2740', color: 'white'
          }
        }}
      >
        <h3>Add Event for {selectedDate}</h3>
        <input value={newEventTitle} onChange={e => setNewEventTitle(e.target.value)} placeholder="Event title" style={inputStyle} />
        <select value={newEventType} onChange={e => setNewEventType(e.target.value)} style={inputStyle}>
          <option value="meeting">Meeting</option>
          <option value="birthday">Birthday</option>
          <option value="task">Task</option>
          <option value="other">Other</option>
        </select>
        <div style={{ display: 'flex', gap: 10 }}>
          <button style={buttonStyle} onClick={handleAddEvent}>Save</button>
          <button style={{ ...buttonStyle, backgroundColor: '#6c757d' }} onClick={() => setModalOpen(false)}>Cancel</button>
        </div>
      </Modal>
    </div>
  );
}

export default Calendar;
