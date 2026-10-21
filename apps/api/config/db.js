const mongoose = require("mongoose");

// Serverless-friendly connection: one cached promise per process, reused across
// requests. A failed attempt is forgotten so the next request retries instead of
// the whole function dying (process.exit on Vercel = request gets no response,
// which the browser reports as "Failed to fetch").
let pending = null;

const connectDB = () => {
  if (mongoose.connection.readyState === 1) return Promise.resolve(mongoose.connection);
  if (!pending) {
    pending = mongoose
      .connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 8000 })
      .then((m) => {
        console.log("MongoDB Connected");
        return m.connection;
      })
      .catch((error) => {
        pending = null;
        console.error("MongoDB connection failed:", error.message);
        throw error;
      });
  }
  return pending;
};

module.exports = connectDB;
