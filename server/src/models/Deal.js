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
      type: DataTypes.ENUM(
        "prospect",
        "negotiation",
        "proposal",
        "closed-won",
        "closed-lost",
      ),
      defaultValue: "prospect",
    },
    probability: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    expectedCloseDate: DataTypes.DATE,
    actualCloseDate: DataTypes.DATE,
    notes: DataTypes.TEXT,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "deals",
    timestamps: false,
  },
);

Deal.belongsTo(Customer, { foreignKey: "customerId" });

export default Deal;
