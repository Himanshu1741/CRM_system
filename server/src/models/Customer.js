import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: String,
    company: String,
    industry: String,
    address: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    status: {
      type: String,
      enum: ["active", "inactive", "prospect"],
      default: "prospect",
    },
    totalSpent: {
      type: Number,
      default: 0,
    },
    notes: String,
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Customer", customerSchema);
