// import React, { useState, useEffect, useMemo } from 'react';
// import { db, auth } from '../services/firebase';
// import { doc, getDoc, collection, getDocs, addDoc, updateDoc, deleteDoc, query, where, onSnapshot, orderBy } from 'firebase/firestore';
// import colors from '../constants/colors';
// import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
// import TaskCard from './TaskCard';

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD'];

// function UnifiedDashboard() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const [expenses, setExpenses] = useState([]);
//   const [newExpense, setNewExpense] = useState({ id: null, description: '', amount: '', category: '' });
//   const [budgetLimit, setBudgetLimit] = useState(50000);

//   const [tasks, setTasks] = useState([]);

//   // Filters for TaskGrid
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterPriority, setFilterPriority] = useState('All');
//   const [filterCategory, setFilterCategory] = useState('All');
//   const [filterStatus, setFilterStatus] = useState('All');

//   // Listen for Firebase auth
//   useEffect(() => {
//     const unsubscribeAuth = auth.onAuthStateChanged(async (currentUser) => {
//       setUser(currentUser);
//       if (currentUser) {
//         const userId = currentUser.uid;

//         // Fetch Budget
//         try {
//           const budgetDoc = await getDoc(doc(db, 'budgets', userId));
//           if (budgetDoc.exists()) setBudgetLimit(budgetDoc.data().budget);
//         } catch (err) { console.error('Budget fetch error:', err); }

//         // Fetch Expenses
//         try {
//           const expenseCollection = collection(db, 'users', userId, 'expenses');
//           const expenseSnapshot = await getDocs(expenseCollection);
//           setExpenses(expenseSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
//         } catch (err) { console.error('Expenses fetch error:', err); }

//         // Fetch Tasks
//         const q = query(collection(db, 'tasks'), where('userId', '==', userId), orderBy('createdAt', 'desc'));
//         const unsubscribeTasks = onSnapshot(q, snapshot => {
//           setTasks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
//         });

//         // Cleanup on unmount
//         return () => unsubscribeTasks();
//       }
//       setLoading(false); // Stop loading if no user
//     });

//     return () => unsubscribeAuth();
//   }, []);

//   // Budget calculations
//   const { totalSpent, remainingBudget, isOverBudget } = useMemo(() => {
//     const spent = expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);
//     const remaining = budgetLimit - spent;
//     return { totalSpent: spent, remainingBudget: remaining, isOverBudget: remaining < 0 };
//   }, [expenses, budgetLimit]);

//   const categoryTotals = useMemo(() => {
//     const totals = {};
//     expenses.forEach(exp => { totals[exp.category] = (totals[exp.category] || 0) + parseFloat(exp.amount); });
//     return Object.entries(totals).map(([category, amount]) => ({ category, amount }));
//   }, [expenses]);

//   // Add / Update Expense
//   const handleAddOrUpdateExpense = async (e) => {
//     e.preventDefault();
//     if (!user) return;
//     if (!newExpense.description || newExpense.amount <= 0 || !newExpense.category) return alert('Fill all fields');

//     const userId = user.uid;

//     if (newExpense.id) {
//       // Update
//       try {
//         const expenseRef = doc(db, 'users', userId, 'expenses', newExpense.id);
//         await updateDoc(expenseRef, { ...newExpense, amount: parseFloat(newExpense.amount) });
//         setExpenses(expenses.map(exp => exp.id === newExpense.id ? { ...exp, ...newExpense, amount: parseFloat(newExpense.amount) } : exp));
//         setNewExpense({ id: null, description: '', amount: '', category: '' });
//       } catch (err) { console.error(err); }
//     } else {
//       // Add
//       try {
//         const docRef = await addDoc(collection(db, 'users', userId, 'expenses'), {
//           description: newExpense.description,
//           amount: parseFloat(newExpense.amount),
//           category: newExpense.category,
//           date: new Date().toISOString().substring(0, 10)
//         });
//         setExpenses([...expenses, { id: docRef.id, ...newExpense, amount: parseFloat(newExpense.amount), date: new Date().toISOString().substring(0, 10) }]);
//         setNewExpense({ id: null, description: '', amount: '', category: '' });
//       } catch (err) { console.error(err); }
//     }
//   };

//   const handleEditExpense = (exp) => setNewExpense({ ...exp });
//   const handleDeleteExpense = async (id) => {
//     if (!user) return;
//     if (!window.confirm('Delete this expense?')) return;
//     try { await deleteDoc(doc(db, 'users', user.uid, 'expenses', id)); setExpenses(expenses.filter(exp => exp.id !== id)); } catch (err) { console.error(err); }
//   };
//   const handleBudgetSave = async () => { if (!user) return; await setDoc(doc(db, 'budgets', user.uid), { budget: budgetLimit }); alert('Budget saved'); };

//   // Task Filtering
//   const filteredTasks = tasks.filter(task => {
//     const matchesSearch =
//       task.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       task.description?.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesPriority = filterPriority === 'All' || task.priority === filterPriority;
//     const matchesCategory = filterCategory === 'All' || task.category === filterCategory;
//     const matchesStatus = filterStatus === 'All' || (filterStatus === 'Completed' && task.completed) || (filterStatus === 'Pending' && !task.completed);

//     return matchesSearch && matchesPriority && matchesCategory && matchesStatus;
//   });

//   // Styles
//   const containerStyle = { padding: '20px', backgroundColor: colors.Neutral, minHeight: '100vh' };
//   const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '20px' };
//   const cardStyle = { backgroundColor: '#72717140', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.05)' };
//   const summaryCardStyle = { ...cardStyle, borderLeft: isOverBudget ? `5px solid red` : `5px solid ${colors.Primary}` };
//   const budgetStatusStyle = { fontWeight: 'bold', color: isOverBudget ? 'red' : colors.Text, fontSize: '1.2em' };
//   const formInputStyle = { padding: '10px', margin: '5px 0', borderRadius: '5px', border: `1px solid ${colors.Secondary}`, width: '100%', boxSizing: 'border-box' };
//   const formButtonStyle = { padding: '10px 15px', backgroundColor: colors.Primary, color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px', width: '100%', fontWeight: 'bold' };
//   const expenseItemStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: `1px dashed ${colors.Secondary}` };
//   const smallButtonStyle = { marginLeft: '10px', padding: '5px 10px', borderRadius: '5px', border: 'none', cursor: 'pointer' };

//   if (loading) return <p>Loading...</p>;
//   if (!user) return <p>Please login to view your dashboard.</p>;

//   return (
//     <div style={containerStyle}>
//       <h2 style={{ color: colors.Text, marginBottom: '20px', borderBottom: `2px solid ${colors.Secondary}`, paddingBottom: '10px' }}>Unified Dashboard</h2>

//       {/* Budget Summary + PieChart */}
//       <div style={gridStyle}>
//         <div style={summaryCardStyle}>
//           <h3>Budget Summary</h3>
//           <p>Total Budget: <strong>₹{budgetLimit.toLocaleString('en-IN')}</strong></p>
//           <p>Total Expenses: <strong>₹{totalSpent.toLocaleString('en-IN')}</strong></p>
//           <p>Remaining: <span style={budgetStatusStyle}>₹{remainingBudget.toLocaleString('en-IN')} {isOverBudget && `(₹${Math.abs(remainingBudget).toLocaleString('en-IN')} over)`}</span></p>
//         </div>

//         <div style={cardStyle}>
//           <h3>Spending by Category</h3>
//           {expenses.length === 0 ? <p>No expenses yet</p> : (
//             <PieChart width={400} height={300}>
//               <Pie data={categoryTotals} dataKey="amount" nameKey="category" cx="50%" cy="50%" outerRadius={100} label={(entry) => `${entry.category} (${((entry.amount/totalSpent)*100).toFixed(1)}%)`}>
//                 {categoryTotals.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
//               </Pie>
//               <Tooltip formatter={value => `₹${value.toLocaleString('en-IN')}`} />
//               <Legend />
//             </PieChart>
//           )}
//         </div>
//       </div>

//       {/* Set Budget */}
//       <div style={cardStyle}>
//         <h3>Set Your Budget</h3>
//         <input type="number" style={formInputStyle} value={budgetLimit} onChange={(e) => setBudgetLimit(parseFloat(e.target.value))} />
//         <button style={formButtonStyle} onClick={handleBudgetSave}>Save Budget</button>
//       </div>

//       {/* Add / Edit Expense */}
//       <div style={cardStyle}>
//         <h3>{newExpense.id ? 'Edit Expense' : 'Add New Expense'}</h3>
//         <form onSubmit={handleAddOrUpdateExpense}>
//           <input type="text" placeholder="Description" style={formInputStyle} value={newExpense.description} onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })} required />
//           <input type="number" placeholder="Amount" style={formInputStyle} value={newExpense.amount} onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })} required />
//           <select style={formInputStyle} value={newExpense.category} onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })} required>
//             <option value="">Category</option>
//             <option value="Food">Food</option>
//             <option value="Travel">Travel</option>
//             <option value="Medical">Medical</option>
//             <option value="Education">Education</option>
//             <option value="Others">Others</option>
//           </select>
//           <button type="submit" style={formButtonStyle}>{newExpense.id ? 'Update Expense' : 'Add Expense'}</button>
//         </form>
//       </div>

//       {/* Expenses List */}
//       <div style={cardStyle}>
//         <h3>Recent Expenses</h3>
//         {expenses.length === 0 ? <p>No expenses yet.</p> : expenses.map(exp => (
//           <div key={exp.id} style={expenseItemStyle}>
//             <div>
//               <strong>{exp.description}</strong> ({exp.category})<br />
//               <small style={{ color: colors.Text + '70' }}>{exp.date}</small>
//             </div>
//             <div>
//               <strong>₹{parseFloat(exp.amount).toLocaleString('en-IN')}</strong>
//               <button style={{ ...smallButtonStyle, backgroundColor:'#f0ad4e', color:'#fff' }} onClick={()=>handleEditExpense(exp)}>Edit</button>
//               <button style={{ ...smallButtonStyle, backgroundColor:'#d9534f', color:'#fff' }} onClick={()=>handleDeleteExpense(exp.id)}>Delete</button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* TaskGrid */}
//       <div style={{ ...cardStyle, marginTop: '20px' }}>
//         <h3>My Tasks</h3>

//         {/* Task Filters */}
//         <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '15px' }}>
//           <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={formInputStyle} />
//           <select value={filterCategory} onChange={(e)=>setFilterCategory(e.target.value)} style={{padding:'10px', borderRadius:'5px'}}>
//             <option value="All">All Categories</option>
//             <option value="Personal">Personal</option>
//             <option value="Office">Office</option>
//           </select>
//           <select value={filterPriority} onChange={(e)=>setFilterPriority(e.target.value)} style={{padding:'10px', borderRadius:'5px'}}>
//             <option value="All">All Priority</option>
//             <option value="High">High</option>
//             <option value="Medium">Medium</option>
//             <option value="Low">Low</option>
//           </select>
//           <select value={filterStatus} onChange={(e)=>setFilterStatus(e.target.value)} style={{padding:'10px', borderRadius:'5px'}}>
//             <option value="All">All Status</option>
//             <option value="Pending">Pending</option>
//             <option value="Completed">Completed</option>
//           </select>
//         </div>

//         {/* Tasks */}
//         {filteredTasks.length === 0 ? <p>No tasks found</p> : filteredTasks.map(task => <TaskCard key={task.id} task={task} />)}
//       </div>

//     </div>
//   );
// }

// export default UnifiedDashboard;
