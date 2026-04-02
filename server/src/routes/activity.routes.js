import express from "express";
import {
    createActivity,
    deleteActivity,
    getActivities,
    getActivity,
} from "../controllers/activity.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getActivities);
router.get("/:id", getActivity);
router.post("/", protect, createActivity);
router.delete("/:id", protect, deleteActivity);

export default router;
