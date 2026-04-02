import express from "express";
import { protect } from "../../middleware/auth.js";
import {
    createActivity,
    deleteActivity,
    getActivities,
    getActivity,
} from "./activity.controller.js";

const router = express.Router();

router.get("/", getActivities);
router.get("/:id", getActivity);
router.post("/", protect, createActivity);
router.delete("/:id", protect, deleteActivity);

export default router;
