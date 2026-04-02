import express from "express";
import {
  createCommunication,
  deleteCommunication,
  getCommunication,
  getCommunications,
  updateCommunication,
} from "../controllers/communication.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getCommunications);
router.get("/:id", getCommunication);
router.post("/", protect, createCommunication);
router.put("/:id", protect, updateCommunication);
router.delete("/:id", protect, deleteCommunication);

export default router;
