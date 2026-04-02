import Activity from "../models/Activity.js";
import Customer from "../models/Customer.js";
import Deal from "../models/Deal.js";
import Note from "../models/Note.js";
import { handleError, handleSuccess } from "../utils/errorHandler.js";
import { validateEmail, validateRequired } from "../utils/validation.js";

export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    handleSuccess(res, customers, "Customers retrieved successfully");
  } catch (error) {
    handleError(res, error);
  }
};

export const getCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid customer ID" });
    }

    const customer = await Customer.findByPk(id);

    if (!customer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });
    }

    handleSuccess(res, customer, "Customer retrieved successfully");
  } catch (error) {
    handleError(res, error);
  }
};

export const createCustomer = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      industry,
      address,
      city,
      state,
      zipCode,
      country,
      status,
      notes,
    } = req.body;

    // Validate required fields
    const validation = validateRequired(
      ["firstName", "lastName", "email"],
      req.body,
    );
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${validation.missing.join(", ")}`,
      });
    }

    // Validate email format
    if (!validateEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }

    const customer = await Customer.create({
      firstName,
      lastName,
      email,
      phone: phone || null,
      company: company || null,
      industry: industry || null,
      address: address || null,
      city: city || null,
      state: state || null,
      zipCode: zipCode || null,
      country: country || null,
      status: status || "prospect",
      notes: notes || null,
    });

    handleSuccess(res, customer, "Customer created successfully", 201);
  } catch (error) {
    handleError(res, error);
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid customer ID" });
    }

    const customer = await Customer.findByPk(id);

    if (!customer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });
    }

    // Validate email if being updated
    if (req.body.email && !validateEmail(req.body.email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }

    await customer.update(req.body);

    handleSuccess(res, customer, "Customer updated successfully");
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid customer ID" });
    }

    const customer = await Customer.findByPk(id);

    if (!customer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });
    }

    // Delete related records first (cascade delete workaround)
    await Deal.destroy({ where: { customerId: id } });
    await Note.destroy({ where: { customerId: id } });
    await Activity.destroy({ where: { customerId: id } });

    // Now delete the customer
    await customer.destroy();

    handleSuccess(res, { id }, "Customer deleted successfully");
  } catch (error) {
    handleError(res, error);
  }
};
