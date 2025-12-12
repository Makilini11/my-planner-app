
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


import React, { useState, useEffect } from "react";
import { db } from "../services/firebase";
import { collection, query, where, onSnapshot, orderBy, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import TaskCard from "./TaskCard";

export default function TaskGrid() {
  const { currentUser } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPriority, setFilterPriority] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    if (!currentUser) return;
    const q = query(collection(db, "tasks"), where("userId", "==", currentUser.uid), orderBy("createdAt","desc"));
    const unsubscribe = onSnapshot(q, snapshot => {
      setTasks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [currentUser]);

  const toggleComplete = async (task) => {
    await updateDoc(doc(db, "tasks", task.id), { isCompleted: !task.isCompleted });
  };

  const deleteTask = async (task) => {
    if(window.confirm("Delete this task?")){
      await deleteDoc(doc(db, "tasks", task.id));
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.task.toLowerCase().includes(searchTerm.toLowerCase()) || task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === "All" || task.priority === filterPriority;
    const matchesCategory = filterCategory === "All" || task.category === filterCategory;
    const matchesStatus = filterStatus === "All" || (filterStatus === "Completed" && task.isCompleted) || (filterStatus === "Pending" && !task.isCompleted);
    return matchesSearch && matchesPriority && matchesCategory && matchesStatus;
  });

  return (
    <div style={{ padding: 20 }}>
      {/* Filters */}
      <div style={{ display: "flex", gap:10, marginBottom: 20 }}>
        <input placeholder="Search..." value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} style={{ flex:1, padding:10, borderRadius:8 }}/>
        <select value={filterCategory} onChange={e=>setFilterCategory(e.target.value)} style={{ padding:10, borderRadius:8 }}>
          <option value="All">All Categories</option><option>Personal</option><option>Office</option>
        </select>
        <select value={filterPriority} onChange={e=>setFilterPriority(e.target.value)} style={{ padding:10, borderRadius:8 }}>
          <option value="All">All Priority</option><option>High</option><option>Medium</option><option>Low</option>
        </select>
        <select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)} style={{ padding:10, borderRadius:8 }}>
          <option value="All">All Status</option><option value="Pending">Pending</option><option value="Completed">Completed</option>
        </select>
      </div>

      {/* Task List */}
      <div style={{ display: "flex", flexDirection:"column", gap:10 }}>
        {filteredTasks.length === 0 ? <p style={{ color:"#ccc" }}>No tasks found...</p> :
          filteredTasks.map(task => (
            <TaskCard key={task.id} task={task} onComplete={toggleComplete} onDelete={deleteTask} />
          ))
        }
      </div>
    </div>
  );
}
