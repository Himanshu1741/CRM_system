import Deal from "../models/Deal.js";

export const getDeals = async (req, res, next) => {
  try {
    const deals = await Deal.find()
      .populate("customer", "firstName lastName email company")
      .populate("assignedTo", "name email");

    res.status(200).json({ success: true, data: deals });
  } catch (error) {
    next(error);
  }
};

export const getDeal = async (req, res, next) => {
  try {
    const deal = await Deal.findById(req.params.id)
      .populate("customer", "firstName lastName email company")
      .populate("assignedTo", "name email");

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

    const deal = new Deal({
      title,
      description,
      customer,
      amount,
      stage,
      probability,
      expectedCloseDate,
      notes,
      assignedTo: req.user?.id,
      createdBy: req.user?.id,
    });

    await deal.save();
    await deal.populate("customer", "firstName lastName email company");
    await deal.populate("assignedTo", "name email");

    res.status(201).json({ success: true, data: deal });
  } catch (error) {
    next(error);
  }
};

export const updateDeal = async (req, res, next) => {
  try {
    let deal = await Deal.findById(req.params.id);

    if (!deal) {
      return res.status(404).json({ message: "Deal not found" });
    }

    deal = Object.assign(deal, req.body);
    await deal.save();
    await deal.populate("customer", "firstName lastName email company");
    await deal.populate("assignedTo", "name email");

    res.status(200).json({ success: true, data: deal });
  } catch (error) {
    next(error);
  }
};

export const deleteDeal = async (req, res, next) => {
  try {
    const deal = await Deal.findByIdAndDelete(req.params.id);

    if (!deal) {
      return res.status(404).json({ message: "Deal not found" });
    }

    res.status(200).json({ success: true, message: "Deal deleted" });
  } catch (error) {
    next(error);
  }
};
