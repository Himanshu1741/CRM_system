import { ActivityService } from "./activity.service.js";

export const getActivities = async (req, res, next) => {
  try {
    const filters = {};
    if (req.query.type) filters.type = req.query.type;
    if (req.query.lead) filters.lead = req.query.lead;
    if (req.query.customer) filters.customer = req.query.customer;
    if (req.query.deal) filters.deal = req.query.deal;

    const activities = await ActivityService.getAll(filters);
    res.status(200).json({ success: true, data: activities });
  } catch (error) {
    next(error);
  }
};

export const getActivity = async (req, res, next) => {
  try {
    const activity = await ActivityService.getById(req.params.id);
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }
    res.status(200).json({ success: true, data: activity });
  } catch (error) {
    next(error);
  }
};

export const createActivity = async (req, res, next) => {
  try {
    const { type, description, lead, customer, deal } = req.body;

    if (!type || !description) {
      return res
        .status(400)
        .json({ message: "Type and description are required" });
    }

    const activity = await ActivityService.create(
      { type, description, lead, customer, deal },
      req.user?.id,
    );
    res.status(201).json({ success: true, data: activity });
  } catch (error) {
    next(error);
  }
};

export const deleteActivity = async (req, res, next) => {
  try {
    const activity = await ActivityService.delete(req.params.id);
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }
    res.status(200).json({ success: true, message: "Activity deleted" });
  } catch (error) {
    next(error);
  }
};
