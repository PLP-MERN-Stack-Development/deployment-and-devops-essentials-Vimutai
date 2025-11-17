import React, { useState, useEffect } from 'react';
import { Wallet, Plus, History, LayoutDashboard } from 'lucide-react';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import TransactionHistory from './components/TransactionHistory';
import { transactionAPI } from './services/api';

function App() {
  const [view, setView] = useState('dashboard');
  const [transactions, setTransactions] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (view === 'history') {
      fetchTransactions();
    }
  }, [view, refreshKey]);

  const fetchTransactions = async () => {
    try {
      const response = await transactionAPI.getAll();
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleTransactionSuccess = () => {
    setRefreshKey(prev => prev + 1);
    setView('dashboard');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this transaction? Una uhakika?')) {
      try {
        await transactionAPI.delete(id);
        fetchTransactions();
        setRefreshKey(prev => prev + 1);
      } catch (error) {
        console.error('Error deleting transaction:', error);
        alert('Failed to delete transaction');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <nav className="bg-green-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Wallet size={28} />
              Enyan Budget Planner 💰
            </h1>
            <p className="text-green-100 hidden sm:block">Panga Pesa Yako Vizuri! 🇰🇪</p>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6 flex-wrap">
          <button
            onClick={() => setView('dashboard')}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition ${
              view === 'dashboard'
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-white text-green-600 hover:bg-green-50'
            }`}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </button>
          <button
            onClick={() => setView('add')}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition ${
              view === 'add'
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-white text-green-600 hover:bg-green-50'
            }`}
          >
            <Plus size={20} />
            Add Transaction
          </button>
          <button
            onClick={() => setView('history')}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition ${
              view === 'history'
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-white text-green-600 hover:bg-green-50'
            }`}
          >
            <History size={20} />
            History
          </button>
        </div>

        {view === 'dashboard' && <Dashboard key={refreshKey} />}
        {view === 'add' && <TransactionForm onSuccess={handleTransactionSuccess} />}
        {view === 'history' && (
          <TransactionHistory transactions={transactions} onDelete={handleDelete} />
        )}
      </div>

      <footer className="bg-green-800 text-white py-4 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>🇰🇪 Made with ❤️ for Wakenya | Panga Pesa Yako Vizuri!</p>
          <p className="text-sm text-green-200 mt-1">Track your shillings, grow your savings 💪</p>
        </div>
      </footer>
    </div>
  );
}

export default App;