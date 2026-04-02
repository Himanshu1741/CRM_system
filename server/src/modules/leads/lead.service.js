import Lead from "../../models/Lead.js";

export class LeadService {
  static async getAll(filters = {}) {
    return await Lead.find(filters)
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");
  }

  static async getById(id) {
    return await Lead.findById(id)
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");
  }

  static async create(leadData, userId) {
    const lead = new Lead({
      ...leadData,
      createdBy: userId,
    });
    await lead.save();
    await lead.populate("assignedTo", "name email");
    await lead.populate("createdBy", "name email");
    return lead;
  }

  static async update(id, updateData) {
    const lead = await Lead.findByIdAndUpdate(id, updateData, { new: true })
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");
    return lead;
  }

  static async delete(id) {
    return await Lead.findByIdAndDelete(id);
  }
}
