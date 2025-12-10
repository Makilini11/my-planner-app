
import React, { useState } from 'react';
import TaskCard from './TaskCard';
import tasksData from '../data/tasks.json'; 
import '../taskstyle/TaskGrid.css'; 


const categories = ['All', ...new Set(tasksData.map(t => t.category))];
const priorities = ['All', 'High', 'Medium', 'Low'];
const statuses = ['All', 'Pending', 'Completed'];

const TaskGrid = () => {
  const [tasks] = useState(tasksData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  

  const filteredTasks = tasks.filter(task => {

    const matchesSearch = 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      task.description.toLowerCase().includes(searchTerm.toLowerCase());

 
    const matchesPriority = 
      filterPriority === 'All' || task.priority === filterPriority;
    

    const matchesCategory = 
      filterCategory === 'All' || task.category === filterCategory;

   
    const matchesStatus = 
      filterStatus === 'All' || 
      (filterStatus === 'Completed' && task.completed) ||
      (filterStatus === 'Pending' && !task.completed);
    
    return matchesSearch && matchesPriority && matchesCategory && matchesStatus;
  });

  return (
    <div className="task-planner-container">
     
      <div className="controls-bar">
        <input 
          type="text" 
          placeholder="Search task by title or description..." 
          className="search-input"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <div className="dropdowns">
          <select onChange={(e) => setFilterCategory(e.target.value)} value={filterCategory}>
            {categories.map(cat => <option key={cat} value={cat}>{cat} Category</option>)}
          </select>
        </div>
        <div className="dropdowns">
          <select onChange={(e) => setFilterPriority(e.target.value)} value={filterPriority}>
            {priorities.map(p => <option key={p} value={p}>{p} Priority</option>)}
          </select>
        </div>
        <div className="dropdowns">
          <select onChange={(e) => setFilterStatus(e.target.value)} value={filterStatus}>
            {statuses.map(s => <option key={s} value={s}>{s} Status</option>)}
          </select>
        </div>
      </div>

     
      <div className="task-grid">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))
        ) : (
          <p className="no-tasks">Not Found </p>
        )}
      </div>
    </div>
  );
};

export default TaskGrid;