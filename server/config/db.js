import mongoose from 'mongoose';
import logger from '../utils/logger.js';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    logger.info(`✅ MongoDB Connected: ${conn.connection.host}`);
    logger.info(`🇰🇪 Database ready - Karibu Budget Planner!`);
  } catch (error) {
    logger.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;