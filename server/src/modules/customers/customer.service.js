import Customer from "../../models/Customer.js";

export class CustomerService {
  static async getAll(filters = {}) {
    return await Customer.find(filters)
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");
  }

  static async getById(id) {
    return await Customer.findById(id)
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");
  }

  static async create(customerData, userId) {
    const customer = new Customer({
      ...customerData,
      createdBy: userId,
    });
    await customer.save();
    await customer.populate("assignedTo", "name email");
    await customer.populate("createdBy", "name email");
    return customer;
  }

  static async update(id, updateData) {
    const customer = await Customer.findByIdAndUpdate(id, updateData, {
      new: true,
    })
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");
    return customer;
  }

  static async delete(id) {
    return await Customer.findByIdAndDelete(id);
  }
}
