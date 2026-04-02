import Lead from "../models/Lead.js";

export const getLeads = async (req, res) => {
  try {
    const leads = await Lead.findAll();
    res.status(200).json({ success: true, data: leads });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getLead = async (req, res) => {
  try {
    const lead = await Lead.findByPk(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.status(200).json({ success: true, data: lead });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createLead = async (req, res) => {
  try {
    const { name, email, phone, company, status, source, notes } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Please provide name and email" });
    }

    const lead = await Lead.create({
      name,
      email,
      phone,
      company,
      status: status || "new",
      source: source || "website",
      notes,
    });

    res.status(201).json({ success: true, data: lead });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByPk(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    await lead.update(req.body);

    res.status(200).json({ success: true, data: lead });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByPk(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    await lead.destroy();

    res.status(200).json({ success: true, message: "Lead deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
