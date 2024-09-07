import mongoose from 'mongoose';

const MONGODB_Uri = process.env.MONGODB_URI as string;

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(MONGODB_Uri);
    if (connection.readyState === 1) {
      return Promise.resolve(true);
    }
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};
