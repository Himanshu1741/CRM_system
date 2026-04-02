// Module Exports
// This file centralizes all module routes for easy importing in app.js

import authRoutes from './auth/auth.routes.js'
import leadRoutes from './leads/lead.routes.js'
import customerRoutes from './customers/customer.routes.js'
import dealRoutes from './deals/deal.routes.js'
import taskRoutes from './tasks/task.routes.js'
import noteRoutes from './notes/note.routes.js'
import activityRoutes from './activities/activity.routes.js'
import reportRoutes from './reports/report.routes.js'

export default {
  auth: authRoutes,
  leads: leadRoutes,
  customers: customerRoutes,
  deals: dealRoutes,
  tasks: taskRoutes,
  notes: noteRoutes,
  activities: activityRoutes,
  reports: reportRoutes,
}
