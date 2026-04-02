import Customer from "../models/Customer.js";
import Deal from "../models/Deal.js";

export const getDeals = async (req, res) => {
  try {
    const deals = await Deal.findAll({
      include: [
        { model: Customer, attributes: ["id", "name", "email", "company"] },
      ],
    });

    res.status(200).json({ success: true, data: deals });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDeal = async (req, res) => {
  try {
    const deal = await Deal.findByPk(req.params.id, {
      include: [
        { model: Customer, attributes: ["id", "name", "email", "company"] },
      ],
    });

    if (!deal) {
      return res.status(404).json({ message: "Deal not found" });
    }

    res.status(200).json({ success: true, data: deal });
  } catch (error) {
    res.status(500).json({ error: error.message });
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

    if (!title || !customerId || !amount) {
      return res
        .status(400)
        .json({ message: "Please provide title, customerId, and amount" });
    }

    const deal = await Deal.create({
      title,
      description,
      customerId,
      amount,
      stage: stage || "prospect",
      probability: probability || 0,
      expectedCloseDate,
      notes,
    });

    const dealWithCustomer = await Deal.findByPk(deal.id, {
      include: [
        { model: Customer, attributes: ["id", "name", "email", "company"] },
      ],
    });

    res.status(201).json({ success: true, data: dealWithCustomer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateDeal = async (req, res) => {
  try {
    const deal = await Deal.findByPk(req.params.id);

    if (!deal) {
      return res.status(404).json({ message: "Deal not found" });
    }

    await deal.update(req.body);

    const dealWithCustomer = await Deal.findByPk(deal.id, {
      include: [
        { model: Customer, attributes: ["id", "name", "email", "company"] },
      ],
    });

    res.status(200).json({ success: true, data: dealWithCustomer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteDeal = async (req, res) => {
  try {
    const deal = await Deal.findByPk(req.params.id);

    if (!deal) {
      return res.status(404).json({ message: "Deal not found" });
    }

    await deal.destroy();

    res.status(200).json({ success: true, message: "Deal deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
