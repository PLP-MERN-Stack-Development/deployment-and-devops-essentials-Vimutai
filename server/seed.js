import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Transaction from './models/Transaction.js';
import logger from './utils/logger.js';

dotenv.config();

const sampleTransactions = [
  {
    type: 'income',
    amount: 50000,
    category: 'salary',
    description: 'Monthly Salary - November',
    date: new Date('2025-11-01'),
  },
  {
    type: 'expense',
    amount: 15000,
    category: 'rent',
    description: 'Bedsitter Rent - Ngara',
    date: new Date('2025-11-02'),
  },
  {
    type: 'expense',
    amount: 2500,
    category: 'gikomba',
    description: 'Mitumba shopping',
    date: new Date('2025-11-05'),
  },
  {
    type: 'expense',
    amount: 1500,
    category: 'matatu',
    description: 'CBD to Ngara - Weekly fare',
    date: new Date('2025-11-06'),
  },
  {
    type: 'expense',
    amount: 800,
    category: 'boda',
    description: 'Boda ride - Emergency',
    date: new Date('2025-11-07'),
  },
  {
    type: 'expense',
    amount: 3000,
    category: 'mama_mboga',
    description: 'Sukuma wiki, tomatoes, onions',
    date: new Date('2025-11-08'),
  },
  {
    type: 'expense',
    amount: 1200,
    category: 'nyama',
    description: 'Nyama choma at Kenyatta Market',
    date: new Date('2025-11-09'),
  },
  {
    type: 'income',
    amount: 8000,
    category: 'business',
    description: 'Side hustle - Graphic design',
    date: new Date('2025-11-10'),
  },
  {
    type: 'expense',
    amount: 500,
    category: 'mpesa',
    description: 'M-Pesa withdrawal charges',
    date: new Date('2025-11-11'),
  },
  {
    type: 'expense',
    amount: 2000,
    category: 'entertainment',
    description: 'Movie night - Sherehe',
    date: new Date('2025-11-12'),
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    logger.info('✅ Connected to MongoDB');

    // Clear existing transactions
    await Transaction.deleteMany({});
    logger.info('🗑️ Cleared existing transactions');

    // Insert sample data
    await Transaction.insertMany(sampleTransactions);
    logger.info(`✅ Inserted ${sampleTransactions.length} sample transactions`);
    logger.info('🇰🇪 Database seeded successfully - Iko sawa!');

    process.exit(0);
  } catch (error) {
    logger.error(`❌ Seeding error: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();