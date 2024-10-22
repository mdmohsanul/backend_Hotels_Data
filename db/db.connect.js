const mongoose = require("mongoose");
require("dotenv").config();
const mongoURL = process.env.MONGODB_URL;

const initializeDB = async () => {
  try {
    const connection = await mongoose.connect(mongoURL);
    if (connection) {
      console.log("Database connected");
    }
  } catch (error) {
    console.log("Error connecting to database ", error);
  }
};
module.exports = { initializeDB };
