import Activity from "../models/Activity.js";
import Lead from "../models/Lead.js";
import Note from "../models/Note.js";
import { handleError, handleSuccess } from "../utils/errorHandler.js";
import { validateEmail, validateRequired } from "../utils/validation.js";

export const getLeads = async (req, res) => {
  try {
    const leads = await Lead.findAll();
    handleSuccess(res, leads, "Leads retrieved successfully");
  } catch (error) {
    handleError(res, error);
  }
};

export const getLead = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid lead ID" });
    }

    const lead = await Lead.findByPk(id);

    if (!lead) {
      return res
        .status(404)
        .json({ success: false, message: "Lead not found" });
    }

    handleSuccess(res, lead, "Lead retrieved successfully");
  } catch (error) {
    handleError(res, error);
  }
};

export const createLead = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      status,
      source,
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

    const lead = await Lead.create({
      firstName,
      lastName,
      email,
      phone: phone || null,
      company: company || null,
      status: status || "new",
      source: source || "website",
      notes: notes || null,
    });

    handleSuccess(res, lead, "Lead created successfully", 201);
  } catch (error) {
    handleError(res, error);
  }
};

export const updateLead = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid lead ID" });
    }

    const lead = await Lead.findByPk(id);

    if (!lead) {
      return res
        .status(404)
        .json({ success: false, message: "Lead not found" });
    }

    // Validate email if being updated
    if (req.body.email && !validateEmail(req.body.email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }

    await lead.update(req.body);

    handleSuccess(res, lead, "Lead updated successfully");
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteLead = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid lead ID" });
    }

    const lead = await Lead.findByPk(id);

    if (!lead) {
      return res
        .status(404)
        .json({ success: false, message: "Lead not found" });
    }

    // Delete related records first (cascade delete workaround)
    await Note.destroy({ where: { leadId: id } });
    await Activity.destroy({ where: { leadId: id } });

    // Now delete the lead
    await lead.destroy();

    handleSuccess(res, { id }, "Lead deleted successfully");
  } catch (error) {
    handleError(res, error);
  }
};
