import { TaskService } from "./task.service.js";

export const getTasks = async (req, res, next) => {
  try {
    const filters = {};
    if (req.query.status) filters.status = req.query.status;
    if (req.query.priority) filters.priority = req.query.priority;
    if (req.query.assignedTo) filters.assignedTo = req.query.assignedTo;

    const tasks = await TaskService.getAll(filters);
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    next(error);
  }
};

export const getTask = async (req, res, next) => {
  try {
    const task = await TaskService.getById(req.params.id);
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

    const task = await TaskService.create(
      {
        title,
        description,
        dueDate,
        priority,
        status,
        lead,
        customer,
        deal,
        assignedTo,
      },
      req.user?.id,
    );
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await TaskService.update(req.params.id, req.body);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await TaskService.delete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ success: true, message: "Task deleted" });
  } catch (error) {
    next(error);
  }
};
