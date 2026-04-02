import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Note = sequelize.define(
  "Note",
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
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    leadId: {
      type: DataTypes.INTEGER,
      field: "lead_id",
    },
    customerId: {
      type: DataTypes.INTEGER,
      field: "customer_id",
    },
    dealId: {
      type: DataTypes.INTEGER,
      field: "deal_id",
    },
    createdBy: {
      type: DataTypes.INTEGER,
      field: "created_by",
      allowNull: false,
    },
  },
  {
    tableName: "notes",
    timestamps: false,
  },
);

export default Note;
