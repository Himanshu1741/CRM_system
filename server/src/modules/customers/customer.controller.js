import { CustomerService } from "./customer.service.js";

export const getCustomers = async (req, res, next) => {
  try {
    const customers = await CustomerService.getAll();
    res.status(200).json({ success: true, data: customers });
  } catch (error) {
    next(error);
  }
};

export const getCustomer = async (req, res, next) => {
  try {
    const customer = await CustomerService.getById(req.params.id);
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

    const customer = await CustomerService.create(
      {
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
      },
      req.user?.id,
    );
    res.status(201).json({ success: true, data: customer });
  } catch (error) {
    next(error);
  }
};

export const updateCustomer = async (req, res, next) => {
  try {
    const customer = await CustomerService.update(req.params.id, req.body);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json({ success: true, data: customer });
  } catch (error) {
    next(error);
  }
};

export const deleteCustomer = async (req, res, next) => {
  try {
    const customer = await CustomerService.delete(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json({ success: true, message: "Customer deleted" });
  } catch (error) {
    next(error);
  }
};
