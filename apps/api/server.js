require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");
const partnershipInquiryRoutes = require(
  "./routes/partnershipInquiryRoutes"
);
const app = express();
const registrationRoutes = require("./routes/registrationRoutes");
const sponsorRoutes = require("./routes/sponsorRoutes");
// Database Connection: warm it up at boot, and make every /api request wait for
// it so a cold start never handles a request before Mongo is ready.
connectDB().catch(() => {});

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api", async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(503).json({ success: false, message: "Database unavailable. Please try again." });
  }
});


app.use("/api", sponsorRoutes);
app.use("/api", registrationRoutes);
// Home Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "EduExcellence API Running Successfully",
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", contactRoutes);
app.use(
  "/api/partnership-inquiries",
  partnershipInquiryRoutes
);
const PORT = process.env.PORT || 5000;

// Local Development Only
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`);
  });
}

// Export for Vercel
module.exports = app;