import mongoose from "mongoose";

const dealSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    stage: {
      type: String,
      enum: [
        "prospect",
        "negotiation",
        "proposal",
        "closed-won",
        "closed-lost",
      ],
      default: "prospect",
    },
    probability: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    expectedCloseDate: Date,
    actualCloseDate: Date,
    notes: String,
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Deal", dealSchema);
