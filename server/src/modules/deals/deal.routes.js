import express from "express";
import { protect } from "../../middleware/auth.js";
import {
    createDeal,
    deleteDeal,
    getDeal,
    getDeals,
    updateDeal,
} from "./deal.controller.js";

const router = express.Router();

router.get("/", getDeals);
router.get("/:id", getDeal);
router.post("/", protect, createDeal);
router.put("/:id", protect, updateDeal);
router.delete("/:id", protect, deleteDeal);

export default router;
