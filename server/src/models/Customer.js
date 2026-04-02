import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Customer = sequelize.define(
  "Customer",
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
    industry: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipCode: {
      type: DataTypes.STRING,
      field: "zip_code",
    },
    country: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      defaultValue: "prospect",
    },
    totalSpent: {
      type: DataTypes.DECIMAL(12, 2),
      field: "total_spent",
      defaultValue: 0,
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
    tableName: "customers",
    timestamps: false,
  },
);

export default Customer;
