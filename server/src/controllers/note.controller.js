import Note from "../models/Note.js";

export const getNotes = async (req, res, next) => {
  try {
    const filters = {};
    if (req.query.lead) filters.lead = req.query.lead;
    if (req.query.customer) filters.customer = req.query.customer;
    if (req.query.deal) filters.deal = req.query.deal;

    const notes = await Note.find(filters)
      .populate("lead", "firstName lastName")
      .populate("customer", "firstName lastName")
      .populate("deal", "title")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: notes });
  } catch (error) {
    next(error);
  }
};

export const getNote = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id)
      .populate("lead", "firstName lastName")
      .populate("customer", "firstName lastName")
      .populate("deal", "title")
      .populate("createdBy", "name email");

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

    const note = new Note({
      title,
      content,
      lead,
      customer,
      deal,
      createdBy: req.user?.id,
    });

    await note.save();
    await note.populate("lead", "firstName lastName");
    await note.populate("customer", "firstName lastName");
    await note.populate("deal", "title");
    await note.populate("createdBy", "name email");

    res.status(201).json({ success: true, data: note });
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req, res, next) => {
  try {
    let note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    note = Object.assign(note, req.body);
    await note.save();

    await note.populate("lead", "firstName lastName");
    await note.populate("customer", "firstName lastName");
    await note.populate("deal", "title");
    await note.populate("createdBy", "name email");

    res.status(200).json({ success: true, data: note });
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ success: true, message: "Note deleted" });
  } catch (error) {
    next(error);
  }
};
