import express from 'express'
import {
  getReports,
  getSalesPipelineReport,
  getActivitySummaryReport,
  getLeadConversionReport,
  getTeamPerformanceReport,
} from './report.controller.js'
import { protect } from '../../middleware/auth.js'

const router = express.Router()

router.get('/', protect, getReports)
router.get('/sales-pipeline', protect, getSalesPipelineReport)
router.get('/activity-summary', protect, getActivitySummaryReport)
router.get('/lead-conversion', protect, getLeadConversionReport)
router.get('/team-performance', protect, getTeamPerformanceReport)

export default router
