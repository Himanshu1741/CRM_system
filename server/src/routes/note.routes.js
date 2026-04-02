import express from "express";
import {
    createNote,
    deleteNote,
    getNote,
    getNotes,
    updateNote,
} from "../controllers/note.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getNotes);
router.get("/:id", getNote);
router.post("/", protect, createNote);
router.put("/:id", protect, updateNote);
router.delete("/:id", protect, deleteNote);

export default router;
