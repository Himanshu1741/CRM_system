import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Customer from "./Customer.js";

const Deal = sequelize.define(
  "Deal",
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
    customerId: {
      type: DataTypes.INTEGER,
      field: "customer_id",
      allowNull: false,
      references: {
        model: Customer,
        key: "id",
      },
    },
    amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    stage: {
      type: DataTypes.STRING,
      defaultValue: "prospect",
    },
    probability: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    expectedCloseDate: {
      type: DataTypes.DATE,
      field: "expected_close_date",
    },
    actualCloseDate: {
      type: DataTypes.DATE,
      field: "actual_close_date",
    },
    notes: DataTypes.TEXT,
    assignedTo: {
      type: DataTypes.INTEGER,
      field: "assigned_to",
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      field: "created_by",
      allowNull: false,
    },
  },
  {
    tableName: "deals",
    timestamps: false,
  },
);

Deal.belongsTo(Customer, { foreignKey: "customerId" });

export default Deal;
