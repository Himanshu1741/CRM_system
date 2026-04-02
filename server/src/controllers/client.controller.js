import Client from "../models/Client.js";
import { handleError, handleSuccess } from "../utils/errorHandler.js";
import { validateRequired } from "../utils/validation.js";

export const getClients = async (req, res) => {
  try {
    const clients = await Client.findAll();
    handleSuccess(res, clients, "Clients retrieved successfully");
  } catch (error) {
    handleError(res, error);
  }
};

export const getClient = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid client ID" });
    }

    const client = await Client.findByPk(id);

    if (!client) {
      return res
        .status(404)
        .json({ success: false, message: "Client not found" });
    }

    handleSuccess(res, client, "Client retrieved successfully");
  } catch (error) {
    handleError(res, error);
  }
};

export const createClient = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      whatsapp,
      company,
      industry,
      address,
      city,
      state,
      zipCode,
      country,
      status,
      source,
      notes,
    } = req.body;

    const validation = validateRequired(["name", "email", "phone"], req.body);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${validation.missing.join(", ")}`,
      });
    }

    const client = await Client.create({
      name,
      email,
      phone,
      whatsapp: whatsapp || null,
      company: company || null,
      industry: industry || null,
      address: address || null,
      city: city || null,
      state: state || null,
      zipCode: zipCode || null,
      country: country || null,
      status: status || "prospect",
      source: source || null,
      notes: notes || null,
      createdBy: req.user?.id || null,
    });

    handleSuccess(res, client, "Client created successfully", 201);
  } catch (error) {
    handleError(res, error);
  }
};

export const updateClient = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid client ID" });
    }

    const client = await Client.findByPk(id);

    if (!client) {
      return res
        .status(404)
        .json({ success: false, message: "Client not found" });
    }

    await client.update(req.body);

    handleSuccess(res, client, "Client updated successfully");
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid client ID" });
    }

    const client = await Client.findByPk(id);

    if (!client) {
      return res
        .status(404)
        .json({ success: false, message: "Client not found" });
    }

    await client.destroy();

    handleSuccess(res, null, "Client deleted successfully");
  } catch (error) {
    handleError(res, error);
  }
};
