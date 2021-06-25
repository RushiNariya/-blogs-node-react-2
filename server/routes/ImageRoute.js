const express = require('express');
var multer = require('multer');

const {
  authenticateUser,
  ImageUpload,
} = require('../controllers/ImageController');

const router = express.Router({
  caseSensitive: true,
});

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images');
  },
  filename: (req, file, cb) => {
    var filetype = '';
    if (file.mimetype === 'image/gif') {
      filetype = 'gif';
    }
    if (file.mimetype === 'image/png') {
      filetype = 'png';
    }
    if (file.mimetype === 'image/jpeg') {
      filetype = 'jpg';
    }
    cb(null, 'image-' + Date.now() + '.' + filetype);
  },
});
var upload = multer({ storage: storage });

router.use(authenticateUser);

router.post("/upload", upload.single('file'), ImageUpload );

module.exports = router;