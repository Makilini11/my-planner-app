// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
// src/App.jsx

// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Login from './components/Login';
// import Register from './components/Register';
// import Dashboard from './components/Dashboard';
// import ProtectedRoute from './components/ProtectedRoute'; 

// function App() {
//   return (
//     <Routes>
//       {/* Public Routes */}
//       <Route path="/" element={<p>Home Page (Public)</p>} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />

//       {/* Protected Route */}
//       <Route 
//         path="/dashboard" 
//         element={
//           <ProtectedRoute>
//             <Dashboard />
//           </ProtectedRoute>
//         } 
//       />
//     </Routes>
//   );
// }

// export default App;








// src/App.jsx

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute'; 
import Layout from './components/Layout'; 
import Home from './components/Home'; 
import Tasks from './components/Tasks';
import Expenses from './components/Expenses';
import Notes from './components/Notes';
import Calendar from './components/Calendar';
import Activities from './components/Activities';
import Profile from './components/Profile';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Navigate to="/login" replace />} /> 
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes - Layout-ஐப் பயன்படுத்துகிறோம் */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        } 
      >
        {/* /dashboard-க்கு சென்றால் /dashboard/home-க்குச் செல்லும் */}
        <Route index element={<Navigate to="home" replace />} /> 
        
        {/* 1. Home Tab and its Sub-Navigation */}
        <Route path="home" element={<Home />}>
            <Route index element={<Navigate to="tasks" replace />} /> 
            <Route path="tasks" element={<Tasks />} />
            <Route path="expenses" element={<Expenses />} />
            <Route path="notes" element={<Notes />} />
        </Route>
        
        {/* 2. Calendar Tab and its Sub-Navigation (Task, Expenses, Notes) */}
        <Route path="calendar" element={<Calendar />}>
            <Route index element={<Navigate to="tasks" replace />} /> 
            <Route path="tasks" element={<Tasks />} />
            <Route path="expenses" element={<Expenses />} />
            <Route path="notes" element={<Notes />} />
        </Route>
        
        {/* 3. Activities Tab and its Sub-Navigation (Task, Expenses, Notes) */}
        <Route path="activities" element={<Activities />}>
            <Route index element={<Navigate to="tasks" replace />} /> 
            <Route path="tasks" element={<Tasks />} />
            <Route path="expenses" element={<Expenses />} />
            <Route path="notes" element={<Notes />} />
        </Route>

        {/* 4. Profile Route - Navbar-ல் இருந்தும் செல்லலாம் */}
        <Route path="profile" element={<Profile />} />
        
      </Route>
    </Routes>
  );
}

export default App;