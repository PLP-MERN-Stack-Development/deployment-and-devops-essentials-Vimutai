import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Load environment variables FIRST
dotenv.config();

// Now import modules that depend on environment variables
import connectDB from './config/db.js';
import transactionRoutes from './routes/transactions.js';
import logger from './utils/logger.js';
import healthRouter from './routes/health.js';

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(morgan('combined', {
  stream: { write: message => logger.info(message.trim()) }
}));

// Routes - Use the health router
app.use('/api/health', healthRouter);

// Your existing health route (remove this duplicate)
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Budget Planner API is running! 🚀',
    timestamp: new Date().toISOString() 
  });
});

app.use('/api/transactions', transactionRoutes);

// Remove the duplicate health route at the bottom - it's already handled by healthRouter

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong - Iko shida!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found - Haipo hapa!' 
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`🚀 Server running on port ${PORT}`);
  logger.info(`🇰🇪 Enyan Budget Planner API - Karibu!`);
  logger.info(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});