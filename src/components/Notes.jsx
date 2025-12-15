import React, { useState, useEffect, useRef } from 'react';
import { db, auth } from '../services/firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import colors from '../constants/colors';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function Notes() {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState({ title: '', content: '', category: 'Personal', priority: 'Medium' });
    const [editingId, setEditingId] = useState(null);
    const [editingNote, setEditingNote] = useState({ title: '', content: '', category: 'Personal', priority: 'Medium' });
    const userId = auth.currentUser?.uid;

    const noteRefs = useRef({}); // To store multiple note refs

    // Fetch notes
    useEffect(() => {
        if (!userId) return;
        const fetchNotes = async () => {
            try {
                const notesCol = collection(db, 'users', userId, 'notes');
                const notesSnapshot = await getDocs(notesCol);
                const notesData = notesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setNotes(notesData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
            } catch (err) {
                console.error('Error fetching notes:', err);
            }
        };
        fetchNotes();
    }, [userId]);

    // Add note
    const handleAddNote = async (e) => {
        e.preventDefault();
        if (!newNote.title || !newNote.content) return alert('Enter title & content');
        if (!userId) return;
        try {
            const noteData = { ...newNote, timestamp: new Date().toISOString() };
            const docRef = await addDoc(collection(db, 'users', userId, 'notes'), noteData);
            setNotes([{ id: docRef.id, ...noteData }, ...notes]);
            setNewNote({ title: '', content: '', category: 'Personal', priority: 'Medium' });
        } catch (err) {
            console.error('Error adding note:', err);
        }
    };

    // Delete note
    const handleDeleteNote = async (id) => {
        if (!window.confirm('Delete this note?')) return;
        if (!userId) return;
        try {
            await deleteDoc(doc(db, 'users', userId, 'notes', id));
            setNotes(notes.filter(note => note.id !== id));
        } catch (err) {
            console.error('Error deleting note:', err);
        }
    };

    // Edit note
    const startEdit = (note) => { setEditingId(note.id); setEditingNote({ ...note }); };
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        if (!userId) return;
        try {
            const updatedData = { ...editingNote, timestamp: new Date().toISOString() };
            await updateDoc(doc(db, 'users', userId, 'notes', editingId), updatedData);
            setNotes(notes.map(note => note.id === editingId ? { id: editingId, ...updatedData } : note));
            setEditingId(null);
            setEditingNote({ title: '', content: '', category: 'Personal', priority: 'Medium' });
        } catch (err) {
            console.error('Error updating note:', err);
        }
    };

    // Export single note as PDF
    const exportSingleNotePDF = async (id) => {
        const element = noteRefs.current[id];
        if (!element) return;

        // Temporarily hide edit/delete buttons for PDF
        const buttons = element.querySelectorAll('.note-actions');
        buttons.forEach(btn => (btn.style.display = 'none'));

        const canvas = await html2canvas(element);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Note_${id}.pdf`);

        // Restore buttons
        buttons.forEach(btn => (btn.style.display = 'flex'));
    };

    // Styles
    const containerStyle = { padding: '20px', minHeight: '80vh', background: colors.backgroundGradient };
    const cardStyle = { backdropFilter: 'blur(16px)', background: '#72717140', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '16px', padding: '25px', boxShadow: '0 15px 30px rgba(0,0,0,0.2)', color: 'white', marginBottom: '20px' };
    const inputStyle = { width: '100%', padding: '12px', margin: '10px 0', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', outline: 'none' };
    const textareaStyle = { ...inputStyle, height: '100px', resize: 'vertical' };
    const selectStyle = { ...inputStyle };
    const buttonStyle = { padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: colors.Primary, color: colors.Primary, cursor: 'pointer', fontWeight: 'bold', width: '100%', marginTop: '10px' };
    const noteItemStyle = { backdropFilter: 'blur(12px)', background: '#72717130', borderRadius: '12px', padding: '15px', marginBottom: '10px', border: '1px solid rgba(255,255,255,0.15)' };
    const noteHeaderStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' };
    const smallButtonStyle = { marginLeft: '10px', padding: '6px 10px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9em' };

    return (
        <div style={containerStyle}>
            <h2 style={{ marginBottom: '20px', color: 'white', borderBottom: `2px solid ${colors.Primary}`, paddingBottom: '10px' }}>Notes</h2>

            {/* Add New Note */}
            <div style={cardStyle}>
                <h3>Add Note</h3>
                <form onSubmit={handleAddNote}>
                    <input type="text" placeholder="Title" value={newNote.title} onChange={e => setNewNote({ ...newNote, title: e.target.value })} style={inputStyle} required />
                    <textarea placeholder="Content" value={newNote.content} onChange={e => setNewNote({ ...newNote, content: e.target.value })} style={textareaStyle} required />
                    <select value={newNote.category} onChange={e => setNewNote({ ...newNote, category: e.target.value })} style={selectStyle}>
                        <option>Personal</option>
                        <option>Work</option>
                        <option>Study</option>
                        <option>Other</option>
                    </select>
                    <select value={newNote.priority} onChange={e => setNewNote({ ...newNote, priority: e.target.value })} style={selectStyle}>
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                    </select>
                    <button type="submit" style={buttonStyle}>Save Note</button>
                </form>
            </div>

            {/* Notes List */}
            <div style={cardStyle}>
                <h3>Saved Notes</h3>
                {notes.length === 0 ? <p style={{ color: 'rgba(255,255,255,0.6)' }}>No notes yet...</p> :
                    notes.map(note => (
                        <div key={note.id} style={noteItemStyle} ref={el => (noteRefs.current[note.id] = el)}>
                            {editingId === note.id ? (
                                <form onSubmit={handleEditSubmit}>
                                    <input type="text" value={editingNote.title} onChange={e => setEditingNote({ ...editingNote, title: e.target.value })} style={inputStyle} required />
                                    <textarea value={editingNote.content} onChange={e => setEditingNote({ ...editingNote, content: e.target.value })} style={textareaStyle} required />
                                    <select value={editingNote.category} onChange={e => setEditingNote({ ...editingNote, category: e.target.value })} style={selectStyle}>
                                        <option>Personal</option>
                                        <option>Work</option>
                                        <option>Study</option>
                                        <option>Other</option>
                                    </select>
                                    <select value={editingNote.priority} onChange={e => setEditingNote({ ...editingNote, priority: e.target.value })} style={selectStyle}>
                                        <option>High</option>
                                        <option>Medium</option>
                                        <option>Low</option>
                                    </select>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <button type="submit" style={{ ...buttonStyle, flex: 1 }}>Update</button>
                                        <button type="button" onClick={() => setEditingId(null)} style={{ ...buttonStyle, flex: 1, backgroundColor: '#6c757d' }}>Cancel</button>
                                    </div>
                                </form>
                            ) : (
                                <div>
                                    <div style={noteHeaderStyle}>
                                        <strong>{note.title}</strong>
                                        <div className="note-actions" style={{ display: 'flex', alignItems: 'center' }}>
                                            <small style={{ color: 'rgba(255,255,255,0.6)' }}>{note.timestamp.substring(0, 10)}</small>
                                            <span style={{ marginLeft: '10px', fontSize: '0.85em', color: '#ccc' }}>{note.category} | {note.priority}</span>
                                            <button onClick={() => startEdit(note)} style={{ ...smallButtonStyle, backgroundColor: colors.Primary, color: colors.Primary }}>✍️ Edit</button>
                                            <button onClick={() => handleDeleteNote(note.id)} style={{ ...smallButtonStyle, backgroundColor: 'red', color: 'white' }}>❌ Delete</button>
                                            <button onClick={() => exportSingleNotePDF(note.id)} style={{ ...smallButtonStyle, backgroundColor: '#00bfff', color: 'white' }}>📄 Export</button>
                                        </div>
                                    </div>
                                    <p>{note.content}</p>
                                </div>
                            )}
                        </div>
                    ))}
            </div>
        </div>
    );
}
