import React from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';

export default function CategoryChart({ expenses }) {
  const categories = ['Food', 'Travel', 'Health', 'Education', 'Others'];
  const data = categories.map(cat => ({
    name: cat,
    value: expenses.filter(e => e.category === cat).reduce((sum, e) => sum + parseFloat(e.amount), 0)
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA00FF'];

  return (
    <div style={{ marginBottom: '20px' }}>
      <h3 style={{ color: 'white' }}>Category-wise Spending</h3>
      <PieChart width={400} height={300}>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
          {data.map((entry, index) => <Cell key={index} fill={COLORS[index]} />)}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}
