const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables from .env file

const connect = { isConnected: null }; // Track connection status

async function dbConnect() {
  if (connect.isConnected) {
    console.log("Database is already connected");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});
    connect.isConnected = db.connections[0].readyState;
    console.log("Database connected");
  } catch (error) {
    console.log("Error connecting to database. Error is:", error);
    process.exit(1);
  }
}

module.exports = dbConnect;
