import multer from 'multer'
import path from 'path'

// multer config
const multerConfig = multer({
  storage: multer.diskStorage({
    destination: "../recordings",
    filename: (req, file, cb) => {
      const filename = req.body.title.toLowerCase().trim().replace(' ', '-').concat('-', Date.now(), ".webm");

      req.body = {
        ...req.body,
        url: "/recordings/".concat(filename)
      }

      cb(null, filename);
    }
  }),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname)
    if (ext !== '.webm') {
      cb(new Error('File type is not supported'), false)
      return
    }
    cb(null, true)
  },
})

export default multerConfig