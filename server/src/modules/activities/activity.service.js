import Activity from '../../models/Activity.js'

export class ActivityService {
  static async getAll(filters = {}) {
    return await Activity.find(filters)
      .populate('lead', 'firstName lastName email')
      .populate('customer', 'firstName lastName email')
      .populate('deal', 'title')
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })
  }

  static async getById(id) {
    return await Activity.findById(id)
      .populate('lead', 'firstName lastName email')
      .populate('customer', 'firstName lastName email')
      .populate('deal', 'title')
      .populate('createdBy', 'name email')
  }

  static async create(activityData, userId) {
    const activity = new Activity({
      ...activityData,
      createdBy: userId,
    })
    await activity.save()
    await activity.populate('lead', 'firstName lastName email')
    await activity.populate('customer', 'firstName lastName email')
    await activity.populate('deal', 'title')
    await activity.populate('createdBy', 'name email')
    return activity
  }

  static async delete(id) {
    return await Activity.findByIdAndDelete(id)
  }
}
