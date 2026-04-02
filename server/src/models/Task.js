import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Task = sequelize.define(
  "Task",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.TEXT,
    status: {
      type: DataTypes.STRING,
      defaultValue: "pending",
    },
    priority: {
      type: DataTypes.STRING,
      defaultValue: "medium",
    },
    assignedTo: {
      type: DataTypes.INTEGER,
      field: "assigned_to",
    },
    dueDate: {
      type: DataTypes.DATE,
      field: "due_date",
    },
    createdBy: {
      type: DataTypes.INTEGER,
      field: "created_by",
    },
  },
  {
    tableName: "tasks",
    timestamps: false,
  },
);

export default Task;
