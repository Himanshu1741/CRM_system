import cors from "cors";
import "dotenv/config";
import express from "express";

import { errorHandler } from "./middleware/errorHandler.js";
import activityRoutes from "./routes/activity.routes.js";
import authRoutes from "./routes/auth.routes.js";
import customerRoutes from "./routes/customer.routes.js";
import dealRoutes from "./routes/deal.routes.js";
import leadRoutes from "./routes/lead.routes.js";
import noteRoutes from "./routes/note.routes.js";
import reportRoutes from "./routes/report.routes.js";
import taskRoutes from "./routes/task.routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/deals", dealRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/reports", reportRoutes);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Error handling middleware
app.use(errorHandler);

export default app;
