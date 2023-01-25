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

import upload from "../config/multer";

router.route('/').get(getRecords).post(protect, upload.single('recording'), createRecord)
router.route('/:id/reviews').post(protect, createRecordReview)
router.get('/top', getTopRecords)
router
  .route('/:id')
  .get(getRecordById)
  .delete(protect, admin, deleteRecord)
  .put(protect, admin, updateRecord)

export default router