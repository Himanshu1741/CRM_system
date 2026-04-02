import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
const PORT = process.env.API_PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "CRM Server is running" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
