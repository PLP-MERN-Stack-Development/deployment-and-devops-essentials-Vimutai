import express from 'express';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const mongoose = await import('mongoose');
    const dbState = mongoose.default.connection.readyState; // 1 = connected
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

export default router;
