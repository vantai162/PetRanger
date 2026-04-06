import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { DB_NAME } from './constant.js';


dotenv.config();
const uri = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      dbName: DB_NAME,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;