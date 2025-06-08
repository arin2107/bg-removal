import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;


// import mongoose from 'mongoose';

// const connectDB = async () => {

//     mongoose.connection.on('connected', () => {
//         console.log('MongoDB connected');
//     })

//     await mongoose.connect('${process.env.MONGODB_URI}/bg-removal')
    
//   }
  
//   export default connectDB



