import React, { useState } from 'react';
import { KENYAN_CATEGORIES } from '../utils/kenyanCategories';
import { transactionAPI } from '../services/api';

const TransactionForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    category: 'other',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const filteredCategories = KENYAN_CATEGORIES.filter(
    cat => cat.type === formData.type || cat.type === 'both'
  );

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  try {
    // Coerce and validate amount
    const amountNum = Number(formData.amount);
    if (!formData.amount || Number.isNaN(amountNum) || amountNum <= 0) {
      setError('Tafadhali weka kiasi halali (please enter a valid amount).');
      setLoading(false);
      return;
    }

    // Ensure description is present (trim) — backend requires it
    const desc = (formData.description || '').trim() || 'No description';

    const payload = {
      type: formData.type,
      amount: amountNum,
      category: formData.category || 'other',
      description: desc,
      date: new Date().toISOString()
    };

    // transactionAPI.create should map to API.post('/api/transactions', payload)
    await transactionAPI.create(payload);

    // reset form
    setFormData({ type: 'expense', amount: '', category: 'other', description: '' });
    if (onSuccess) onSuccess();
  } catch (err) {
    // Read backend message if present, otherwise fallback
    const serverMessage = err?.response?.data?.message || err?.response?.data?.error || err.message;
    setError(serverMessage || 'Failed to add transaction - Iko shida!');
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="bg-white rounded-xl shadow-md p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Ongeza Transaction 💰</h2>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
          <div className="flex gap-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="type"
                value="income"
                checked={formData.type === 'income'}
                onChange={(e) => setFormData({ ...formData, type: e.target.value, category: 'salary' })}
                className="mr-2"
              />
              <span className="text-green-600 font-medium">Income (Kipato) 💵</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="type"
                value="expense"
                checked={formData.type === 'expense'}
                onChange={(e) => setFormData({ ...formData, type: e.target.value, category: 'other' })}
                className="mr-2"
              />
              <span className="text-red-600 font-medium">Expense (Matumizi) 💸</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Amount (KES)</label>
          <input
            type="number"
            required
            min="0"
            step="0.01"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="e.g., 5000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            {filteredCategories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <input
            type="text"
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="e.g., Bought mitumba from Gikomba"
            maxLength="200"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? '⏳ Adding...' : '✅ Ongeza Transaction'}
        </button>
      </div>
    </div>
  );
};

export default TransactionForm;