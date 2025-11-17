import React from 'react';
import { Trash2 } from 'lucide-react';
import { formatKES, getCategoryLabel } from '../utils/kenyanCategories';

const TransactionHistory = ({ transactions, onDelete }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-KE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8 text-center">
        <p className="text-gray-500 text-lg">Hakuna transactions bado 🤷‍♂️</p>
        <p className="text-gray-400 text-sm mt-2">Start adding your income and expenses!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Transaction History 📜</h2>
      <div className="space-y-3">
        {transactions.map(transaction => (
          <div
            key={transaction._id}
            className={`flex items-center justify-between p-4 rounded-lg border-l-4 transition hover:shadow-md ${
              transaction.type === 'income' ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
            }`}
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className={`font-semibold ${transaction.type === 'income' ? 'text-green-700' : 'text-red-700'}`}>
                  {transaction.type === 'income' ? '💵' : '💸'} {transaction.description}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {getCategoryLabel(transaction.category)} • {formatDate(transaction.date)}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className={`font-bold text-lg ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                {transaction.type === 'income' ? '+' : '-'}{formatKES(transaction.amount)}
              </span>
              <button
                onClick={() => onDelete(transaction._id)}
                className="text-red-500 hover:text-red-700 transition p-2 hover:bg-red-100 rounded"
                title="Delete transaction"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;