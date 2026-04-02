import Communication from "../models/Communication.js";
import { handleError, handleSuccess } from "../utils/errorHandler.js";
import { validateRequired } from "../utils/validation.js";

export const getCommunications = async (req, res) => {
  try {
    const communications = await Communication.findAll({
      order: [["timestamp", "DESC"]],
    });
    handleSuccess(res, communications, "Communications retrieved successfully");
  } catch (error) {
    handleError(res, error);
  }
};

export const getCommunication = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid communication ID" });
    }

    const communication = await Communication.findByPk(id);

    if (!communication) {
      return res
        .status(404)
        .json({ success: false, message: "Communication not found" });
    }

    handleSuccess(res, communication, "Communication retrieved successfully");
  } catch (error) {
    handleError(res, error);
  }
};

export const createCommunication = async (req, res) => {
  try {
    const {
      type,
      direction,
      clientId,
      staffId,
      leadId,
      dealId,
      contactNumber,
      duration,
      status,
      subject,
      description,
      notes,
      followUpDate,
    } = req.body;

    const validation = validateRequired(
      ["type", "direction", "staffId"],
      req.body,
    );
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${validation.missing.join(", ")}`,
      });
    }

    const communication = await Communication.create({
      type,
      direction,
      clientId: clientId || null,
      staffId,
      leadId: leadId || null,
      dealId: dealId || null,
      contactNumber: contactNumber || null,
      duration: duration || null,
      status: status || "completed",
      subject: subject || null,
      description: description || null,
      notes: notes || null,
      followUpDate: followUpDate || null,
    });

    handleSuccess(res, communication, "Communication logged successfully", 201);
  } catch (error) {
    handleError(res, error);
  }
};

export const updateCommunication = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid communication ID" });
    }

    const communication = await Communication.findByPk(id);

    if (!communication) {
      return res
        .status(404)
        .json({ success: false, message: "Communication not found" });
    }

    await communication.update(req.body);

    handleSuccess(res, communication, "Communication updated successfully");
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteCommunication = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid communication ID" });
    }

    const communication = await Communication.findByPk(id);

    if (!communication) {
      return res
        .status(404)
        .json({ success: false, message: "Communication not found" });
    }

    await communication.destroy();

    handleSuccess(res, null, "Communication deleted successfully");
  } catch (error) {
    handleError(res, error);
  }
};
