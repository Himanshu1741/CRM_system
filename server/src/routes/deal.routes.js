import express from "express";
import {
    createDeal,
    deleteDeal,
    getDeal,
    getDeals,
    updateDeal,
} from "../controllers/deal.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getDeals);
router.get("/:id", getDeal);
router.post("/", protect, createDeal);
router.put("/:id", protect, updateDeal);
router.delete("/:id", protect, deleteDeal);

export default router;
