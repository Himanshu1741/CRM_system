import Note from "../models/Note.js";

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json({ success: true, data: notes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getNote = async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ success: true, data: note });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    const note = await Note.create({
      title,
      content,
    });

    res.status(201).json({ success: true, data: note });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    await note.update(req.body);

    res.status(200).json({ success: true, data: note });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    await note.destroy();

    res.status(200).json({ success: true, message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
