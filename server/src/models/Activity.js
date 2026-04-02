import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Activity = sequelize.define(
  "Activity",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
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
      allowNull: true,
    },
  },
  {
    tableName: "activities",
    timestamps: false,
  },
);

export default Activity;
