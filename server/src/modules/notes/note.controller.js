import { NoteService } from "./note.service.js";

export const getNotes = async (req, res, next) => {
  try {
    const filters = {};
    if (req.query.lead) filters.lead = req.query.lead;
    if (req.query.customer) filters.customer = req.query.customer;
    if (req.query.deal) filters.deal = req.query.deal;

    const notes = await NoteService.getAll(filters);
    res.status(200).json({ success: true, data: notes });
  } catch (error) {
    next(error);
  }
};

export const getNote = async (req, res, next) => {
  try {
    const note = await NoteService.getById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ success: true, data: note });
  } catch (error) {
    next(error);
  }
};

export const createNote = async (req, res, next) => {
  try {
    const { title, content, lead, customer, deal } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    const note = await NoteService.create(
      { title, content, lead, customer, deal },
      req.user?.id,
    );
    res.status(201).json({ success: true, data: note });
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req, res, next) => {
  try {
    const note = await NoteService.update(req.params.id, req.body);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ success: true, data: note });
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    const note = await NoteService.delete(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ success: true, message: "Note deleted" });
  } catch (error) {
    next(error);
  }
};
