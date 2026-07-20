const router = require('express').Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const { auth } = require('../middleware/auth')

const uploadDir = path.join(__dirname, '../uploads')
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1E6)}${ext}`)
  }
})

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (/^image\/(jpeg|jpg|png|gif|webp|svg\+xml)$/.test(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('只允许上传图片文件 (jpg/png/gif/webp)'))
    }
  }
})

router.post('/', auth, upload.single('file'), (req, res) => {
  if (!req.file) return res.json({ code: 400, message: '请选择文件' })
  res.json({ code: 200, data: { url: '/uploads/' + req.file.filename } })
})

// 多文件上传
router.post('/multi', auth, upload.array('files', 9), (req, res) => {
  if (!req.files?.length) return res.json({ code: 400, message: '请选择文件' })
  const urls = req.files.map(f => '/uploads/' + f.filename)
  res.json({ code: 200, data: { urls } })
})

module.exports = router