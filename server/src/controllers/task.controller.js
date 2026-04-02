import Task from "../models/Task.js";

export const getTasks = async (req, res, next) => {
  try {
    const filters = {};
    if (req.query.status) filters.status = req.query.status;
    if (req.query.priority) filters.priority = req.query.priority;
    if (req.query.assignedTo) filters.assignedTo = req.query.assignedTo;

    const tasks = await Task.find(filters)
      .populate("lead", "firstName lastName email")
      .populate("customer", "firstName lastName email")
      .populate("deal", "title amount")
      .populate("assignedTo", "name email")
      .sort({ dueDate: 1 });

    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    next(error);
  }
};

export const getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("lead", "firstName lastName email")
      .populate("customer", "firstName lastName email")
      .populate("deal", "title amount")
      .populate("assignedTo", "name email");

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const {
      title,
      description,
      dueDate,
      priority,
      status,
      lead,
      customer,
      deal,
      assignedTo,
    } = req.body;

    if (!title || !assignedTo) {
      return res
        .status(400)
        .json({ message: "Title and assignedTo are required" });
    }

    const task = new Task({
      title,
      description,
      dueDate,
      priority,
      status,
      lead,
      customer,
      deal,
      assignedTo,
      createdBy: req.user?.id,
    });

    await task.save();
    await task.populate("lead", "firstName lastName email");
    await task.populate("customer", "firstName lastName email");
    await task.populate("deal", "title amount");
    await task.populate("assignedTo", "name email");

    res.status(201).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task = Object.assign(task, req.body);
    await task.save();

    await task.populate("lead", "firstName lastName email");
    await task.populate("customer", "firstName lastName email");
    await task.populate("deal", "title amount");
    await task.populate("assignedTo", "name email");

    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ success: true, message: "Task deleted" });
  } catch (error) {
    next(error);
  }
};
