

// import React, { useState, useMemo } from 'react';
// import colors from '../constants/colors';


// const BUDGET_LIMIT = 50000; 


// const initialExpenses = [
//     { id: 1, description: 'Food', amount: 15000, category: 'Food', date: '2025-12-01' },
//     { id: 2, description: 'Books', amount: 8500, category: 'Education', date: '2025-12-05' },
//     { id: 3, description: 'Travel', amount: 12000, category: 'Work', date: '2025-12-07' },
// ];

// function Expenses() {
//     const [expenses, setExpenses] = useState(initialExpenses);
//     const [newExpense, setNewExpense] = useState({ description: '', amount: '', category: '' });

   
//     const { totalSpent, remainingBudget, isOverBudget } = useMemo(() => {
//         const spent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
//         const remaining = BUDGET_LIMIT - spent;
//         return {
//             totalSpent: spent,
//             remainingBudget: remaining,
//             isOverBudget: remaining < 0,
//         };
//     }, [expenses]);


//     const handleAddExpense = (e) => {
//         e.preventDefault();
//         if (newExpense.description && newExpense.amount > 0 && newExpense.category) {
//             const newEntry = {
//                 id: Date.now(), 
//                 description: newExpense.description,
//                 amount: parseFloat(newExpense.amount),
//                 category: newExpense.category,
//                 date: new Date().toISOString().substring(0, 10),
//             };
//             setExpenses([...expenses, newEntry]);
//             setNewExpense({ description: '', amount: '', category: '' }); 
//         } else {
//             alert('Please Fill The Data.');
//         }
//     };
    
  
    
//     const expensesContainerStyle = { padding: '20px', backgroundColor: colors.Neutral, minHeight: '80vh' };
//     const cardStyle = { backgroundColor: '#72717140', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)', marginBottom: '20px' };
    
//     const summaryCardStyle = {
//         ...cardStyle,
//         borderLeft: isOverBudget ? `5px solid red` : `5px solid ${colors.Primary}`,
//     };

//     const budgetStatusStyle = {
//         fontWeight: 'bold',
//         color: isOverBudget ? 'red' : colors.Text,
//         fontSize: '1.2em',
//     };

//     const expenseItemStyle = {
//         display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px dashed ${colors.Secondary}`,
//     };

//     const formInputStyle = {
//         padding: '10px', margin: '5px 0', borderRadius: '5px', border: `1px solid ${colors.Secondary}`, width: '100%', boxSizing: 'border-box',
//     };

//     const formButtonStyle = {
//         padding: '10px 15px', backgroundColor: colors.Primary, color:  '#ffffffff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px', width: '100%', fontWeight: 'bold'
//     };


//     return (
//         <div style={expensesContainerStyle}>
//             <h2 style={{ color: colors.Text, marginBottom: '20px', paddingBottom: '10px', borderBottom: `2px solid ${colors.Secondary}` }}>
//               Expenses Tracking
//             </h2>

//             <div style={summaryCardStyle}>
//                 <h3 style={{ color: colors.Text, marginBottom: '10px' }}> Budget Summary </h3>
//                 <p>Total Budjet Limit: <strong>₹{BUDGET_LIMIT.toLocaleString('en-IN')}</strong></p>
//                 <p>Total Expenses: <strong style={{ color: colors.Text }}>₹{totalSpent.toLocaleString('en-IN')}</strong></p>
//                 <p>Balance: 
//                     <span style={budgetStatusStyle}>
//                         ₹{remainingBudget.toLocaleString('en-IN')} {isOverBudget && `(₹${Math.abs(remainingBudget).toLocaleString('en-IN')} அதிகம்)`}
//                     </span>
//                 </p>
//                 {isOverBudget && (
//                     <p style={{ color: 'red', fontWeight: 'bold', marginTop: '10px' }}>⚠️ Warning: You have exceeded your budget limit!</p>
//                 )}
//             </div>

//             <div style={cardStyle}>
//                 <h3 style={{ color: colors.Text, marginBottom: '15px' }}>new Expenses</h3>
//                 <form onSubmit={handleAddExpense}>
//                     <input 
//                         type="text" 
//                         placeholder="Explain (E.g : Restaurant)" 
//                         style={formInputStyle} 
//                         value={newExpense.description}
//                         onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
//                         required
//                     />
//                     <input 
//                         type="number" 
//                         placeholder="Amount(rupees)" 
//                         style={formInputStyle} 
//                         value={newExpense.amount}
//                         onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
//                         required
//                     />
//                     <select 
//                         style={formInputStyle}
//                         value={newExpense.category}
//                         onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
//                         required
//                     >
//                         <option value="">Category</option>
//                         <option value="Food">Food</option>
//                         <option value="Travel">Travel</option>
//                         <option value="Medical">Health</option>
//                         <option value="Education">Education</option>
//                         <option value="Others">Others</option>
//                     </select>
//                     <button type="submit" style={formButtonStyle}>Update </button>
//                 </form>
//             </div>

//             {/* செலவினப் பட்டியல் */}
//             <div style={cardStyle}>
//                 <h3 style={{ color: colors.Text, marginBottom: '15px' }}>Total Expenses</h3>
//                 {expenses.map(exp => (
//                     <div key={exp.id} style={expenseItemStyle}>
//                         <div>
//                             <strong>{exp.description}</strong> ({exp.category})<br />
//                             <small style={{ color: colors.Text + '70' }}>{exp.date}</small>
//                         </div>
//                         <strong style={{ color: colors.Text }}>₹{exp.amount.toLocaleString('en-IN')}</strong>
//                     </div>
//                 ))}
//             </div>
            
//         </div>
//     );
// }

// export default Expenses;


// import React, { useState, useEffect, useMemo } from 'react';
// import { db, auth } from '../services/firebase';
// import { doc, getDoc, setDoc, collection, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
// import colors from '../constants/colors';

// export default function Expenses() {
//   const [expenses, setExpenses] = useState([]);
//   const [newExpense, setNewExpense] = useState({ id: null, description: '', amount: '', category: '' });
//   const [budgetLimit, setBudgetLimit] = useState(50000);
//   const [loading, setLoading] = useState(true);
//   const userId = auth.currentUser?.uid;

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!userId) return;
//       try {
//         const budgetDoc = await getDoc(doc(db, 'budgets', userId));
//         if (budgetDoc.exists()) setBudgetLimit(budgetDoc.data().budget);

//         const expenseCollection = collection(db, 'users', userId, 'expenses');
//         const expenseSnapshot = await getDocs(expenseCollection);
//         setExpenses(expenseSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [userId]);

//   const { totalSpent, remainingBudget, isOverBudget } = useMemo(() => {
//     const spent = expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);
//     return { totalSpent: spent, remainingBudget: budgetLimit - spent, isOverBudget: (budgetLimit - spent) < 0 };
//   }, [expenses, budgetLimit]);

//   const handleAddOrUpdateExpense = async (e) => {
//     e.preventDefault();
//     if (!newExpense.description || !newExpense.amount || !newExpense.category) return alert('Please fill all fields');

//     if (newExpense.id) {
//       const ref = doc(db, 'users', userId, 'expenses', newExpense.id);
//       await updateDoc(ref, { ...newExpense, amount: parseFloat(newExpense.amount) });
//       setExpenses(expenses.map(exp => exp.id === newExpense.id ? { ...exp, ...newExpense, amount: parseFloat(newExpense.amount) } : exp));
//     } else {
//       const docRef = await addDoc(collection(db, 'users', userId, 'expenses'), {
//         ...newExpense,
//         amount: parseFloat(newExpense.amount),
//         date: new Date().toISOString().substring(0, 10),
//       });
//       setExpenses([{ id: docRef.id, ...newExpense, amount: parseFloat(newExpense.amount), date: new Date().toISOString().substring(0, 10) }, ...expenses]);
//     }
//     setNewExpense({ id: null, description: '', amount: '', category: '' });
//   };

//   const handleEditExpense = (exp) => setNewExpense({ ...exp });
//   const handleDeleteExpense = async (id) => {
//     if (!window.confirm('Delete this expense?')) return;
//     await deleteDoc(doc(db, 'users', userId, 'expenses', id));
//     setExpenses(expenses.filter(e => e.id !== id));
//   };
//   const handleBudgetSave = async () => await setDoc(doc(db, 'budgets', userId), { budget: budgetLimit });

//   // --- Glassmorphism Styles ---
//   const containerStyle = { padding: '20px', minHeight: '80vh', background: colors.backgroundGradient };
//   const cardStyle = {
//     backdropFilter: 'blur(16px)',
//     background: '#72717140',
//     border: `1px solid rgba(255,255,255,0.15)`,
//     borderRadius: '16px',
//     padding: '25px',
//     boxShadow: '0 15px 30px rgba(0,0,0,0.2)',
//     color: 'white',
//     marginBottom: '20px',
//   };
//   const inputStyle = {
//     width: '100%',
//     padding: '12px',
//     margin: '10px 0',
//     borderRadius: '8px',
//     border: `1px solid rgba(255,255,255,0.2)`,
//     backgroundColor: 'rgba(255,255,255,0.1)',
//     color: 'white',
//     outline: 'none',
//   };
//   const buttonStyle = {
//     padding: '12px',
//     borderRadius: '8px',
//     border: 'none',
//     backgroundColor: colors.Primary,
//     color: 'white',
//     cursor: 'pointer',
//     fontWeight: 'bold',
//     width: '100%',
//     marginTop: '10px',
//     transition: 'all 0.3s ease',
//   };
//   const expenseItemStyle = {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: '12px',
//     borderBottom: '1px dashed rgba(255,255,255,0.2)',
//   };
//   const smallButtonStyle = { marginLeft: '8px', padding: '5px 10px', borderRadius: '6px', border: 'none', cursor: 'pointer' };

//   if (loading) return <p style={{ color: 'white' }}>Loading...</p>;

//   return (
//     <div style={containerStyle}>
//       <h2 style={{ marginBottom: '20px', color: 'white', borderBottom: `2px solid ${colors.Primary}`, paddingBottom: '10px' }}>Expenses</h2>

//       {/* Budget Summary */}
//       <div style={{ ...cardStyle, borderLeft: isOverBudget ? '5px solid red' : `5px solid ${colors.Primary}` }}>
//         <h3>Budget Summary</h3>
//         <p>Total Budget: ₹{budgetLimit.toLocaleString('en-IN')}</p>
//         <p>Total Spent: ₹{totalSpent.toLocaleString('en-IN')}</p>
//         <p>Balance: <strong style={{ color: isOverBudget ? 'red' : 'white' }}>₹{remainingBudget.toLocaleString('en-IN')}</strong></p>
//         {isOverBudget && <p style={{ color: 'red', fontWeight: 'bold' }}>⚠️ Over Budget!</p>}
//       </div>

//       {/* Set Budget */}
//       <div style={cardStyle}>
//         <h3>Set Budget</h3>
//         <input type="number" value={budgetLimit} onChange={(e) => setBudgetLimit(parseFloat(e.target.value))} style={inputStyle} />
//         <button onClick={handleBudgetSave} style={buttonStyle}>Save Budget</button>
//       </div>

//       {/* Add/Edit Expense */}
//       <div style={cardStyle}>
//         <h3>{newExpense.id ? 'Edit Expense' : 'Add Expense'}</h3>
//         <form onSubmit={handleAddOrUpdateExpense}>
//           <input placeholder="Description" value={newExpense.description} onChange={e => setNewExpense({ ...newExpense, description: e.target.value })} style={inputStyle} required />
//           <input placeholder="Amount (₹)" type="number" value={newExpense.amount} onChange={e => setNewExpense({ ...newExpense, amount: e.target.value })} style={inputStyle} required />
//           <select value={newExpense.category} onChange={e => setNewExpense({ ...newExpense, category: e.target.value })} style={inputStyle} required>
//             <option value="">Category</option>
//             <option>Food</option>
//             <option>Travel</option>
//             <option>Health</option>
//             <option>Education</option>
//             <option>Others</option>
//           </select>
//           <button type="submit" style={buttonStyle}>{newExpense.id ? 'Update' : 'Add'}</button>
//         </form>
//       </div>

//       {/* Expense List */}
//       <div style={cardStyle}>
//         <h3>Total Expenses</h3>
//         {expenses.length === 0 ? <p>No expenses yet.</p> : expenses.map(exp => (
//           <div key={exp.id} style={expenseItemStyle}>
//             <div>
//               <strong>{exp.description}</strong> ({exp.category})<br/>
//               <small style={{ color: 'rgba(255,255,255,0.6)' }}>{exp.date}</small>
//             </div>
//             <div>
//               <strong>₹{parseFloat(exp.amount).toLocaleString('en-IN')}</strong>
//               <button style={{ ...smallButtonStyle, backgroundColor: '#f0ad4e', color: 'white' }} onClick={() => handleEditExpense(exp)}>Edit</button>
//               <button style={{ ...smallButtonStyle, backgroundColor: '#d9534f', color: 'white' }} onClick={() => handleDeleteExpense(exp.id)}>Delete</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect, useMemo } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../services/firebase';
import colors from '../constants/colors';
import MonthlyChart from './MonthlyChart';
import CategoryChart from './CategoryChart';
import ReportSection from './ReportSection';
import AIRecommendations from './AIRecommendations';
import Toast from './Toast';

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ description: '', amount: '', category: '' });
  const [budgetLimit, setBudgetLimit] = useState(50000);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', show: false, category: 'Default' });

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState({ id: '', description: '', amount: '', category: '' });

  const userId = auth.currentUser?.uid;

  const showToast = (message, category = 'Default') => {
    setToast({ message, show: true, category });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;
      try {
        const budgetDoc = await getDoc(doc(db, 'budgets', userId));
        if (budgetDoc.exists()) setBudgetLimit(budgetDoc.data().budget);

        const expenseSnapshot = await getDocs(collection(db, 'users', userId, 'expenses'));
        setExpenses(expenseSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  const { totalSpent, remainingBudget, isOverBudget, categoryTotals } = useMemo(() => {
    const spent = expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);
    const totals = {};
    expenses.forEach(e => {
      totals[e.category] = (totals[e.category] || 0) + parseFloat(e.amount);
    });
    return {
      totalSpent: spent,
      remainingBudget: budgetLimit - spent,
      isOverBudget: budgetLimit - spent < 0,
      categoryTotals: totals
    };
  }, [expenses, budgetLimit]);

  useEffect(() => {
    if (remainingBudget < 0) {
      showToast('⚠️ You are over your budget!', 'Office');
      return;
    }
    for (const [cat, amount] of Object.entries(categoryTotals)) {
      if (amount > budgetLimit * 0.5) {
        showToast(`⚠️ Spending in "${cat}" exceeded 50% of budget!`, cat);
        return;
      }
    }
  }, [expenses, remainingBudget, budgetLimit, categoryTotals]);

  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (!newExpense.description || !newExpense.amount || !newExpense.category) return showToast('Please fill all fields', 'Other');
    if (!userId) return showToast('User not logged in', 'Other');

    const amount = parseFloat(newExpense.amount);
    try {
      const dateStr = new Date().toISOString().substring(0, 10);
      const docRef = await addDoc(collection(db, 'users', userId, 'expenses'), {
        ...newExpense,
        amount,
        date: dateStr,
      });
      setExpenses(prev => [{ id: docRef.id, ...newExpense, amount, date: dateStr }, ...prev]);
      setNewExpense({ description: '', amount: '', category: '' });
      showToast('Expense added!', 'Default');
    } catch (err) {
      console.error(err);
      showToast('Failed to add expense', 'Other');
    }
  };

  const handleDeleteExpense = async (id) => {
    if (!userId) return showToast('User not logged in', 'Other');
    if (!window.confirm('Are you sure you want to delete this expense?')) return;

    try {
      await deleteDoc(doc(db, 'users', userId, 'expenses', id));
      setExpenses(prev => prev.filter(exp => exp.id !== id));
      showToast('Expense deleted!', 'Default');
    } catch (err) {
      console.error(err);
      showToast('Failed to delete expense', 'Other');
    }
  };

  const handleBudgetSave = async () => {
    if (!userId) return showToast('User not logged in', 'Other');
    await setDoc(doc(db, 'budgets', userId), { budget: budgetLimit });
    showToast('Budget saved!', 'Default');
  };

  // --- Open Edit Modal ---
  const openEditModal = (exp) => {
    setEditingExpense({ ...exp });
    setEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return showToast('User not logged in', 'Other');

    const updatedData = { ...editingExpense, amount: parseFloat(editingExpense.amount), date: new Date().toISOString().substring(0, 10) };

    try {
      await updateDoc(doc(db, 'users', userId, 'expenses', editingExpense.id), updatedData);
      setExpenses(expenses.map(exp => exp.id === editingExpense.id ? { ...updatedData, id: editingExpense.id } : exp));
      setEditModalOpen(false);
      showToast('Expense updated!', 'Default');
    } catch (err) {
      console.error(err);
      showToast('Failed to update expense', 'Other');
    }
  };

  const monthlyPrediction = useMemo(() => {
    if (!expenses.length) return null;
    const monthlyTotals = {};
    expenses.forEach(e => {
      if (!e.date) return;
      const month = e.date.substring(0, 7);
      monthlyTotals[month] = (monthlyTotals[month] || 0) + Number(e.amount);
    });
    const months = Object.keys(monthlyTotals).sort();
    const values = months.map(m => monthlyTotals[m]);
    if (!values.length) return null;
    if (values.length === 1) return { predicted: Math.round(values[0]), message: "⚠️ Not enough data. Prediction based on current month." };

    const recent = values.slice(-3);
    const avg = recent.reduce((a, b) => a + b, 0) / recent.length;
    const trend = values[values.length - 1] - values[values.length - 2];
    const predicted = Math.max(Math.round(avg + trend * 0.5), 0);

    let message = "Spending looks stable.";
    if (predicted > budgetLimit) message = "⚠️ You may exceed your budget next month!";
    else if (trend > 0) message = "📈 Spending trend is increasing.";
    else if (trend < 0) message = "📉 Good job! Spending trend is decreasing.";

    return { predicted, message };
  }, [expenses, budgetLimit]);

  const categoryPrediction = useMemo(() => {
    const totals = {};
    expenses.forEach(e => {
      totals[e.category] = (totals[e.category] || 0) + Number(e.amount);
    });
    return totals;
  }, [expenses]);

  // --- Styles ---
  const containerStyle = { padding: '20px', minHeight: '80vh', background: colors.backgroundGradient };
  const cardStyle = { backdropFilter: 'blur(16px)', background: '#72717140', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '16px', padding: '25px', boxShadow: '0 15px 30px rgba(0,0,0,0.2)', color: 'white', marginBottom: '20px' };
  const inputStyle = { width: '100%', padding: '12px', margin: '10px 0', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', outline: 'none' };
  const buttonStyle = { padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: colors.Primary, color: colors.Primary, cursor: 'pointer', fontWeight: 'bold', width: '100%', marginTop: '10px', transition: 'all 0.3s ease' };
  const expenseItemStyle = { backdropFilter: 'blur(12px)', background: '#72717130', borderRadius: '12px', padding: '15px', marginBottom: '10px', border: '1px solid rgba(255,255,255,0.15)' };
  const noteHeaderStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' };
  const smallButtonStyle = { marginLeft: '8px', padding: '6px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85em' };
  const modalStyle = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' };
  const modalContent = { background: '#2a2a2a', padding: '20px', borderRadius: '12px', width: '300px' };

  if (loading) return <p style={{ color: 'white' }}>Loading...</p>;

  return (
    <div style={containerStyle}>
      <Toast message={toast.message} show={toast.show} category={toast.category} />

      <h2 style={{ marginBottom: '20px', color: 'white', borderBottom: `2px solid ${colors.Primary}`, paddingBottom: '10px' }}>Expenses</h2>

      {/* Budget Summary */}
      <div style={{ ...cardStyle, borderLeft: isOverBudget ? '5px solid red' : `5px solid ${colors.Primary}` }}>
        <h3>Budget Summary</h3>
        <p>Total Budget: ₹{budgetLimit.toLocaleString('en-IN')}</p>
        <p>Total Spent: ₹{totalSpent.toLocaleString('en-IN')}</p>
        <p>Balance: <strong style={{ color: isOverBudget ? 'red' : 'white' }}>₹{remainingBudget.toLocaleString('en-IN')}</strong></p>
      </div>

      {/* Edit Budget */}
      <div style={cardStyle}>
        <h3>Edit Budget</h3>
        <input type="number" value={budgetLimit} onChange={(e) => setBudgetLimit(parseFloat(e.target.value))} style={inputStyle} />
        <button onClick={handleBudgetSave} style={buttonStyle}>Save Budget</button>
      </div>

      {/* Add Expense */}
      <div style={cardStyle}>
        <h3>Add Expense</h3>
        <form onSubmit={handleAddExpense}>
          <input placeholder="Description" value={newExpense.description} onChange={e => setNewExpense({ ...newExpense, description: e.target.value })} style={inputStyle} required />
          <input type="number" placeholder="Amount" value={newExpense.amount} onChange={e => setNewExpense({ ...newExpense, amount: e.target.value })} style={inputStyle} required />
          <select value={newExpense.category} onChange={e => setNewExpense({ ...newExpense, category: e.target.value })} style={inputStyle} required>
            <option value="">Category</option>
            <option>Food</option>
            <option>Travel</option>
            <option>Health</option>
            <option>Education</option>
            <option>Others</option>
          </select>
          <button type="submit" style={buttonStyle}>Add</button>
        </form>
      </div>

      {/* Expenses List */}
      <div style={cardStyle}>
        <h3>Total Expenses</h3>
        {expenses.length === 0 ? <p>No expenses yet.</p> :
          expenses.map(exp => {
            const isItemOverBudget = categoryTotals[exp.category] > budgetLimit * 0.5 || isOverBudget;
            return (
              <div key={exp.id} style={{ ...expenseItemStyle, border: isItemOverBudget ? '2px solid red' : expenseItemStyle.border, color: isItemOverBudget ? 'red' : 'white' }}>
                <div style={noteHeaderStyle}>
                  <div>
                    <strong>{exp.description}</strong> ({exp.category})<br />
                    <small style={{ color: isItemOverBudget ? 'rgba(255,0,0,0.7)' : 'rgba(255,255,255,0.6)' }}>{exp.date}</small><br />
                    <strong>₹{parseFloat(exp.amount).toLocaleString('en-IN')}</strong>
                  </div>
                  <div>
                    <button style={{ ...smallButtonStyle, backgroundColor: '#f0ad4e', color: 'white' }} onClick={() => openEditModal(exp)}>Edit</button>
                    <button style={{ ...smallButtonStyle, backgroundColor: '#d9534f', color: 'white' }} onClick={() => handleDeleteExpense(exp.id)}>Delete</button>
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>

      {/* Edit Expense Modal */}
      {editModalOpen && (
        <div style={modalStyle}>
          <div style={modalContent}>
            <h3>Edit Expense</h3>
            <form onSubmit={handleEditSubmit}>
              <input value={editingExpense.description} onChange={e => setEditingExpense({ ...editingExpense, description: e.target.value })} style={inputStyle} required />
              <input type="number" value={editingExpense.amount} onChange={e => setEditingExpense({ ...editingExpense, amount: e.target.value })} style={inputStyle} required />
              <select value={editingExpense.category} onChange={e => setEditingExpense({ ...editingExpense, category: e.target.value })} style={inputStyle} required>
                <option>Food</option>
                <option>Travel</option>
                <option>Health</option>
                <option>Education</option>
                <option>Others</option>
              </select>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" style={{ ...buttonStyle, flex: 1 }}>Update</button>
                <button type="button" onClick={() => setEditModalOpen(false)} style={{ ...buttonStyle, flex: 1, backgroundColor: '#6c757d' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AI Predictions */}
      <div style={cardStyle}>
        <h3>📊 Monthly AI Prediction</h3>
        {monthlyPrediction ? (
          <>
            <p>
              <strong>Predicted Next Month Spending:</strong>
              <span style={{ color: monthlyPrediction.predicted > budgetLimit ? 'red' : 'white' }}>
                ₹{monthlyPrediction.predicted.toLocaleString('en-IN')}
              </span>
            </p>
            <p>{monthlyPrediction.message}</p>
          </>
        ) : <p>⚠️ Not enough data for prediction.</p>}
      </div>

      <div style={cardStyle}>
        <h3>📅 Category-wise AI Prediction</h3>
        {Object.keys(categoryPrediction).length === 0 ? <p>⚠️ Not enough data.</p> :
          <ul>
            {Object.entries(categoryPrediction).map(([cat, amt]) => {
              const overLimit = amt > budgetLimit * 0.3;
              return (
                <li key={cat} style={{ color: overLimit ? 'red' : 'white', fontWeight: overLimit ? 'bold' : 'normal' }}>
                  {cat}: ₹{amt.toLocaleString('en-IN')} {overLimit && '⚠️'}
                </li>
              );
            })}
          </ul>
        }
      </div>

      <MonthlyChart expenses={expenses} />
      <CategoryChart expenses={expenses} />
      <ReportSection expenses={expenses} buttonStyle={buttonStyle} />
      <AIRecommendations expenses={expenses} budgetLimit={budgetLimit} />
    </div>
  );
}
