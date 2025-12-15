
// import React from 'react';
// import '../taskstyle/TaskCard.css'; 

// const TaskCard = ({ task }) => {
//   const priorityClass = task.priority.toLowerCase();
//   const statusIcon = task.completed ? '✅ Completed' : '⏳ Pending';

//   return (
//     <div className={`task-card ${priorityClass}`}>
//       <div className="task-header">
//         <h3 className={`task-title ${task.completed ? 'completed-text' : ''}`}>
//           {task.title}
//         </h3>
//         <span className={`priority-tag ${priorityClass}`}>{task.priority}</span>
//       </div>
//       <p className="task-description">{task.description}</p>
      
//       <div className="task-footer">
//         <div className="task-info-left">
//           <span className="task-category">Category: {task.category}</span>
//           <span className="due-date">Due: {task.dueDate}</span>
//         </div>
//         <div className={`completion-status-pill ${task.completed ? 'completed' : 'pending'}`}>
//           {statusIcon}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TaskCard;
import React from "react";
import "../taskstyle/TaskCard.css";

const TaskCard = ({ task, onComplete, onDelete, fadingOut }) => {
  const isOverdue = !task.isCompleted && task.dueDate && new Date(task.dueDate) < new Date();
  const statusIcon = task.isCompleted ? "✅ Completed" : "⏳ Pending";

  return (
    <div
      className={`task-card ${task.priority.toLowerCase()} ${isOverdue ? "overdue" : ""}`}
      style={{
        opacity: fadingOut ? 0 : 1,
        transition: "opacity 0.5s ease, transform 0.5s ease",
        transform: fadingOut ? "translateX(50px)" : "translateX(0)",
        backgroundColor: isOverdue ? "#ff4d4d40" : "#72717130",
        border: isOverdue ? "1px solid #ff4d4d" : "1px solid rgba(255,255,255,0.15)",
      }}
    >
      <div className="task-header">
        <h3 className={`task-title ${task.isCompleted ? "completed-text" : ""}`} style={{ textDecoration: task.isCompleted ? "line-through" : "none", opacity: task.isCompleted ? 0.6 : 1 }}>
          {task.task}
        </h3>
        <span className={`priority-tag ${task.priority.toLowerCase()}`}>{task.priority}</span>
      </div>

      <p className="task-description" style={{ opacity: task.isCompleted ? 0.6 : 1 }}>
        {task.description}
      </p>

      <div className="task-footer">
        <div className="task-info-left">
          <span className="task-category">Category: {task.category}</span>
          <span className="due-date" style={{ color: isOverdue ? "red" : "inherit" }}>
            Due: {task.dueDate}
          </span>
        </div>
        <div className="task-actions">
          <button
            className={`completion-btn ${task.isCompleted ? "completed" : "pending"}`}
            onClick={() => onComplete(task)}
          >
            {statusIcon}
          </button>
          <button className="delete-btn" onClick={() => onDelete(task)}>
            🗑 Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
