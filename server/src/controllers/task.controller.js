import Task from "../models/Task.js";
import { handleError, handleSuccess } from "../utils/errorHandler.js";
import { validateRequired } from "../utils/validation.js";

export const getTasks = async (req, res) => {
  try {
    const filters = {};
    if (req.query.status) filters.status = req.query.status;
    if (req.query.priority) filters.priority = req.query.priority;

    const tasks = await Task.findAll({
      where: filters,
      order: [["dueDate", "ASC"]],
    });

    handleSuccess(res, tasks, "Tasks retrieved successfully");
  } catch (error) {
    handleError(res, error);
  }
};

export const getTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid task ID" });
    }

    const task = await Task.findByPk(id);

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    handleSuccess(res, task, "Task retrieved successfully");
  } catch (error) {
    handleError(res, error);
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, status } = req.body;

    // Validate required fields
    const validation = validateRequired(["title"], req.body);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${validation.missing.join(", ")}`,
      });
    }

    const task = await Task.create({
      title,
      description: description || null,
      dueDate: dueDate || null,
      priority: priority || "medium",
      status: status || "pending",
    });

    handleSuccess(res, task, "Task created successfully", 201);
  } catch (error) {
    handleError(res, error);
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid task ID" });
    }

    const task = await Task.findByPk(id);

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    await task.update(req.body);

    handleSuccess(res, task, "Task updated successfully");
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid task ID" });
    }

    const task = await Task.findByPk(id);

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    await task.destroy();

    handleSuccess(res, { id }, "Task deleted successfully");
  } catch (error) {
    handleError(res, error);
  }
};
