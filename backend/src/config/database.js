const mongoose = require("mongoose");

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database connection error:", err.message);
  }
};

module.exports = connectdb;
