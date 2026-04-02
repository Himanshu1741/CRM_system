import express from "express";
import { protect } from "../../middleware/auth.js";
import {
    createLead,
    deleteLead,
    getLead,
    getLeads,
    updateLead,
} from "./lead.controller.js";

const router = express.Router();

router.get("/", getLeads);
router.get("/:id", getLead);
router.post("/", protect, createLead);
router.put("/:id", protect, updateLead);
router.delete("/:id", protect, deleteLead);

export default router;
