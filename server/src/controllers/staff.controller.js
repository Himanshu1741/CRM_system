import Staff from "../models/Staff.js";
import { handleError, handleSuccess } from "../utils/errorHandler.js";
import { validateRequired } from "../utils/validation.js";

export const getStaff = async (req, res) => {
  try {
    const staff = await Staff.findAll();
    handleSuccess(res, staff, "Staff retrieved successfully");
  } catch (error) {
    handleError(res, error);
  }
};

export const getStaffMember = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid staff ID" });
    }

    const member = await Staff.findByPk(id);

    if (!member) {
      return res
        .status(404)
        .json({ success: false, message: "Staff member not found" });
    }

    handleSuccess(res, member, "Staff member retrieved successfully");
  } catch (error) {
    handleError(res, error);
  }
};

export const createStaff = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      whatsapp,
      position,
      department,
      joinDate,
      status,
      salary,
      address,
      city,
      state,
      zipCode,
      country,
      performanceRating,
      notes,
    } = req.body;

    const validation = validateRequired(
      ["firstName", "lastName", "email", "phone", "position"],
      req.body,
    );
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${validation.missing.join(", ")}`,
      });
    }

    const staff = await Staff.create({
      firstName,
      lastName,
      email,
      phone,
      whatsapp: whatsapp || null,
      position,
      department: department || null,
      joinDate: joinDate || null,
      status: status || "active",
      salary: salary || null,
      address: address || null,
      city: city || null,
      state: state || null,
      zipCode: zipCode || null,
      country: country || null,
      performanceRating: performanceRating || null,
      notes: notes || null,
    });

    handleSuccess(res, staff, "Staff member created successfully", 201);
  } catch (error) {
    handleError(res, error);
  }
};

export const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid staff ID" });
    }

    const staff = await Staff.findByPk(id);

    if (!staff) {
      return res
        .status(404)
        .json({ success: false, message: "Staff member not found" });
    }

    await staff.update(req.body);

    handleSuccess(res, staff, "Staff member updated successfully");
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid staff ID" });
    }

    const staff = await Staff.findByPk(id);

    if (!staff) {
      return res
        .status(404)
        .json({ success: false, message: "Staff member not found" });
    }

    await staff.destroy();

    handleSuccess(res, null, "Staff member deleted successfully");
  } catch (error) {
    handleError(res, error);
  }
};
