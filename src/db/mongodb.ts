import mongoose from 'mongoose';

export const connectMongoDB = async () => {
  const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;

  if (!mongoUri) {
    console.info('ℹ️ [MongoDB] MONGO_URI is not configured in .env. Running in resilient memory mode.');
    return false;
  }

  try {
    if (mongoose.connection.readyState === 1) {
      return true;
    }

    await mongoose.connect(mongoUri);
    console.log('✅ [MongoDB] Connected successfully to MongoDB instance!');
    return true;
  } catch (err: any) {
    console.warn('⚠️ [MongoDB] Connection warning:', err?.message || err);
    return false;
  }
};
