const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

dotenv.config();

const geminiRoutes = require("./routes/geminiRoutes");

const app = express();

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || "*" })); // Restrict CORS if needed
app.use(express.json());
app.use(morgan("dev")); // Logs requests in dev-friendly format

// Routes
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running smoothly 🚀" });
});

app.use("/api/gemini", geminiRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
