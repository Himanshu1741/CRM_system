import Customer from "../models/Customer.js";

export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.status(200).json({ success: true, data: customers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({ success: true, data: customer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createCustomer = async (req, res) => {
  try {
    const {
      name,
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

    if (!name || !email) {
      return res.status(400).json({ message: "Please provide name and email" });
    }

    const customer = await Customer.create({
      name,
      email,
      phone,
      company,
      industry,
      address,
      city,
      state,
      zipCode,
      country,
      status: status || "prospect",
      notes,
    });

    res.status(201).json({ success: true, data: customer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    await customer.update(req.body);

    res.status(200).json({ success: true, data: customer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    await customer.destroy();

    res.status(200).json({ success: true, message: "Customer deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
