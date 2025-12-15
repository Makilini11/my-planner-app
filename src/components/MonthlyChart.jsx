import React from 'react';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import colors from '../constants/colors';

export default function MonthlyChart({ expenses }) {
  const monthlyData = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    const total = expenses
      .filter(e => new Date(e.date).getMonth() + 1 === month)
      .reduce((sum, e) => sum + parseFloat(e.amount), 0);
    return { month, total };
  });

  const pieData = monthlyData.map(m => ({ name: `Month ${m.month}`, value: m.total }));
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA00FF', '#FF0066', '#00FFFF', '#FFAA00', '#4CAF50', '#F44336', '#9C27B0', '#3F51B5'];

  return (
    <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h3 style={{ color: 'white', marginBottom: '20px' }}>Monthly Spend</h3>

      {/* Centered PieChart */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
        <PieChart width={300} height={300}>
          <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
            {pieData.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      {/* Centered BarChart */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <BarChart width={500} height={300} data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill={colors.Primary} />
        </BarChart>
      </div>
    </div>
  );
}

