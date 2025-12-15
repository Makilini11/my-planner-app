

// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../contexts/AuthContext';
// import { db } from '../services/firebase';
// import { 
//   collection, addDoc, serverTimestamp, query, where, onSnapshot, 
//   deleteDoc, doc, updateDoc 
// } from 'firebase/firestore';
// import colors from '../constants/colors'; 

// function Tasks() {
//   const { currentUser } = useAuth();
//   const [taskInput, setTaskInput] = useState('');
//   const [tasks, setTasks] = useState([]);
//   const [editingId, setEditingId] = useState(null); 
//   const [editingText, setEditingText] = useState(''); 

//   // ... (addTask, deleteTask, toggleComplete, handleEditSubmit, startEdit functions unchanged)
//   const addTask = async (e) => {
//     e.preventDefault();
//     if (taskInput.trim() === '' || !currentUser) return;

//     try {
//       await addDoc(collection(db, "tasks"), {
//         task: taskInput,
//         isCompleted: false,
//         userId: currentUser.uid, 
//         createdAt: serverTimestamp()
//       });
//       setTaskInput('');
//     } catch (error) {
//       console.error("Error adding task: ", error);
//     }
//   };


//   const deleteTask = async (taskId) => {
//     if (window.confirm("Are you want to delete this task?")) {
//       try {
//         const taskRef = doc(db, "tasks", taskId);
//         await deleteDoc(taskRef);
//       } catch (error) {
//         console.error("Error deleting task: ", error);
//       }
//     }
//   };

  
//   const toggleComplete = async (task) => {
//     try {
//       const taskRef = doc(db, "tasks", task.id);
//       await updateDoc(taskRef, {
//         isCompleted: !task.isCompleted
//       });
//     } catch (error) {
//       console.error("Error updating status: ", error);
//     }
//   };
  
  
//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     if (editingText.trim() === '') return;

//     try {
//       const taskRef = doc(db, "tasks", editingId);
//       await updateDoc(taskRef, {
//         task: editingText
//       });
//       setEditingId(null); 
//       setEditingText('');
//     } catch (error) {
//       console.error("Error editing task: ", error);
//     }
//   };

  
//   const startEdit = (task) => {
//     setEditingId(task.id);
//     setEditingText(task.task);
//   };

//   useEffect(() => {
//     if (currentUser) {
//       const q = query(collection(db, "tasks"), where("userId", "==", currentUser.uid));
      
//       const unsubscribe = onSnapshot(q, (snapshot) => {
//         const tasksList = snapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data()
//         }));
//         setTasks(tasksList);
//       }, (error) => {
//         console.error("Error fetching tasks: ", error);
//       });

//       return unsubscribe; 
//     }
//   }, [currentUser]);

//   // Style Definitions (No Change Here, Styles are correct)
//   const plannerCardStyle = { backgroundColor: '#72717140', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)', maxWidth: '600px', margin: '20px auto' };
//   const formStyle = { display: 'flex', marginBottom: '20px', gap: '10px' };
//   const inputStyle = { 
//     flexGrow: 1, 
//     padding: '10px', 
//     borderRadius: '6px', 
//     border: `1px solid ${colors.Secondary}`, 
//     color: colors.Text 
//   };
//   const saveButtonStyle = { padding: '10px 20px', backgroundColor: colors.Primary, color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' };
//   const listItemStyle = { 
//     display: 'flex', 
//     justifyContent: 'space-between', 
//     alignItems: 'center', 
//     listStyleType: 'none', 
//     padding: '10px', 
//     borderBottom: `1px dotted ${colors.Secondary}`, 
//     color: colors.Text, 
//     marginBottom: '8px', 
//     backgroundColor: colors.Secondary + '33', 
//     borderRadius: '4px' 
//   };
//   const actionButtonStyle = { marginLeft: '10px', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', border: 'none', fontWeight: 'bold', fontSize: '12px' };
  

  
//   return (
//     <div style={plannerCardStyle}>
//       <h3 style={{ color: colors.Text }}>My Tasks (Task Manager)</h3>
      
//       <form onSubmit={addTask} style={formStyle}>
//         <input 
//           type="text"
//           value={taskInput}
//           onChange={(e) => setTaskInput(e.target.value)}
//           placeholder="Please Enter The Task"
//           style={inputStyle}
//         />
//         <button type="submit" style={saveButtonStyle}>
//         Save
//         </button>
//       </form>

      
//       <ul style={{ padding: 0 }}>
//         {tasks.map((task) => (
//           // Use a dark color for the list item background, matching the image
//           <li key={task.id} style={{ ...listItemStyle, backgroundColor: '#0f1a27' }}> 
//             {editingId === task.id ? (
              
//               <form onSubmit={handleEditSubmit} style={{ display: 'flex', flexGrow: 1, gap: '5px' }}>
//                 <input type="text" value={editingText} onChange={(e) => setEditingText(e.target.value)} style={{ ...inputStyle, padding: '5px', margin: 0 }} />
//                 <button type="submit" style={{ ...actionButtonStyle, backgroundColor: colors.Primary, color: 'white' }}>Update</button>
//                 {/* Cancel/Delete button for edit mode is fine as is, for functionality */}
//                 <button onClick={() => setEditingId(null)} type="button" style={{ ...actionButtonStyle, backgroundColor: '#ccc' }}>Cancel</button>
//               </form>
//             ) : (
              
//               <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
//                 <span 
//                   style={{ textDecoration: task.isCompleted ? 'line-through' : 'none', flexGrow: 1, cursor: 'pointer', color: task.isCompleted ? '#666' : colors.Text }}
//                   onClick={() => toggleComplete(task)}
//                 >
//                   {task.task}
//                 </span>
                
//                 <div>
//                   {/* EDIT Button Style: Set background to Primary color (blue) and white text */}
//                   <button 
//                     onClick={() => startEdit(task)} 
//                     style={{ 
//                       ...actionButtonStyle, 
//                       backgroundColor: colors.Primary, 
//                       color: 'white' 
//                     }} 
//                     disabled={task.isCompleted}
//                   >
//                     Edit
//                   </button>
                  
//                   {/* DELETE Button Style: Set background to transparent and text to red, matching image style */}
//                   <button 
//                     onClick={() => deleteTask(task.id)} 
//                     style={{ 
//                       ...actionButtonStyle, 
//                       backgroundColor: 'transparent', // No background color
//                       color: 'red', // Red text
//                       border: '1px solid red' // Border added for visual distinction
//                     }}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             )}
//           </li>
//         ))}
//         {tasks.length === 0 && <p style={{ color: colors.Text }}>No Tasks Here.......</p>}
//       </ul>
//     </div>
//   );
// }

// export default Tasks;
// import React, { useState } from "react";
// import { db } from "../services/firebase";
// import { addDoc, collection, serverTimestamp } from "firebase/firestore";
// import { useAuth } from "../contexts/AuthContext";
// import colors from "../constants/colors";

// export default function AddTask() {
//   const { currentUser } = useAuth();
//   const [task, setTask] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("Personal");
//   const [priority, setPriority] = useState("Medium");
//   const [dueDate, setDueDate] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!currentUser) return alert("Login first!");

//     await addDoc(collection(db, "tasks"), {
//       task,
//       description,
//       category,
//       priority,
//       dueDate,
//       isCompleted: false,
//       userId: currentUser.uid,
//       createdAt: serverTimestamp(),
//     });

//     setTask("");
//     setDescription("");
//     setDueDate("");
//     alert("Task Added!");
//   };

//   const cardStyle = {
//     backdropFilter: "blur(16px)",
//     background: "#72717140",
//     border: "1px solid rgba(255,255,255,0.15)",
//     borderRadius: "16px",
//     padding: "25px",
//     boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
//     color: "white",
//     maxWidth: "600px",
//     margin: "0 auto 20px",
//   };

//   const inputStyle = {
//     width: "100%",
//     padding: "12px",
//     margin: "10px 0",
//     borderRadius: "8px",
//     border: "1px solid rgba(255,255,255,0.2)",
//     backgroundColor: "rgba(255,255,255,0.1)",
//     color: "white",
//     outline: "none",
//   };

//   const buttonStyle = {
//     padding: "12px",
//     borderRadius: "8px",
//     border: "none",
//     backgroundColor: colors.Primary,
//     color: "white",
//     cursor: "pointer",
//     fontWeight: "bold",
//     width: "100%",
//     marginTop: "10px",
//     transition: "all 0.3s ease",
//   };

//   return (
//     <div style={{ padding: "20px", minHeight: "80vh", background: colors.backgroundGradient }}>
//       <div style={cardStyle}>
//         <h2
//           style={{
//             marginBottom: "20px",
//             color: "white",
//             borderBottom: `2px solid ${colors.Primary}`,
//             paddingBottom: "10px",
//           }}
//         >
//           Add New Task
//         </h2>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Task Title"
//             value={task}
//             onChange={(e) => setTask(e.target.value)}
//             required
//             style={inputStyle}
//           />
//           <textarea
//             placeholder="Description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             style={{ ...inputStyle, height: "100px" }}
//           />
//           <select value={category} onChange={(e) => setCategory(e.target.value)} style={inputStyle}>
//             <option>Personal</option>
//             <option>Office</option>
//           </select>
//           <select value={priority} onChange={(e) => setPriority(e.target.value)} style={inputStyle}>
//             <option>High</option>
//             <option>Medium</option>
//             <option>Low</option>
//           </select>
//           <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} style={inputStyle} />
//           <button type="submit" style={buttonStyle}>Add Task</button>
//         </form>
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect } from "react";
import { db, auth } from "../services/firebase";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import colors from "../constants/colors";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ task: "", description: "", category: "Personal", priority: "Medium", dueDate: "" });
  const [editingId, setEditingId] = useState(null);
  const [editingTask, setEditingTask] = useState({ task: "", description: "", category: "Personal", priority: "Medium", dueDate: "" });

  const userId = auth.currentUser?.uid;

  // --- Fetch tasks for this user ---
  useEffect(() => {
    if (!userId) return;

    const fetchTasks = async () => {
      try {
        const tasksCol = collection(db, "users", userId, "tasks");
        const snapshot = await getDocs(tasksCol);
        const tasksData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // Sort by createdAt descending
        setTasks(tasksData.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds));
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };

    fetchTasks();
  }, [userId]);

  // --- Add new task ---
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!userId) return alert("Login first!");
    if (!newTask.task || !newTask.description) return alert("Enter task & description");

    try {
      const taskData = {
        ...newTask,
        isCompleted: false,
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "users", userId, "tasks"), taskData);
      setTasks([{ id: docRef.id, ...taskData }, ...tasks]);
      setNewTask({ task: "", description: "", category: "Personal", priority: "Medium", dueDate: "" });
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  // --- Delete task ---
  const handleDeleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    if (!userId) return;

    try {
      await deleteDoc(doc(db, "users", userId, "tasks", id));
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // --- Start editing ---
  const startEdit = (task) => {
    setEditingId(task.id);
    setEditingTask({ ...task });
  };

  // --- Submit edit ---
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return;

    try {
      const updatedData = {
        ...editingTask,
      };

      await updateDoc(doc(db, "users", userId, "tasks", editingId), updatedData);
      setTasks(tasks.map(t => t.id === editingId ? { id: editingId, ...updatedData } : t));
      setEditingId(null);
      setEditingTask({ task: "", description: "", category: "Personal", priority: "Medium", dueDate: "" });
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  // --- Styles ---
  const containerStyle = { padding: 20, minHeight: "80vh", background: colors.backgroundGradient };
  const cardStyle = { backdropFilter: "blur(16px)", background: "#72717140", borderRadius: 16, padding: 25, marginBottom: 20, color: "white" };
  const inputStyle = { width: "100%", padding: 12, margin: "10px 0", borderRadius: 8, border: "1px solid rgba(255,255,255,0.2)", backgroundColor: "rgba(255,255,255,0.1)", color: "white", outline: "none" };
  const textareaStyle = { ...inputStyle, height: 100, resize: "vertical" };
  const selectStyle = { ...inputStyle };
  const buttonStyle = { width: "100%", padding: 12, borderRadius: 8, border: "none", backgroundColor: colors.Primary, color: colors.Primary, fontWeight: "bold", marginTop: 10, cursor: "pointer" };
  const taskItemStyle = { backdropFilter: "blur(12px)", background: "#72717130", borderRadius: 12, padding: 15, marginBottom: 10, border: "1px solid rgba(255,255,255,0.15)" };
  const taskHeaderStyle = { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 };
  const smallButtonStyle = { marginLeft: 10, padding: "6px 10px", borderRadius: 6, border: "none", cursor: "pointer", fontWeight: "bold", fontSize: "0.9em" };

  return (
    <div style={containerStyle}>
      <h2 style={{ color: "white", marginBottom: 20, borderBottom: `2px solid ${colors.Primary}`, paddingBottom: 10 }}>Tasks</h2>

      {/* Add New Task */}
      <div style={cardStyle}>
        <h3>Add Task</h3>
        <form onSubmit={handleAddTask}>
          <input type="text" placeholder="Task Title" value={newTask.task} onChange={e => setNewTask({ ...newTask, task: e.target.value })} style={inputStyle} required />
          <textarea placeholder="Description" value={newTask.description} onChange={e => setNewTask({ ...newTask, description: e.target.value })} style={textareaStyle} required />
          <select value={newTask.category} onChange={e => setNewTask({ ...newTask, category: e.target.value })} style={selectStyle}>
            <option>Personal</option>
            <option>Office</option>
            <option>Study</option>
            <option>Other</option>
          </select>
          <select value={newTask.priority} onChange={e => setNewTask({ ...newTask, priority: e.target.value })} style={selectStyle}>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
          <input type="date" value={newTask.dueDate} onChange={e => setNewTask({ ...newTask, dueDate: e.target.value })} style={inputStyle} />
          <button type="submit" style={buttonStyle}>Add Task</button>
        </form>
      </div>

      {/* Task List */}
      <div style={cardStyle}>
        <h3>Saved Tasks</h3>
        {tasks.length === 0 ? <p style={{ color: "rgba(255,255,255,0.6)" }}>No tasks yet...</p> :
          tasks.map(task => (
            <div key={task.id} style={taskItemStyle}>
              {editingId === task.id ? (
                <form onSubmit={handleEditSubmit}>
                  <input type="text" value={editingTask.task} onChange={e => setEditingTask({ ...editingTask, task: e.target.value })} style={inputStyle} required />
                  <textarea value={editingTask.description} onChange={e => setEditingTask({ ...editingTask, description: e.target.value })} style={textareaStyle} required />
                  <select value={editingTask.category} onChange={e => setEditingTask({ ...editingTask, category: e.target.value })} style={selectStyle}>
                    <option>Personal</option>
                    <option>Office</option>
                    <option>Study</option>
                    <option>Other</option>
                  </select>
                  <select value={editingTask.priority} onChange={e => setEditingTask({ ...editingTask, priority: e.target.value })} style={selectStyle}>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                  <input type="date" value={editingTask.dueDate} onChange={e => setEditingTask({ ...editingTask, dueDate: e.target.value })} style={inputStyle} />
                  <div style={{ display: "flex", gap: 10 }}>
                    <button type="submit" style={{ ...buttonStyle, flex: 1 }}>Update</button>
                    <button type="button" onClick={() => setEditingId(null)} style={{ ...buttonStyle, flex: 1, backgroundColor: "#6c757d" }}>Cancel</button>
                  </div>
                </form>
              ) : (
                <div>
                  <div style={taskHeaderStyle}>
                    <strong>{task.task}</strong>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <small style={{ color: 'rgba(255,255,255,0.6)' }}>{task.dueDate}</small>
                      <span style={{ marginLeft: 10, fontSize: "0.85em", color: "#ccc" }}>{task.category} | {task.priority}</span>
                      <button onClick={() => startEdit(task)} style={{ ...smallButtonStyle, backgroundColor: colors.Primary, color: colors.Primary }}>✍️ Edit</button>
                      <button onClick={() => handleDeleteTask(task.id)} style={{ ...smallButtonStyle, backgroundColor: "red", color: colors.Primary}}>❌ Delete</button>
                    </div>
                  </div>
                  <p>{task.description}</p>
                </div>
              )}
            </div>
          ))
        }
      </div>
    </div>
  );
}
