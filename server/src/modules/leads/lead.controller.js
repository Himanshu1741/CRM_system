import { LeadService } from "./lead.service.js";

export const getLeads = async (req, res, next) => {
  try {
    const leads = await LeadService.getAll();
    res.status(200).json({ success: true, data: leads });
  } catch (error) {
    next(error);
  }
};

export const getLead = async (req, res, next) => {
  try {
    const lead = await LeadService.getById(req.params.id);
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

    const lead = await LeadService.create(
      { firstName, lastName, email, phone, company, status, source, notes },
      req.user?.id,
    );
    res.status(201).json({ success: true, data: lead });
  } catch (error) {
    next(error);
  }
};

export const updateLead = async (req, res, next) => {
  try {
    const lead = await LeadService.update(req.params.id, req.body);
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }
    res.status(200).json({ success: true, data: lead });
  } catch (error) {
    next(error);
  }
};

export const deleteLead = async (req, res, next) => {
  try {
    const lead = await LeadService.delete(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }
    res.status(200).json({ success: true, message: "Lead deleted" });
  } catch (error) {
    next(error);
  }
};
