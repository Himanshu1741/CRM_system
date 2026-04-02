import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import activityRoutes from "./routes/activity.routes.js";
import authRoutes from "./routes/auth.routes.js";
import customerRoutes from "./routes/customer.routes.js";
import dealRoutes from "./routes/deal.routes.js";
import leadRoutes from "./routes/lead.routes.js";
import noteRoutes from "./routes/note.routes.js";
import taskRoutes from "./routes/task.routes.js";

dotenv.config();

const app = express();

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

// Health check
app.get("/", (req, res) => {
  res.send("CRM API Running...");
});

export default app;
