import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './configs/mongodb.js';
import userRouter from './routes/userRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// ✅ Raw body parser only for Svix webhooks
app.use(
  '/api/user/webhooks',
  express.raw({ type: 'application/json' })
);

// ✅ JSON parser for all other routes
app.use(express.json());
app.use(cors());

// ✅ Routes
app.use('/api/user', userRouter);
app.get('/', (req, res) => res.send("API is running"));

// ✅ DB connect & start
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

startServer();
