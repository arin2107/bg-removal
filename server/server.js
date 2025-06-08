import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/mongodb.js';

// App config
const PORT = process.env.PORT || 4000;
const app = express();
await connectDB();

// Initialize Middleware
app.use(express.json());
app.use(cors());

// API Routes
app.get('/', (req, res) => res.send("API is running"));

// Connect to DB and then start server
try {
  await connectDB();
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
} catch (error) {
  console.error('Failed to connect to DB:', error);
}
