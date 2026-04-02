import Task from "../../models/Task.js";

export class TaskService {
  static async getAll(filters = {}) {
    return await Task.find(filters)
      .populate("lead", "firstName lastName email")
      .populate("customer", "firstName lastName email")
      .populate("deal", "title amount")
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email")
      .sort({ dueDate: 1 });
  }

  static async getById(id) {
    return await Task.findById(id)
      .populate("lead", "firstName lastName email")
      .populate("customer", "firstName lastName email")
      .populate("deal", "title amount")
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");
  }

  static async create(taskData, userId) {
    const task = new Task({
      ...taskData,
      createdBy: userId,
    });
    await task.save();
    await task.populate("lead", "firstName lastName email");
    await task.populate("customer", "firstName lastName email");
    await task.populate("deal", "title amount");
    await task.populate("assignedTo", "name email");
    await task.populate("createdBy", "name email");
    return task;
  }

  static async update(id, updateData) {
    const task = await Task.findByIdAndUpdate(id, updateData, { new: true })
      .populate("lead", "firstName lastName email")
      .populate("customer", "firstName lastName email")
      .populate("deal", "title amount")
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");
    return task;
  }

  static async delete(id) {
    return await Task.findByIdAndDelete(id);
  }
}
