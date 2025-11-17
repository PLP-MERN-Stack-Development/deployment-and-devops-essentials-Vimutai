import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import transactionRoutes from './routes/transactions.js';
import logger from './utils/logger.js';
import healthRouter from './routes/health.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use('/api/health', healthRouter);

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

// Routes
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Budget Planner API is running! ðŸ‡°ðŸ‡ª',
    timestamp: new Date().toISOString() 
  });
});

app.use('/api/transactions', transactionRoutes);

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
  logger.info(`ðŸš€ Server running on port ${PORT}`);
  logger.info(`ðŸ‡°ðŸ‡ª Enyan Budget Planner API - Karibu!`);
  logger.info(`ðŸŒ Environment: ${process.env.NODE_ENV || 'development'}`);
});/**
 * Quick health route â€” returns basic app + DB status
 * If you already have a /api/health route, skip this step.
 */
app.get('/api/health', async (req, res) => {
  try {
    // DB connection state (mongoose readyState: 1 = connected)
    const mongoose = await import('mongoose');
    const dbState = mongoose.default.connection.readyState;
    return res.json({
      success: true,
      status: 'ok',
      env: process.env.NODE_ENV || 'development',
      dbConnected: dbState === 1,
      uptimeSec: Math.floor(process.uptime())
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'health check failed', error: err.message });
  }
});


