import Note from "../models/Note.js";
import { handleError, handleSuccess } from "../utils/errorHandler.js";
import { validateRequired } from "../utils/validation.js";

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.findAll({
      order: [["createdAt", "DESC"]],
    });
    handleSuccess(res, notes, "Notes retrieved successfully");
  } catch (error) {
    handleError(res, error);
  }
};

export const getNote = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid note ID" });
    }

    const note = await Note.findByPk(id);

    if (!note) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }

    handleSuccess(res, note, "Note retrieved successfully");
  } catch (error) {
    handleError(res, error);
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content, leadId, customerId, dealId } = req.body;

    // Validate required fields
    const validation = validateRequired(["title", "content"], req.body);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${validation.missing.join(", ")}`,
      });
    }

    const note = await Note.create({
      title,
      content,
      leadId: leadId || null,
      customerId: customerId || null,
      dealId: dealId || null,
      createdBy: req.user?.id || null,
    });

    handleSuccess(res, note, "Note created successfully", 201);
  } catch (error) {
    handleError(res, error);
  }
};

export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid note ID" });
    }

    const note = await Note.findByPk(id);

    if (!note) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }

    await note.update(req.body);

    handleSuccess(res, note, "Note updated successfully");
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid note ID" });
    }

    const note = await Note.findByPk(id);

    if (!note) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }

    await note.destroy();

    handleSuccess(res, { id }, "Note deleted successfully");
  } catch (error) {
    handleError(res, error);
  }
};
