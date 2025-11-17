import React from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { formatKES } from '../utils/kenyanCategories';

const KpiCards = ({ income, expenses, balance }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500 hover:shadow-lg transition">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">Total Income</p>
            <p className="text-2xl font-bold text-green-600 mt-1">{formatKES(income)}</p>
            <p className="text-xs text-gray-500 mt-1">Kipato 💵</p>
          </div>
          <TrendingUp className="text-green-500" size={40} />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500 hover:shadow-lg transition">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">Total Expenses</p>
            <p className="text-2xl font-bold text-red-600 mt-1">{formatKES(expenses)}</p>
            <p className="text-xs text-gray-500 mt-1">Matumizi 💸</p>
          </div>
          <TrendingDown className="text-red-500" size={40} />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">Balance</p>
            <p className={`text-2xl font-bold mt-1 ${balance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
              {formatKES(balance)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {balance >= 0 ? 'Uko sawa! 💪' : 'Angalia budget 😅'}
            </p>
          </div>
          <DollarSign className="text-blue-500" size={40} />
        </div>
      </div>
    </div>
  );
};

export default KpiCards;