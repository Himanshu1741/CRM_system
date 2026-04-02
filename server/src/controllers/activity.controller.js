import Activity from "../models/Activity.js";
import { handleError, handleSuccess } from "../utils/errorHandler.js";
import { validateRequired } from "../utils/validation.js";

export const getActivities = async (req, res) => {
  try {
    const filters = {};
    if (req.query.type) filters.type = req.query.type;

    const activities = await Activity.findAll({
      where: filters,
      order: [["createdAt", "DESC"]],
    });

    handleSuccess(res, activities, "Activities retrieved successfully");
  } catch (error) {
    handleError(res, error);
  }
};

export const getActivity = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid activity ID" });
    }

    const activity = await Activity.findByPk(id);

    if (!activity) {
      return res
        .status(404)
        .json({ success: false, message: "Activity not found" });
    }

    handleSuccess(res, activity, "Activity retrieved successfully");
  } catch (error) {
    handleError(res, error);
  }
};

export const createActivity = async (req, res) => {
  try {
    const { type, description, leadId, customerId, dealId } = req.body;

    // Validate required fields
    const validation = validateRequired(["type", "description"], req.body);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${validation.missing.join(", ")}`,
      });
    }

    const activity = await Activity.create({
      type,
      description,
      leadId: leadId || null,
      customerId: customerId || null,
      dealId: dealId || null,
      createdBy: req.user?.id || null,
    });

    handleSuccess(res, activity, "Activity created successfully", 201);
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid activity ID" });
    }

    const activity = await Activity.findByPk(id);

    if (!activity) {
      return res
        .status(404)
        .json({ success: false, message: "Activity not found" });
    }

    await activity.destroy();

    handleSuccess(res, { id }, "Activity deleted successfully");
  } catch (error) {
    handleError(res, error);
  }
};
