import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    mongoose.connection.on('connected', () => {
      console.log('Mongoose connection is open');
    });

    mongoose.connection.on('error', (err) => {
      console.error('Mongoose connection error:', err);
    });
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

export default connectDb;
