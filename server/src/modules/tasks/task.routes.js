import express from "express";
import { protect } from "../../middleware/auth.js";
import {
    createTask,
    deleteTask,
    getTask,
    getTasks,
    updateTask,
} from "./task.controller.js";

const router = express.Router();

router.get("/", getTasks);
router.get("/:id", getTask);
router.post("/", protect, createTask);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

export default router;
