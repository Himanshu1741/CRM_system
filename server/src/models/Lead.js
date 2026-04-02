import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Lead = sequelize.define(
  "Lead",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      field: "first_name",
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      field: "last_name",
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: DataTypes.STRING,
    company: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      defaultValue: "new",
    },
    source: {
      type: DataTypes.STRING,
      defaultValue: "website",
    },
    notes: DataTypes.TEXT,
    assignedTo: {
      type: DataTypes.INTEGER,
      field: "assigned_to",
    },
    createdBy: {
      type: DataTypes.INTEGER,
      field: "created_by",
    },
  },
  {
    tableName: "leads",
    timestamps: false,
  },
);

export default Lead;
