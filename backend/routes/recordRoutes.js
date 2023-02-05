import multerConfig from "../config/multer.js"
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
import upload from "../config/multer.js";

router.route('/dashboard').get(getRecords).post( protect,admin, createRecord)
router.route('/').get(getRecords).post(protect, upload.single('recording'), createRecord)
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