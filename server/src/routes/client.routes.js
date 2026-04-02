import express from "express";
import {
  createClient,
  deleteClient,
  getClient,
  getClients,
  updateClient,
} from "../controllers/client.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getClients);
router.get("/:id", getClient);
router.post("/", protect, createClient);
router.put("/:id", protect, updateClient);
router.delete("/:id", protect, deleteClient);

export default router;
