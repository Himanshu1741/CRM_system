import Customer from "../models/Customer.js";

export const getCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.find().populate(
      "assignedTo",
      "name email",
    );
    res.status(200).json({ success: true, data: customers });
  } catch (error) {
    next(error);
  }
};

export const getCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.id).populate(
      "assignedTo",
      "name email",
    );

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({ success: true, data: customer });
  } catch (error) {
    next(error);
  }
};

export const createCustomer = async (req, res, next) => {
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

    if (!firstName || !lastName || !email) {
      return res
        .status(400)
        .json({ message: "Please provide required fields" });
    }

    const customer = new Customer({
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
      createdBy: req.user?.id,
    });

    await customer.save();
    await customer.populate("assignedTo", "name email");

    res.status(201).json({ success: true, data: customer });
  } catch (error) {
    next(error);
  }
};

export const updateCustomer = async (req, res, next) => {
  try {
    let customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    customer = Object.assign(customer, req.body);
    await customer.save();
    await customer.populate("assignedTo", "name email");

    res.status(200).json({ success: true, data: customer });
  } catch (error) {
    next(error);
  }
};

export const deleteCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({ success: true, message: "Customer deleted" });
  } catch (error) {
    next(error);
  }
};
