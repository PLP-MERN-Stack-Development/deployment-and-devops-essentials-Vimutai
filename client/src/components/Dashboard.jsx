import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { formatKES } from '../utils/kenyanCategories';
import { transactionAPI } from '../services/api';
import KpiCards from './KpiCards';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316'];

const Dashboard = () => {
  const [summary, setSummary] = useState({
    income: 0,
    expenses: 0,
    balance: 0,
    categoryBreakdown: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const response = await transactionAPI.getSummary();
      setSummary(response.data);
    } catch (error) {
      console.error('Error fetching summary:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const chartData = summary.categoryBreakdown.map(item => ({
    name: item._id,
    value: item.total,
  }));

  return (
    <div className="space-y-6">
      <KpiCards 
        income={summary.income} 
        expenses={summary.expenses} 
        balance={summary.balance} 
      />

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Matumizi by Category 📊</h2>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatKES(value)} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-gray-500 py-8">Hakuna matumizi bado 🤷‍♂️</p>
        )}
      </div>

      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-md p-6 text-white">
        <h3 className="text-lg font-bold mb-2">💡 Tip ya Leo:</h3>
        <p className="mb-2">{summary.message || 'Panga budget yako vizuri!'}</p>
        <ul className="text-sm space-y-1 mt-3 opacity-90">
          <li>• Weka pesa kidogo kwa ajili ya emergency 🚨</li>
          <li>• Track matumizi yako kila siku 📝</li>
          <li>• Avoid impulse buying – Think twice! 🤔</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;