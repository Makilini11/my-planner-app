
// import React, { useState } from 'react';
// import TaskCard from './TaskCard';
// import tasksData from '../data/tasks.json'; 
// import '../taskstyle/TaskGrid.css'; 


// const categories = ['All', ...new Set(tasksData.map(t => t.category))];
// const priorities = ['All', 'High', 'Medium', 'Low'];
// const statuses = ['All', 'Pending', 'Completed'];

// const TaskGrid = () => {
//   const [tasks] = useState(tasksData);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterPriority, setFilterPriority] = useState('All');
//   const [filterCategory, setFilterCategory] = useState('All');
//   const [filterStatus, setFilterStatus] = useState('All');
  

//   const filteredTasks = tasks.filter(task => {

//     const matchesSearch = 
//       task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
//       task.description.toLowerCase().includes(searchTerm.toLowerCase());

 
//     const matchesPriority = 
//       filterPriority === 'All' || task.priority === filterPriority;
    

//     const matchesCategory = 
//       filterCategory === 'All' || task.category === filterCategory;

   
//     const matchesStatus = 
//       filterStatus === 'All' || 
//       (filterStatus === 'Completed' && task.completed) ||
//       (filterStatus === 'Pending' && !task.completed);
    
//     return matchesSearch && matchesPriority && matchesCategory && matchesStatus;
//   });

//   return (
//     <div className="task-planner-container">
     
//       <div className="controls-bar">
//         <input 
//           type="text" 
//           placeholder="Search task by title or description..." 
//           className="search-input"
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
        
//         <div className="dropdowns">
//           <select onChange={(e) => setFilterCategory(e.target.value)} value={filterCategory}>
//             {categories.map(cat => <option key={cat} value={cat}>{cat} Category</option>)}
//           </select>
//         </div>
//         <div className="dropdowns">
//           <select onChange={(e) => setFilterPriority(e.target.value)} value={filterPriority}>
//             {priorities.map(p => <option key={p} value={p}>{p} Priority</option>)}
//           </select>
//         </div>
//         <div className="dropdowns">
//           <select onChange={(e) => setFilterStatus(e.target.value)} value={filterStatus}>
//             {statuses.map(s => <option key={s} value={s}>{s} Status</option>)}
//           </select>
//         </div>
//       </div>

     
//       <div className="task-grid">
//         {filteredTasks.length > 0 ? (
//           filteredTasks.map(task => (
//             <TaskCard key={task.id} task={task} />
//           ))
//         ) : (
//           <p className="no-tasks">Not Found </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TaskGrid;


// import React, { useState, useEffect } from "react";
// import { db } from "../services/firebase";
// import { collection, query, where, onSnapshot, orderBy, updateDoc, deleteDoc, doc } from "firebase/firestore";
// import { useAuth } from "../contexts/AuthContext";
// import TaskCard from "./TaskCard";
// import colors from "../constants/colors";

// export default function TaskGrid() {
//   const { currentUser } = useAuth();
//   const [tasks, setTasks] = useState([]);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterPriority, setFilterPriority] = useState("All");
//   const [filterCategory, setFilterCategory] = useState("All");
//   const [filterStatus, setFilterStatus] = useState("All");

//   // --- Fetch tasks in real-time ---
//   useEffect(() => {
//     if (!currentUser) return;

//     const q = query(
//       collection(db, "tasks"),
//       where("userId", "==", currentUser.uid),
//       orderBy("createdAt", "desc")
//     );

//     const unsubscribe = onSnapshot(q, snapshot => {
//       setTasks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
//     });

//     return () => unsubscribe();
//   }, [currentUser]);

//   // --- Toggle completion ---
//   const toggleComplete = async (task) => {
//     await updateDoc(doc(db, "tasks", task.id), { isCompleted: !task.isCompleted });
//   };

//   // --- Delete task ---
//   const deleteTask = async (taskId) => {
//     if (!window.confirm("Delete this task?")) return;
//     await deleteDoc(doc(db, "tasks", taskId));
//   };

//   // --- Filter tasks ---
//   const filteredTasks = tasks.filter(task => {
//     const matchesSearch = task.task?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       task.description?.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesPriority = filterPriority === "All" || task.priority === filterPriority;
//     const matchesCategory = filterCategory === "All" || task.category === filterCategory;
//     const matchesStatus = filterStatus === "All" ||
//       (filterStatus === "Completed" && task.isCompleted) ||
//       (filterStatus === "Pending" && !task.isCompleted);

//     return matchesSearch && matchesPriority && matchesCategory && matchesStatus;
//   });

//   return (
//     <div style={{ padding: "20px", minHeight: "80vh", background: colors.backgroundGradient }}>
//       <h2 style={{ color: "white", borderBottom: `2px solid ${colors.Primary}`, paddingBottom: "10px" }}>Tasks</h2>

//       {/* Filters */}
//       <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "20px" }}>
//         <input placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.2)", backgroundColor: "rgba(255,255,255,0.1)", color: "white" }} />
//         <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} style={{ padding: "10px", borderRadius: "8px" }}>
//           <option value="All">All Categories</option>
//           <option value="Personal">Personal</option>
//           <option value="Office">Office</option>
//         </select>
//         <select value={filterPriority} onChange={e => setFilterPriority(e.target.value)} style={{ padding: "10px", borderRadius: "8px" }}>
//           <option value="All">All Priority</option>
//           <option>High</option>
//           <option>Medium</option>
//           <option>Low</option>
//         </select>
//         <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ padding: "10px", borderRadius: "8px" }}>
//           <option value="All">All Status</option>
//           <option value="Pending">Pending</option>
//           <option value="Completed">Completed</option>
//         </select>
//       </div>

//       {/* Task Cards */}
//       <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
//         {filteredTasks.length === 0 ? <p style={{ color: "rgba(255,255,255,0.6)" }}>No tasks found...</p> :
//           filteredTasks.map(task => (
//             <TaskCard key={task.id} task={task} onToggleComplete={() => toggleComplete(task)} onDelete={() => deleteTask(task.id)} />
//           ))
//         }
//       </div>
//     </div>
//   );
// }


// import React, { useState, useEffect, useRef } from "react";
// import { db, auth } from "../services/firebase";
// import { collection, query, orderBy, onSnapshot, updateDoc, doc, deleteDoc } from "firebase/firestore";
// import TaskCard from "./TaskCard";

// export default function TaskGrid() {
//   const [tasks, setTasks] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterPriority, setFilterPriority] = useState("All");
//   const [filterCategory, setFilterCategory] = useState("All");
//   const [filterStatus, setFilterStatus] = useState("Pending"); // default pending
//   const [completedTasksAnimating, setCompletedTasksAnimating] = useState(new Set());

//   const notifiedTasks = useRef(new Set());
//   const audioRef = useRef(new Audio("/notification.mp3"));

//   const userId = auth.currentUser?.uid;

//   // --- Load tasks ---
//   useEffect(() => {
//     if (!userId) return;
//     const tasksCol = collection(db, "users", userId, "tasks");
//     const q = query(tasksCol, orderBy("createdAt", "desc"));

//     const unsubscribe = onSnapshot(q, snapshot => {
//       const fetchedTasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setTasks(fetchedTasks);
//       notifiedTasks.current = new Set();
//     });

//     return () => unsubscribe();
//   }, [userId]);

//   // --- Notifications ---
//   useEffect(() => {
//     if (!userId) return;
//     if (Notification.permission !== "granted") Notification.requestPermission();

//     const notifyPendingTasks = () => {
//       tasks.forEach(task => {
//         if (!task.isCompleted && task.dueDate) {
//           const dueTime = new Date(task.dueDate).getTime();
//           const now = Date.now();
//           const timeLeft = dueTime - now;
//           if (timeLeft <= 3600000 && timeLeft > 0 && !notifiedTasks.current.has(task.id)) {
//             if (Notification.permission === "granted") {
//               new Notification(`Task Due Soon: ${task.task}`, { body: `Due at ${task.dueDate}` });
//             }
//             audioRef.current.play().catch(err => console.log(err));
//             notifiedTasks.current.add(task.id);
//           }
//         }
//       });
//     };

//     const interval = setInterval(notifyPendingTasks, 60000);
//     return () => clearInterval(interval);
//   }, [tasks, userId]);

//   // --- Complete task ---
//   const toggleComplete = async (task) => {
//     if (!userId) return;

//     await updateDoc(doc(db, "users", userId, "tasks", task.id), { isCompleted: !task.isCompleted });

//     // Only fade out if currently Pending → Completed
//     if (!task.isCompleted && filterStatus === "Pending") {
//       setCompletedTasksAnimating(prev => new Set(prev).add(task.id));
//       setTimeout(() => {
//         setCompletedTasksAnimating(prev => {
//           const newSet = new Set(prev);
//           newSet.delete(task.id);
//           return newSet;
//         });
//       }, 500);
//     }

//     notifiedTasks.current.delete(task.id);
//   };

//   // --- Delete task ---
//   const deleteTask = async (task) => {
//     if (!userId) return;
//     if (window.confirm("Delete this task?")) {
//       await deleteDoc(doc(db, "users", userId, "tasks", task.id));
//       notifiedTasks.current.delete(task.id);
//     }
//   };

//   // --- Filter tasks ---
//   const filteredTasks = tasks.filter(task => {
//     const matchesSearch =
//       task.task.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       task.description.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesPriority = filterPriority === "All" || task.priority === filterPriority;
//     const matchesCategory = filterCategory === "All" || task.category === filterCategory;
//     const matchesStatus =
//       filterStatus === "All" ||
//       (filterStatus === "Completed" && task.isCompleted) ||
//       (filterStatus === "Pending" && !task.isCompleted);

//     return matchesSearch && matchesPriority && matchesCategory && matchesStatus;
//   });

//   return (
//     <div style={{ padding: 20 }}>
//       {/* Filters */}
//       <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
//         <button
//           onClick={() => setFilterStatus("Pending")}
//           style={{
//             padding: 10, borderRadius: 8, flex: 1,
//             backgroundColor: filterStatus === "Pending" ? "#4CAF50" : "#555",
//             color: "white", cursor: "pointer", fontWeight: "bold"
//           }}
//         >Pending Tasks</button>
//         <button
//           onClick={() => setFilterStatus("Completed")}
//           style={{
//             padding: 10, borderRadius: 8, flex: 1,
//             backgroundColor: filterStatus === "Completed" ? "#2196F3" : "#555",
//             color: "white", cursor: "pointer", fontWeight: "bold"
//           }}
//         >Completed Tasks</button>
//         <button
//           onClick={() => setFilterStatus("All")}
//           style={{
//             padding: 10, borderRadius: 8, flex: 1,
//             backgroundColor: filterStatus === "All" ? "#FF9800" : "#555",
//             color: "white", cursor: "pointer", fontWeight: "bold"
//           }}
//         >All Tasks</button>
//       </div>

//       <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
//         <input
//           placeholder="Search..."
//           value={searchTerm}
//           onChange={e => setSearchTerm(e.target.value)}
//           style={{ flex: 1, padding: 10, borderRadius: 8 }}
//         />
//       </div>

//       {/* Task List */}
//       <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//         {filteredTasks.length === 0 ? (
//           <p style={{ color: "#ccc" }}>No tasks found...</p>
//         ) : (
//           filteredTasks.map(task => (
//             <TaskCard
//               key={task.id}
//               task={task}
//               onComplete={toggleComplete}
//               onDelete={deleteTask}
//               fadingOut={completedTasksAnimating.has(task.id)}
//             />
//           ))
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect, useRef } from "react";
import { db, auth } from "../services/firebase";
import { collection, query, orderBy, onSnapshot, updateDoc, doc, deleteDoc } from "firebase/firestore";
import TaskCard from "./TaskCard";
import Toast from "./Toast";

export default function TaskGrid() {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPriority, setFilterPriority] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("Pending");
  const [completedTasksAnimating, setCompletedTasksAnimating] = useState(new Set());

  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastCategory, setToastCategory] = useState("Default");

  const notifiedTasks = useRef(new Set());
  const audioRef = useRef(new Audio("/notification.mp3"));

  const userId = auth.currentUser?.uid;

  // --- Load tasks ---
  useEffect(() => {
    if (!userId) return;
    const tasksCol = collection(db, "users", userId, "tasks");
    const q = query(tasksCol, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, snapshot => {
      const fetchedTasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(fetchedTasks);
      notifiedTasks.current = new Set();
    });

    return () => unsubscribe();
  }, [userId]);

  // --- Notifications for upcoming tasks ---
  useEffect(() => {
    if (!userId) return;
    if (Notification.permission !== "granted") Notification.requestPermission();

    const notifyPendingTasks = () => {
      tasks.forEach(task => {
        if (!task.isCompleted && task.dueDate) {
          const dueTime = new Date(task.dueDate).getTime();
          const now = Date.now();
          const timeLeft = dueTime - now;
          if (timeLeft <= 3600000 && timeLeft > 0 && !notifiedTasks.current.has(task.id)) {
            if (Notification.permission === "granted") {
              new Notification(`Task Due Soon: ${task.task}`, { body: `Due at ${task.dueDate}` });
            }
            audioRef.current.play().catch(err => console.log(err));
            notifiedTasks.current.add(task.id);
          }
        }
      });
    };

    const interval = setInterval(notifyPendingTasks, 60000);
    return () => clearInterval(interval);
  }, [tasks, userId]);

  // --- Complete task ---
  const toggleComplete = async (task) => {
    if (!userId) return;

    const confirmComplete = window.confirm(`Mark task "${task.task}" as complete?`);
    if (!confirmComplete) return;

    await updateDoc(doc(db, "users", userId, "tasks", task.id), { isCompleted: true });

    // Show toast
    setToastMessage(`Task "${task.task}" marked complete!`);
    setToastCategory(task.category);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);

    if (filterStatus === "Pending") {
      setCompletedTasksAnimating(prev => new Set(prev).add(task.id));
      setTimeout(() => {
        setCompletedTasksAnimating(prev => {
          const newSet = new Set(prev);
          newSet.delete(task.id);
          return newSet;
        });
      }, 500);
    }

    notifiedTasks.current.delete(task.id);
  };

  // --- Delete task ---
  const deleteTask = async (task) => {
    if (!userId) return;
    if (window.confirm("Delete this task?")) {
      await deleteDoc(doc(db, "users", userId, "tasks", task.id));
      notifiedTasks.current.delete(task.id);
    }
  };

  // --- Filter tasks ---
  const filteredTasks = tasks.filter(task => {
    const matchesSearch =
      task.task.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === "All" || task.priority === filterPriority;
    const matchesCategory = filterCategory === "All" || task.category === filterCategory;
    const matchesStatus =
      filterStatus === "All" ||
      (filterStatus === "Completed" && task.isCompleted) ||
      (filterStatus === "Pending" && !task.isCompleted);

    return matchesSearch && matchesPriority && matchesCategory && matchesStatus;
  });

  return (
    <div style={{ padding: 20 }}>
      {/* Status Filters */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <button
          onClick={() => setFilterStatus("Pending")}
          style={{
            padding: 10, borderRadius: 8, flex: 1,
            backgroundColor: filterStatus === "Pending" ? "#4CAF50" : "#555",
            color: "white", cursor: "pointer", fontWeight: "bold"
          }}
        >Pending Tasks</button>
        <button
          onClick={() => setFilterStatus("Completed")}
          style={{
            padding: 10, borderRadius: 8, flex: 1,
            backgroundColor: filterStatus === "Completed" ? "#2196F3" : "#555",
            color: "white", cursor: "pointer", fontWeight: "bold"
          }}
        >Completed Tasks</button>
        <button
          onClick={() => setFilterStatus("All")}
          style={{
            padding: 10, borderRadius: 8, flex: 1,
            backgroundColor: filterStatus === "All" ? "#FF9800" : "#555",
            color: "white", cursor: "pointer", fontWeight: "bold"
          }}
        >All Tasks</button>
      </div>

      {/* Search */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <input
          placeholder="Search..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ flex: 1, padding: 10, borderRadius: 8 }}
        />
        <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} style={{ padding: 10, borderRadius: 8 }}>
          <option value="All">All Categories</option>
          <option>Personal</option>
          <option>Office</option>
          <option>Study</option>
          <option>Other</option>
        </select>
      </div>

      {/* Task List */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filteredTasks.length === 0 ? (
          <p style={{ color: "#ccc" }}>No tasks found...</p>
        ) : (
          filteredTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onComplete={toggleComplete}
              onDelete={deleteTask}
              fadingOut={completedTasksAnimating.has(task.id)}
            />
          ))
        )}
      </div>

      {/* Toast */}
      <Toast message={toastMessage} show={showToast} category={toastCategory} />
    </div>
  );
}
