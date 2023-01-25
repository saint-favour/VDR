import { Router } from 'express'
const router = Router()
import asyncHandler from 'express-async-handler'
import multerConfig from '../config/multer.js'

//
router.post('/', multerConfig.single('recording'), asyncHandler(async(req, res) => {

  res.send(result.secure_url)
  
}))

export default router