import Deal from "../../models/Deal.js";

export class DealService {
  static async getAll(filters = {}) {
    return await Deal.find(filters)
      .populate("customer", "firstName lastName email company")
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");
  }

  static async getById(id) {
    return await Deal.findById(id)
      .populate("customer", "firstName lastName email company")
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");
  }

  static async create(dealData, userId) {
    const deal = new Deal({
      ...dealData,
      createdBy: userId,
    });
    await deal.save();
    await deal.populate("customer", "firstName lastName email company");
    await deal.populate("assignedTo", "name email");
    await deal.populate("createdBy", "name email");
    return deal;
  }

  static async update(id, updateData) {
    const deal = await Deal.findByIdAndUpdate(id, updateData, { new: true })
      .populate("customer", "firstName lastName email company")
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");
    return deal;
  }

  static async delete(id) {
    return await Deal.findByIdAndDelete(id);
  }
}
