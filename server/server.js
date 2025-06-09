import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './configs/mongodb.js';
import userRouter from './routes/userRoutes.js';

const PORT = process.env.PORT || 4000;
const app = express();

// 👉 Connect to MongoDB
connectDB();

// 🛡️ Raw body parser for Clerk Webhooks (Svix)
app.use('/api/user/webhooks', bodyParser.raw({ type: 'application/json' }));

// 🧱 Normal middleware
app.use(express.json());
app.use(cors());

// ✅ Test route
app.get('/', (req, res) => res.send("API is running"));

// 🧩 Routes
app.use('/api/user', userRouter);

// 🚀 Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
