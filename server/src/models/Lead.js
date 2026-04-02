import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
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
    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "unqualified"],
      default: "new",
    },
    source: {
      type: String,
      enum: ["website", "referral", "campaign", "cold-call", "other"],
      default: "website",
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

export default mongoose.model("Lead", leadSchema);
