import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Load environment variables FIRST
dotenv.config();

// DB + routes
import connectDB from './config/db.js';
import transactionRoutes from './routes/transactions.js';
import healthRouter from './routes/health.js';
import logger from './utils/logger.js';

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

app.use(
  morgan('combined', {
    stream: {
      write: message => logger.info(message.trim()),
    },
  })
);

// ------------------------------
// ROUTES
// ------------------------------

// Health check route
app.use('/api/health', healthRouter);

// Friendly root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Enyan Budget Planner API - Karibu! 🚀',
    version: '1.0.0',
    docs: '/api/health'
  });
});

// Main API routes
app.use('/api/transactions', transactionRoutes);

// ------------------------------
// OPTIONAL: Serve React frontend
// Uncomment this block if you want Express to serve your React build
// ------------------------------
//
// import path from 'path';
// import { fileURLToPath } from 'url';
//
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const clientBuildPath = path.join(__dirname, '../client/build');
//
// app.use(express.static(clientBuildPath));
//
// app.get('*', (req, res) => {
//   if (req.path.startsWith('/api/')) {
//     return res.status(404).json({ success: false, message: 'API route not found' });
//   }
//   res.sendFile(path.join(clientBuildPath, 'index.html'));
// });
//
// ------------------------------


// ------------------------------
// ERROR HANDLING
// ------------------------------
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong - Iko shida!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// 404 handler (for all unknown routes)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found - Haipo hapa!',
  });
});

// ------------------------------
// SERVER START
// ------------------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`🚀 Server running on port ${PORT}`);
  logger.info(`🇰🇪 Enyan Budget Planner API - Karibu!`);
  logger.info(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
