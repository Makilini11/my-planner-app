import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import colors from '../constants/colors';


const initialTasks = [
    { id: 1, title: 'Project submit', category: 'Work', isCompleted: false },
    { id: 2, title: 'Go to school', category: 'education', isCompleted: false },
    { id: 3, title: 'Learn react', category: 'Knowledge', isCompleted: false },
    { id: 4, title: 'Go to beach', category: 'Hobby', isCompleted: true }, 
    { id: 5, title: 'Prepare to lunch', category: 'Work', isCompleted: false },
];

function Home() {
   
    const [allTasks, setAllTasks] = useState(initialTasks);
    const pendingTasks = allTasks.filter(task => !task.isCompleted);
    const handleToggleComplete = (taskId) => {
        
        setAllTasks(prevAllTasks => 
            prevAllTasks.map(task => 
                task.id === taskId ? { ...task, isCompleted: true } : task
            )
        );
       
    };
    
   
    const completedTasksCount = allTasks.filter(task => task.isCompleted).length;
    const totalTasksCount = allTasks.length;

   
    const homeContainerStyle = {
        padding: '20px',
        backgroundColor: colors.Neutral,
        minHeight: '80vh',
    };
    
    const cardStyle = {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
        marginBottom: '20px',
    };

    const summaryTextStyle = {
        color: colors.Text,
        fontSize: '1.1em',
        fontWeight: 'normal',
        marginBottom: '10px',
    };

    const taskListStyle = {
        listStyle: 'none',
        padding: 0,
        margin: 0,
    };

    const taskItemStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 15px',
        borderBottom: `1px solid ${colors.Secondary}`,
        color: colors.Text,
        fontSize: '1em',
        backgroundColor: colors.Neutral + '50',
        borderRadius: '5px',
        marginBottom: '5px',
    };

    const taskInfoStyle = {
        flexGrow: 1,
    };

    const categoryTagStyle = (category) => ({
        padding: '3px 8px',
        borderRadius: '15px',
        fontSize: '0.8em',
        fontWeight: 'bold',
        marginLeft: '10px',
        backgroundColor: category === 'Work' ? colors.Primary + '50' : category === 'Personal' ? colors.Secondary + '80' : colors.Text + '30',
        color: colors.Text,
    });

    const completeButtonStyle = {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1.5em',
        color: colors.Primary,
        marginLeft: '15px',
        outline: 'none',
    };


    return (
        <div style={homeContainerStyle}>
            <h2 style={{ color: colors.Text, marginBottom: '20px', paddingBottom: '10px', borderBottom: `2px solid ${colors.Secondary}` }}>
              Dashboard
            </h2>

           
            <div style={cardStyle}>
                <h3 style={{ color: colors.Text, borderBottom: `1px solid ${colors.Secondary}`, paddingBottom: '10px', marginBottom: '10px' }}>
                    Summary 
                </h3>
                <p style={summaryTextStyle}>
                   Finished Tasks: <span style={{ color: colors.Primary, fontWeight: 'bold' }}>{completedTasksCount}</span>
                </p>
                <p style={summaryTextStyle}>
                    NotFinish Tasks: <span style={{ color: colors.Primary, fontWeight: 'bold' }}>{pendingTasks.length}</span> / {totalTasksCount}
                </p>
                
                <Link to="/dashboard/activities/tasks" style={{ color: colors.Primary, textDecoration: 'none', fontWeight: 'bold' }}>
                    All Tasks View →
                </Link>
            </div>

        
            <div style={cardStyle}>
                <h3 style={{ color: colors.Text, marginBottom: '15px' }}>
                    Today Pending Tasks
                </h3>
                
                {pendingTasks.length > 0 ? (
                    <ul style={taskListStyle}>
                        {pendingTasks.map(task => (
                            <li key={task.id} style={taskItemStyle}>
                                <div style={taskInfoStyle}>
                                    {task.title}
                                    <span style={categoryTagStyle(task.category)}>{task.category}</span>
                                </div>
                                
                                <button 
                                    onClick={() => handleToggleComplete(task.id)} 
                                    style={completeButtonStyle}
                                    title="Please Mark to finished Task"
                                >
                                    ✅ 
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p style={{ color: colors.Text + '80', padding: '10px', backgroundColor: colors.Secondary + '50', borderRadius: '5px' }}>
                        🎉 Congratulation! You finished Today Tasks!
                    </p>
                )}
            </div>
            
        </div>
    );
}

export default Home