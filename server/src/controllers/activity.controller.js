import Activity from "../models/Activity.js";

export const getActivities = async (req, res) => {
  try {
    const filters = {};
    if (req.query.type) filters.type = req.query.type;

    const activities = await Activity.findAll({
      where: filters,
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({ success: true, data: activities });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getActivity = async (req, res) => {
  try {
    const activity = await Activity.findByPk(req.params.id);

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res.status(200).json({ success: true, data: activity });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createActivity = async (req, res) => {
  try {
    const { type, description } = req.body;

    if (!type || !description) {
      return res
        .status(400)
        .json({ message: "Type and description are required" });
    }

    const activity = await Activity.create({
      type,
      description,
    });

    res.status(201).json({ success: true, data: activity });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findByPk(req.params.id);

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    await activity.destroy();

    res.status(200).json({ success: true, message: "Activity deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
