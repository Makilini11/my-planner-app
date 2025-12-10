
import React from 'react';
import '../taskstyle/TaskCard.css'; 

const TaskCard = ({ task }) => {
  const priorityClass = task.priority.toLowerCase();
  const statusIcon = task.completed ? '✅ Completed' : '⏳ Pending';

  return (
    <div className={`task-card ${priorityClass}`}>
      <div className="task-header">
        <h3 className={`task-title ${task.completed ? 'completed-text' : ''}`}>
          {task.title}
        </h3>
        <span className={`priority-tag ${priorityClass}`}>{task.priority}</span>
      </div>
      <p className="task-description">{task.description}</p>
      
      <div className="task-footer">
        <div className="task-info-left">
          <span className="task-category">Category: {task.category}</span>
          <span className="due-date">Due: {task.dueDate}</span>
        </div>
        <div className={`completion-status-pill ${task.completed ? 'completed' : 'pending'}`}>
          {statusIcon}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;