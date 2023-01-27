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
  getRecordingComment,
  addComment,
} from '../controllers/recordController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getRecords).post( admin, createRecord)
router.route('/:id/reviews').post(protect, createRecordReview)
router.get('/top', getTopRecords)
router
  .route('/:id')
  .get(getRecordById)
  .delete(protect, admin, deleteRecord)
  .put(protect, admin, updateRecord)

router
  .route('/:id/comments')
    .get(getRecordingComment)
    .post(addComment);

export default router