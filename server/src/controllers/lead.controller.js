import Lead from "../models/Lead.js";

export const getLeads = async (req, res, next) => {
  try {
    const leads = await Lead.find().populate("assignedTo", "name email");
    res.status(200).json({ success: true, data: leads });
  } catch (error) {
    next(error);
  }
};

export const getLead = async (req, res, next) => {
  try {
    const lead = await Lead.findById(req.params.id).populate(
      "assignedTo",
      "name email",
    );

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.status(200).json({ success: true, data: lead });
  } catch (error) {
    next(error);
  }
};

export const createLead = async (req, res, next) => {
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

    if (!firstName || !lastName || !email) {
      return res
        .status(400)
        .json({ message: "Please provide required fields" });
    }

    const lead = new Lead({
      firstName,
      lastName,
      email,
      phone,
      company,
      status,
      source,
      notes,
      createdBy: req.user?.id,
    });

    await lead.save();
    await lead.populate("assignedTo", "name email");

    res.status(201).json({ success: true, data: lead });
  } catch (error) {
    next(error);
  }
};

export const updateLead = async (req, res, next) => {
  try {
    let lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    lead = Object.assign(lead, req.body);
    await lead.save();
    await lead.populate("assignedTo", "name email");

    res.status(200).json({ success: true, data: lead });
  } catch (error) {
    next(error);
  }
};

export const deleteLead = async (req, res, next) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.status(200).json({ success: true, message: "Lead deleted" });
  } catch (error) {
    next(error);
  }
};
