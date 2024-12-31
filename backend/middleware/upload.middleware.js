const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (['.jpeg', '.jpg', '.png'].includes(ext)) cb(null, true);
  else cb(new Error('Only images are allowed'), false);
};

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 }, 
  fileFilter,
});

module.exports = upload;
