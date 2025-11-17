import express from 'express';
import Transaction from '../models/Transaction.js';
import logger from '../utils/logger.js';

const router = express.Router();

// GET /api/transactions - Get all transactions
router.get('/', async (req, res) => {
  try {
    const { startDate, endDate, type } = req.query;
    const query = {};
    
    if (type) query.type = type;
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }
    
    const transactions = await Transaction.find(query).sort({ date: -1 });
    
    logger.info(`📊 Fetched ${transactions.length} transactions`);
    res.json({ success: true, count: transactions.length, data: transactions });
  } catch (error) {
    logger.error(`Error fetching transactions: ${error.message}`);
    res.status(500).json({ success: false, message: 'Server Error - Iko shida kidogo' });
  }
});

// GET /api/transactions/:id - Get single transaction
router.get('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    
    if (!transaction) {
      return res.status(404).json({ success: false, message: 'Transaction not found - Haipo' });
    }
    
    res.json({ success: true, data: transaction });
  } catch (error) {
    logger.error(`Error fetching transaction: ${error.message}`);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// POST /api/transactions - Create new transaction
router.post('/', async (req, res) => {
  try {
    const { type, amount, category, description, date } = req.body;
    
    const transaction = await Transaction.create({
      type,
      amount,
      category,
      description,
      date: date || Date.now(),
    });
    
    logger.info(`✅ Transaction created: ${type} - KES ${amount}`);
    res.status(201).json({ success: true, data: transaction, message: 'Transaction added - Sawa!' });
  } catch (error) {
    logger.error(`Error creating transaction: ${error.message}`);
    res.status(400).json({ success: false, message: error.message });
  }
});

// PUT /api/transactions/:id - Update transaction
router.put('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!transaction) {
      return res.status(404).json({ success: false, message: 'Transaction not found' });
    }
    
    logger.info(`✏️ Transaction updated: ${transaction._id}`);
    res.json({ success: true, data: transaction, message: 'Transaction updated - Sawa!' });
  } catch (error) {
    logger.error(`Error updating transaction: ${error.message}`);
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE /api/transactions/:id - Delete transaction
router.delete('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    
    if (!transaction) {
      return res.status(404).json({ success: false, message: 'Transaction not found' });
    }
    
    logger.info(`🗑️ Transaction deleted: ${transaction._id}`);
    res.json({ success: true, data: {}, message: 'Transaction deleted - Imefutwa!' });
  } catch (error) {
    logger.error(`Error deleting transaction: ${error.message}`);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// GET /api/transactions/summary/stats - Get summary statistics
router.get('/summary/stats', async (req, res) => {
  try {
    const { month, year } = req.query;
    const matchQuery = {};
    
    if (month && year) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);
      matchQuery.date = { $gte: startDate, $lte: endDate };
    }
    
    const summary = await Transaction.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: '$type',
          total: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
    ]);
    
    const categoryBreakdown = await Transaction.aggregate([
      { $match: { ...matchQuery, type: 'expense' } },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
      { $sort: { total: -1 } },
    ]);
    
    const income = summary.find(s => s._id === 'income')?.total || 0;
    const expenses = summary.find(s => s._id === 'expense')?.total || 0;
    const balance = income - expenses;
    
    logger.info(`📈 Summary generated - Balance: KES ${balance}`);
    
    res.json({
      success: true,
      data: {
        income,
        expenses,
        balance,
        categoryBreakdown,
        message: balance >= 0 ? 'Uko sawa! 💪' : 'Punguza matumizi kidogo 😅',
      },
    });
  } catch (error) {
    logger.error(`Error generating summary: ${error.message}`);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

export default router;