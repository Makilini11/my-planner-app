import React, { useState } from 'react';
import colors from '../constants/colors';

// மாதிரி குறிப்புகள்
const initialNotes = [
    { id: 1, title: 'Next Prject Analysis', content: 'Learn React Native and I want to achieve goal ', timestamp: '2025-12-08' },
    { id: 2, title: 'Book Note', content: 'Rich Dad Poor Dad" by Robert Kiyosaki contrasts the financial philosophies of two father figures, emphasizing the importance of financial literacy and investing for wealth creation', timestamp: '2025-12-07' },
    { id: 3, title: "First Achieve My Goal's ", content: 'I Finished My ComputerScience and I rreceived My Certificate', timestamp: '2025-12-06' },
];

function Notes() {
    const [notes, setNotes] = useState(initialNotes);
    const [newNote, setNewNote] = useState({ title: '', content: '' });


    const handleAddNote = (e) => {
        e.preventDefault();
        if (newNote.title && newNote.content) {
            const newEntry = {
                id: Date.now(), // Unique ID
                title: newNote.title,
                content: newNote.content,
                timestamp: new Date().toISOString().substring(0, 10),
            };
            setNotes([newEntry, ...notes]); 
            setNewNote({ title: '', content: '' }); 
        } else {
            alert('Plesase Enter The Title And Content');
        }
    };

   
    const handleDeleteNote = (id) => {
        setNotes(notes.filter(note => note.id !== id));
    };



    const notesContainerStyle = { padding: '20px', backgroundColor: colors.Neutral, minHeight: '80vh' };
    
    const cardStyle = { backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)', marginBottom: '20px' };

    const formInputStyle = { padding: '10px', margin: '5px 0', borderRadius: '5px', border: `1px solid ${colors.Secondary}`, width: '100%', boxSizing: 'border-box' };
    
    const formTextAreaStyle = { ...formInputStyle, height: '100px', resize: 'vertical' };

    const formButtonStyle = { padding: '10px 15px', backgroundColor: colors.Primary, color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px', width: '100%', fontWeight: 'bold' };
    
    const noteItemStyle = { 
        padding: '15px', 
        border: `1px solid ${colors.Secondary}`, 
        borderRadius: '8px', 
        marginBottom: '10px',
        backgroundColor: colors.Neutral + 'aa',
    };
    
    const noteHeaderStyle = { 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '5px',
        borderBottom: `1px dotted ${colors.Secondary}`,
        paddingBottom: '5px'
    };
    
    const deleteButtonStyle = {
        background: 'none',
        border: 'none',
        color: 'red',
        cursor: 'pointer',
        fontSize: '1.2em',
        marginLeft: '10px',
        opacity: 0.7,
        transition: 'opacity 0.2s',
    };

    return (
        <div style={notesContainerStyle}>
            <h2 style={{ color: colors.Text, marginBottom: '20px', paddingBottom: '10px', borderBottom: `2px solid ${colors.Secondary}` }}>
               Notes
            </h2>

          
            <div style={cardStyle}>
                <h3 style={{ color: colors.Text, marginBottom: '15px' }}>Add Note</h3>
                <form onSubmit={handleAddNote}>
                    <input 
                        type="text" 
                        placeholder=" Title" 
                        style={formInputStyle} 
                        value={newNote.title}
                        onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                        required
                    />
                    <textarea 
                        placeholder="Content" 
                        style={formTextAreaStyle} 
                        value={newNote.content}
                        onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                        required
                    />
                    <button type="submit" style={formButtonStyle}>Save Note</button>
                </form>
            </div>

        
            <div style={cardStyle}>
                <h3 style={{ color: colors.Text, marginBottom: '15px' }}>Save Notes</h3>
                {notes.length === 0 ? (
                    <p style={{ color: colors.Text + '70' }}>No notes here.. please save the note.</p>
                ) : (
                    <div>
                        {notes.map(note => (
                            <div key={note.id} style={noteItemStyle}>
                                <div style={noteHeaderStyle}>
                                    <strong style={{ color: colors.Text }}>{note.title}</strong>
                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                        <small style={{ color: colors.Text + '70' }}>{note.timestamp}</small>
                                        <button 
                                            onClick={() => handleDeleteNote(note.id)} 
                                            style={deleteButtonStyle}
                                            title="Delete Note"
                                        >
                                            ❌
                                        </button>
                                    </div>
                                </div>
                                <p style={{ margin: 0, color: colors.Text }}>{note.content}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
        </div>
    );
}

export default Notes;