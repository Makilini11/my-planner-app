

import React, { useState, useMemo } from 'react';
import colors from '../constants/colors';


const BUDGET_LIMIT = 50000; 


const initialExpenses = [
    { id: 1, description: 'Food', amount: 15000, category: 'Food', date: '2025-12-01' },
    { id: 2, description: 'Books', amount: 8500, category: 'Education', date: '2025-12-05' },
    { id: 3, description: 'Travel', amount: 12000, category: 'Work', date: '2025-12-07' },
];

function Expenses() {
    const [expenses, setExpenses] = useState(initialExpenses);
    const [newExpense, setNewExpense] = useState({ description: '', amount: '', category: '' });

   
    const { totalSpent, remainingBudget, isOverBudget } = useMemo(() => {
        const spent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        const remaining = BUDGET_LIMIT - spent;
        return {
            totalSpent: spent,
            remainingBudget: remaining,
            isOverBudget: remaining < 0,
        };
    }, [expenses]);


    const handleAddExpense = (e) => {
        e.preventDefault();
        if (newExpense.description && newExpense.amount > 0 && newExpense.category) {
            const newEntry = {
                id: Date.now(), 
                description: newExpense.description,
                amount: parseFloat(newExpense.amount),
                category: newExpense.category,
                date: new Date().toISOString().substring(0, 10),
            };
            setExpenses([...expenses, newEntry]);
            setNewExpense({ description: '', amount: '', category: '' }); 
        } else {
            alert('Please Fill The Data.');
        }
    };
    
  
    
    const expensesContainerStyle = { padding: '20px', backgroundColor: colors.Neutral, minHeight: '80vh' };
    const cardStyle = { backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)', marginBottom: '20px' };
    
    const summaryCardStyle = {
        ...cardStyle,
        borderLeft: isOverBudget ? `5px solid red` : `5px solid ${colors.Primary}`,
    };

    const budgetStatusStyle = {
        fontWeight: 'bold',
        color: isOverBudget ? 'red' : colors.Text,
        fontSize: '1.2em',
    };

    const expenseItemStyle = {
        display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px dashed ${colors.Secondary}`,
    };

    const formInputStyle = {
        padding: '10px', margin: '5px 0', borderRadius: '5px', border: `1px solid ${colors.Secondary}`, width: '100%', boxSizing: 'border-box',
    };

    const formButtonStyle = {
        padding: '10px 15px', backgroundColor: colors.Primary, color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px', width: '100%', fontWeight: 'bold'
    };


    return (
        <div style={expensesContainerStyle}>
            <h2 style={{ color: colors.Text, marginBottom: '20px', paddingBottom: '10px', borderBottom: `2px solid ${colors.Secondary}` }}>
              Expenses Tracking
            </h2>

            {/* பட்ஜெட் சுருக்கம் Card */}
            <div style={summaryCardStyle}>
                <h3 style={{ color: colors.Text, marginBottom: '10px' }}> Budget Summary </h3>
                <p>Total Budjet Limit: <strong>₹{BUDGET_LIMIT.toLocaleString('en-IN')}</strong></p>
                <p>Total Expenses: <strong style={{ color: colors.Primary }}>₹{totalSpent.toLocaleString('en-IN')}</strong></p>
                <p>Balance: 
                    <span style={budgetStatusStyle}>
                        ₹{remainingBudget.toLocaleString('en-IN')} {isOverBudget && `(₹${Math.abs(remainingBudget).toLocaleString('en-IN')} அதிகம்)`}
                    </span>
                </p>
                {isOverBudget && (
                    <p style={{ color: 'red', fontWeight: 'bold', marginTop: '10px' }}>⚠️ Warning: You have exceeded your budget limit!</p>
                )}
            </div>

            <div style={cardStyle}>
                <h3 style={{ color: colors.Text, marginBottom: '15px' }}>new Expenses</h3>
                <form onSubmit={handleAddExpense}>
                    <input 
                        type="text" 
                        placeholder="Explain (E.g : Restaurant)" 
                        style={formInputStyle} 
                        value={newExpense.description}
                        onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                        required
                    />
                    <input 
                        type="number" 
                        placeholder="Amount(rupees)" 
                        style={formInputStyle} 
                        value={newExpense.amount}
                        onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                        required
                    />
                    <select 
                        style={formInputStyle}
                        value={newExpense.category}
                        onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                        required
                    >
                        <option value="">Category</option>
                        <option value="Food">Food</option>
                        <option value="Travel">Travel</option>
                        <option value="Medical">Health</option>
                        <option value="Education">Education</option>
                        <option value="Others">Others</option>
                    </select>
                    <button type="submit" style={formButtonStyle}>Update </button>
                </form>
            </div>

            {/* செலவினப் பட்டியல் */}
            <div style={cardStyle}>
                <h3 style={{ color: colors.Text, marginBottom: '15px' }}>Total Expenses</h3>
                {expenses.map(exp => (
                    <div key={exp.id} style={expenseItemStyle}>
                        <div>
                            <strong>{exp.description}</strong> ({exp.category})<br />
                            <small style={{ color: colors.Text + '70' }}>{exp.date}</small>
                        </div>
                        <strong style={{ color: colors.Text }}>₹{exp.amount.toLocaleString('en-IN')}</strong>
                    </div>
                ))}
            </div>
            
        </div>
    );
}

export default Expenses;