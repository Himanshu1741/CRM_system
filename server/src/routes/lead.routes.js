import express from "express";
import {
    createLead,
    deleteLead,
    getLead,
    getLeads,
    updateLead,
} from "../controllers/lead.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getLeads);
router.get("/:id", getLead);
router.post("/", protect, createLead);
router.put("/:id", protect, updateLead);
router.delete("/:id", protect, deleteLead);

export default router;
