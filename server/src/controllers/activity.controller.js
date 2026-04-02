import Activity from "../models/Activity.js";

export const getActivities = async (req, res, next) => {
  try {
    const filters = {};
    if (req.query.type) filters.type = req.query.type;
    if (req.query.lead) filters.lead = req.query.lead;
    if (req.query.customer) filters.customer = req.query.customer;
    if (req.query.deal) filters.deal = req.query.deal;

    const activities = await Activity.find(filters)
      .populate("lead", "firstName lastName email")
      .populate("customer", "firstName lastName email")
      .populate("deal", "title")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: activities });
  } catch (error) {
    next(error);
  }
};

export const getActivity = async (req, res, next) => {
  try {
    const activity = await Activity.findById(req.params.id)
      .populate("lead", "firstName lastName email")
      .populate("customer", "firstName lastName email")
      .populate("deal", "title")
      .populate("createdBy", "name email");

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

    const activity = new Activity({
      type,
      description,
      lead,
      customer,
      deal,
      createdBy: req.user?.id,
    });

    await activity.save();
    await activity.populate("lead", "firstName lastName email");
    await activity.populate("customer", "firstName lastName email");
    await activity.populate("deal", "title");
    await activity.populate("createdBy", "name email");

    res.status(201).json({ success: true, data: activity });
  } catch (error) {
    next(error);
  }
};

export const deleteActivity = async (req, res, next) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res.status(200).json({ success: true, message: "Activity deleted" });
  } catch (error) {
    next(error);
  }
};
