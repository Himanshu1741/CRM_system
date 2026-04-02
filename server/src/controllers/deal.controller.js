import Customer from "../models/Customer.js";
import Deal from "../models/Deal.js";
import { handleError, handleSuccess } from "../utils/errorHandler.js";
import { validateRequired } from "../utils/validation.js";

const CUSTOMER_ATTRIBUTES = ["id", "firstName", "lastName", "email", "company"];

export const getDeals = async (req, res) => {
  try {
    const deals = await Deal.findAll({
      include: [{ model: Customer, attributes: CUSTOMER_ATTRIBUTES }],
    });

    handleSuccess(res, deals, "Deals retrieved successfully");
  } catch (error) {
    handleError(res, error);
  }
};

export const getDeal = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid deal ID" });
    }

    const deal = await Deal.findByPk(id, {
      include: [{ model: Customer, attributes: CUSTOMER_ATTRIBUTES }],
    });

    if (!deal) {
      return res
        .status(404)
        .json({ success: false, message: "Deal not found" });
    }

    handleSuccess(res, deal, "Deal retrieved successfully");
  } catch (error) {
    handleError(res, error);
  }
};

export const createDeal = async (req, res) => {
  try {
    const {
      title,
      description,
      customerId,
      amount,
      stage,
      probability,
      expectedCloseDate,
      notes,
    } = req.body;

    // Validate required fields
    const validation = validateRequired(
      ["title", "customerId", "amount"],
      req.body,
    );
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${validation.missing.join(", ")}`,
      });
    }

    // Validate customerId exists
    const customer = await Customer.findByPk(customerId);
    if (!customer) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid customerId" });
    }

    // Validate amount is a positive number
    if (isNaN(amount) || amount <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Amount must be a positive number" });
    }

    const deal = await Deal.create({
      title,
      description: description || null,
      customerId,
      amount,
      stage: stage || "prospect",
      probability: probability || 0,
      expectedCloseDate: expectedCloseDate || null,
      notes: notes || null,
      assignedTo: req.user?.id || null,
      createdBy: req.user?.id || null,
    });

    const dealWithCustomer = await Deal.findByPk(deal.id, {
      include: [{ model: Customer, attributes: CUSTOMER_ATTRIBUTES }],
    });

    handleSuccess(res, dealWithCustomer, "Deal created successfully", 201);
  } catch (error) {
    handleError(res, error);
  }
};

export const updateDeal = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid deal ID" });
    }

    const deal = await Deal.findByPk(id);

    if (!deal) {
      return res
        .status(404)
        .json({ success: false, message: "Deal not found" });
    }

    // Validate customerId if being updated
    if (req.body.customerId) {
      const customer = await Customer.findByPk(req.body.customerId);
      if (!customer) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid customerId" });
      }
    }

    // Validate amount if being updated
    if (req.body.amount && (isNaN(req.body.amount) || req.body.amount <= 0)) {
      return res
        .status(400)
        .json({ success: false, message: "Amount must be a positive number" });
    }

    await deal.update(req.body);

    const dealWithCustomer = await Deal.findByPk(deal.id, {
      include: [{ model: Customer, attributes: CUSTOMER_ATTRIBUTES }],
    });

    handleSuccess(res, dealWithCustomer, "Deal updated successfully");
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteDeal = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid deal ID" });
    }

    const deal = await Deal.findByPk(id);

    if (!deal) {
      return res
        .status(404)
        .json({ success: false, message: "Deal not found" });
    }

    // Delete related records first (cascade delete workaround)
    await Note.destroy({ where: { dealId: id } });
    await Activity.destroy({ where: { dealId: id } });

    // Now delete the deal
    await deal.destroy();

    handleSuccess(res, { id }, "Deal deleted successfully");
  } catch (error) {
    handleError(res, error);
  }
};
