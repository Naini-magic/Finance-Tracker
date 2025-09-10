const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use environment variable for MongoDB connection
    const conn = await mongoose.connect(process.env.MONGODB_URI  || "MONGODB_URI=mongodb+srv://raghuwanshisunaini_db_user:emSfcN2A3R0DDubM@cluster0.qek8eex.mongodb.net/FinanceTracker" , {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
