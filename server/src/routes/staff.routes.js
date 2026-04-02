import express from "express";
import {
  createStaff,
  deleteStaff,
  getStaff,
  getStaffMember,
  updateStaff,
} from "../controllers/staff.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getStaff);
router.get("/:id", getStaffMember);
router.post("/", protect, createStaff);
router.put("/:id", protect, updateStaff);
router.delete("/:id", protect, deleteStaff);

export default router;
