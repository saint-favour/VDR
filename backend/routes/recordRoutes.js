import { Router } from 'express'
const router = Router()
import {
  getRecords,
  getRecordById,
  deleteRecord,
  createRecord,
  updateRecord,
  createRecordReview,
  getTopRecords,
} from '../controllers/recordController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getRecords).post(protect, admin, createRecord)
router.route('/:id/reviews').post(protect, createRecordReview)
router.get('/top', getTopRecords)
router
  .route('/:id')
  .get(getRecordById)
  .delete(protect, admin, deleteRecord)
  .put(protect, admin, updateRecord)

export default router