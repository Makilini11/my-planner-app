

import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { 
  collection, addDoc, serverTimestamp, query, where, onSnapshot, 
  deleteDoc, doc, updateDoc 
} from 'firebase/firestore';
import colors from '../constants/colors'; 

function Tasks() {
  const { currentUser } = useAuth();
  const [taskInput, setTaskInput] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null); 
  const [editingText, setEditingText] = useState(''); 

  
  const addTask = async (e) => {
    e.preventDefault();
    if (taskInput.trim() === '' || !currentUser) return;

    try {
      await addDoc(collection(db, "tasks"), {
        task: taskInput,
        isCompleted: false,
        userId: currentUser.uid, 
        createdAt: serverTimestamp()
      });
      setTaskInput('');
    } catch (error) {
      console.error("Error adding task: ", error);
    }
  };


  const deleteTask = async (taskId) => {
    if (window.confirm("Are you want to delete this task?")) {
      try {
        const taskRef = doc(db, "tasks", taskId);
        await deleteDoc(taskRef);
      } catch (error) {
        console.error("Error deleting task: ", error);
      }
    }
  };

 
  const toggleComplete = async (task) => {
    try {
      const taskRef = doc(db, "tasks", task.id);
      await updateDoc(taskRef, {
        isCompleted: !task.isCompleted
      });
    } catch (error) {
      console.error("Error updating status: ", error);
    }
  };
  
 
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (editingText.trim() === '') return;

    try {
      const taskRef = doc(db, "tasks", editingId);
      await updateDoc(taskRef, {
        task: editingText
      });
      setEditingId(null); 
      setEditingText('');
    } catch (error) {
      console.error("Error editing task: ", error);
    }
  };

  
  const startEdit = (task) => {
    setEditingId(task.id);
    setEditingText(task.task);
  };

  useEffect(() => {
    if (currentUser) {
      const q = query(collection(db, "tasks"), where("userId", "==", currentUser.uid));
      
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const tasksList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTasks(tasksList);
      }, (error) => {
        console.error("Error fetching tasks: ", error);
      });

      return unsubscribe; 
    }
  }, [currentUser]);


  const plannerCardStyle = { backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)', maxWidth: '600px', margin: '20px auto' };
  const formStyle = { display: 'flex', marginBottom: '20px', gap: '10px' };
  const inputStyle = { flexGrow: 1, padding: '10px', borderRadius: '6px', border: `1px solid ${colors.Secondary}`, color: colors.Text };
  const saveButtonStyle = { padding: '10px 20px', backgroundColor: colors.Primary, color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' };
  const listItemStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', listStyleType: 'none', padding: '10px', borderBottom: `1px dotted ${colors.Secondary}`, color: colors.Text, marginBottom: '8px', backgroundColor: colors.Secondary + '33', borderRadius: '4px' };
  const actionButtonStyle = { marginLeft: '10px', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', border: 'none', fontWeight: 'bold', fontSize: '12px' };
  
  return (
    <div style={plannerCardStyle}>
        <h3 style={{ color: colors.Text }}>My Tasks (Task Manager)</h3>
       
        <form onSubmit={addTask} style={formStyle}>
          <input 
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Please Enter The Task"
            style={inputStyle}
          />
          <button type="submit" style={saveButtonStyle}>
          Save
          </button>
        </form>

       
        <ul style={{ padding: 0 }}>
          {tasks.map((task) => (
             <li key={task.id} style={listItemStyle}>
              {editingId === task.id ? (
                
                <form onSubmit={handleEditSubmit} style={{ display: 'flex', flexGrow: 1, gap: '5px' }}>
                  <input type="text" value={editingText} onChange={(e) => setEditingText(e.target.value)} style={{ ...inputStyle, padding: '5px', margin: 0 }} />
                  <button type="submit" style={{ ...actionButtonStyle, backgroundColor: colors.Primary, color: 'white' }}>Update</button>
                  <button onClick={() => setEditingId(null)} type="button" style={{ ...actionButtonStyle, backgroundColor: '#ccc' }}>Delete</button>
                </form>
              ) : (
               
                <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                  <span 
                    style={{ textDecoration: task.isCompleted ? 'line-through' : 'none', flexGrow: 1, cursor: 'pointer', color: task.isCompleted ? '#666' : colors.Text }}
                    onClick={() => toggleComplete(task)}
                  >
                    {task.task}
                  </span>
                  
                  <div>
                    <button onClick={() => startEdit(task)} style={{ ...actionButtonStyle, backgroundColor: colors.Secondary, color: colors.Text }} disabled={task.isCompleted}>Edit</button>
                    <button onClick={() => deleteTask(task.id)} style={{ ...actionButtonStyle, backgroundColor: '#ffaaaa', color: 'red' }}>Delete</button>
                  </div>
                </div>
              )}
            </li>
          ))}
          {tasks.length === 0 && <p style={{ color: colors.Text }}>No Tasks Here.......</p>}
        </ul>
    </div>
  );
}

export default Tasks;