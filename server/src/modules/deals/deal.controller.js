import { DealService } from "./deal.service.js";

export const getDeals = async (req, res, next) => {
  try {
    const deals = await DealService.getAll();
    res.status(200).json({ success: true, data: deals });
  } catch (error) {
    next(error);
  }
};

export const getDeal = async (req, res, next) => {
  try {
    const deal = await DealService.getById(req.params.id);
    if (!deal) {
      return res.status(404).json({ message: "Deal not found" });
    }
    res.status(200).json({ success: true, data: deal });
  } catch (error) {
    next(error);
  }
};

export const createDeal = async (req, res, next) => {
  try {
    const {
      title,
      description,
      customer,
      amount,
      stage,
      probability,
      expectedCloseDate,
      notes,
    } = req.body;

    if (!title || !customer || !amount) {
      return res
        .status(400)
        .json({ message: "Please provide required fields" });
    }

    const deal = await DealService.create(
      {
        title,
        description,
        customer,
        amount,
        stage,
        probability,
        expectedCloseDate,
        notes,
        assignedTo: req.user?.id,
      },
      req.user?.id,
    );
    res.status(201).json({ success: true, data: deal });
  } catch (error) {
    next(error);
  }
};

export const updateDeal = async (req, res, next) => {
  try {
    const deal = await DealService.update(req.params.id, req.body);
    if (!deal) {
      return res.status(404).json({ message: "Deal not found" });
    }
    res.status(200).json({ success: true, data: deal });
  } catch (error) {
    next(error);
  }
};

export const deleteDeal = async (req, res, next) => {
  try {
    const deal = await DealService.delete(req.params.id);
    if (!deal) {
      return res.status(404).json({ message: "Deal not found" });
    }
    res.status(200).json({ success: true, message: "Deal deleted" });
  } catch (error) {
    next(error);
  }
};
