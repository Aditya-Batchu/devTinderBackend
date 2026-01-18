const mongoose = require("mongoose");
const { DATABASE_URL } = require("../constants/constants.js");

const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE_URL);
  } catch (err) {
    console.error("Failed to connect to database:", err);
    throw err;
  }
};

module.exports = connectDB;
