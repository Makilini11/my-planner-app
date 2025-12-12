

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


import React, { useState, useEffect, useMemo } from 'react';
import { db, auth } from '../services/firebase';
import { doc, getDoc, setDoc, collection, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import colors from '../constants/colors';

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ id: null, description: '', amount: '', category: '' });
  const [budgetLimit, setBudgetLimit] = useState(50000);
  const [loading, setLoading] = useState(true);
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;
      try {
        const budgetDoc = await getDoc(doc(db, 'budgets', userId));
        if (budgetDoc.exists()) setBudgetLimit(budgetDoc.data().budget);

        const expenseCollection = collection(db, 'users', userId, 'expenses');
        const expenseSnapshot = await getDocs(expenseCollection);
        setExpenses(expenseSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  const { totalSpent, remainingBudget, isOverBudget } = useMemo(() => {
    const spent = expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);
    return { totalSpent: spent, remainingBudget: budgetLimit - spent, isOverBudget: (budgetLimit - spent) < 0 };
  }, [expenses, budgetLimit]);

  const handleAddOrUpdateExpense = async (e) => {
    e.preventDefault();
    if (!newExpense.description || !newExpense.amount || !newExpense.category) return alert('Please fill all fields');

    if (newExpense.id) {
      const ref = doc(db, 'users', userId, 'expenses', newExpense.id);
      await updateDoc(ref, { ...newExpense, amount: parseFloat(newExpense.amount) });
      setExpenses(expenses.map(exp => exp.id === newExpense.id ? { ...exp, ...newExpense, amount: parseFloat(newExpense.amount) } : exp));
    } else {
      const docRef = await addDoc(collection(db, 'users', userId, 'expenses'), {
        ...newExpense,
        amount: parseFloat(newExpense.amount),
        date: new Date().toISOString().substring(0, 10),
      });
      setExpenses([{ id: docRef.id, ...newExpense, amount: parseFloat(newExpense.amount), date: new Date().toISOString().substring(0, 10) }, ...expenses]);
    }
    setNewExpense({ id: null, description: '', amount: '', category: '' });
  };

  const handleEditExpense = (exp) => setNewExpense({ ...exp });
  const handleDeleteExpense = async (id) => {
    if (!window.confirm('Delete this expense?')) return;
    await deleteDoc(doc(db, 'users', userId, 'expenses', id));
    setExpenses(expenses.filter(e => e.id !== id));
  };
  const handleBudgetSave = async () => await setDoc(doc(db, 'budgets', userId), { budget: budgetLimit });

  // --- Glassmorphism Styles ---
  const containerStyle = { padding: '20px', minHeight: '80vh', background: colors.backgroundGradient };
  const cardStyle = {
    backdropFilter: 'blur(16px)',
    background: '#72717140',
    border: `1px solid rgba(255,255,255,0.15)`,
    borderRadius: '16px',
    padding: '25px',
    boxShadow: '0 15px 30px rgba(0,0,0,0.2)',
    color: 'white',
    marginBottom: '20px',
  };
  const inputStyle = {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    borderRadius: '8px',
    border: `1px solid rgba(255,255,255,0.2)`,
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: 'white',
    outline: 'none',
  };
  const buttonStyle = {
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: colors.Primary,
    color: 'white',
    cursor: 'pointer',
    fontWeight: 'bold',
    width: '100%',
    marginTop: '10px',
    transition: 'all 0.3s ease',
  };
  const expenseItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    borderBottom: '1px dashed rgba(255,255,255,0.2)',
  };
  const smallButtonStyle = { marginLeft: '8px', padding: '5px 10px', borderRadius: '6px', border: 'none', cursor: 'pointer' };

  if (loading) return <p style={{ color: 'white' }}>Loading...</p>;

  return (
    <div style={containerStyle}>
      <h2 style={{ marginBottom: '20px', color: 'white', borderBottom: `2px solid ${colors.Primary}`, paddingBottom: '10px' }}>Expenses</h2>

      {/* Budget Summary */}
      <div style={{ ...cardStyle, borderLeft: isOverBudget ? '5px solid red' : `5px solid ${colors.Primary}` }}>
        <h3>Budget Summary</h3>
        <p>Total Budget: ₹{budgetLimit.toLocaleString('en-IN')}</p>
        <p>Total Spent: ₹{totalSpent.toLocaleString('en-IN')}</p>
        <p>Balance: <strong style={{ color: isOverBudget ? 'red' : 'white' }}>₹{remainingBudget.toLocaleString('en-IN')}</strong></p>
        {isOverBudget && <p style={{ color: 'red', fontWeight: 'bold' }}>⚠️ Over Budget!</p>}
      </div>

      {/* Set Budget */}
      <div style={cardStyle}>
        <h3>Set Budget</h3>
        <input type="number" value={budgetLimit} onChange={(e) => setBudgetLimit(parseFloat(e.target.value))} style={inputStyle} />
        <button onClick={handleBudgetSave} style={buttonStyle}>Save Budget</button>
      </div>

      {/* Add/Edit Expense */}
      <div style={cardStyle}>
        <h3>{newExpense.id ? 'Edit Expense' : 'Add Expense'}</h3>
        <form onSubmit={handleAddOrUpdateExpense}>
          <input placeholder="Description" value={newExpense.description} onChange={e => setNewExpense({ ...newExpense, description: e.target.value })} style={inputStyle} required />
          <input placeholder="Amount (₹)" type="number" value={newExpense.amount} onChange={e => setNewExpense({ ...newExpense, amount: e.target.value })} style={inputStyle} required />
          <select value={newExpense.category} onChange={e => setNewExpense({ ...newExpense, category: e.target.value })} style={inputStyle} required>
            <option value="">Category</option>
            <option>Food</option>
            <option>Travel</option>
            <option>Health</option>
            <option>Education</option>
            <option>Others</option>
          </select>
          <button type="submit" style={buttonStyle}>{newExpense.id ? 'Update' : 'Add'}</button>
        </form>
      </div>

      {/* Expense List */}
      <div style={cardStyle}>
        <h3>Total Expenses</h3>
        {expenses.length === 0 ? <p>No expenses yet.</p> : expenses.map(exp => (
          <div key={exp.id} style={expenseItemStyle}>
            <div>
              <strong>{exp.description}</strong> ({exp.category})<br/>
              <small style={{ color: 'rgba(255,255,255,0.6)' }}>{exp.date}</small>
            </div>
            <div>
              <strong>₹{parseFloat(exp.amount).toLocaleString('en-IN')}</strong>
              <button style={{ ...smallButtonStyle, backgroundColor: '#f0ad4e', color: 'white' }} onClick={() => handleEditExpense(exp)}>Edit</button>
              <button style={{ ...smallButtonStyle, backgroundColor: '#d9534f', color: 'white' }} onClick={() => handleDeleteExpense(exp.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

