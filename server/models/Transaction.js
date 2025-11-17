import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: [true, 'Transaction type is required (income or expense)'],
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0, 'Amount cannot be negative'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'gikomba', 'matatu', 'boda', 'nyama', 'mama_mboga', 
      'shule', 'rent', 'mpesa', 'salon', 'entertainment', 
      'salary', 'business', 'other'
    ],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [200, 'Description cannot exceed 200 characters'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Index for faster queries
transactionSchema.index({ date: -1 });
transactionSchema.index({ type: 1 });

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;