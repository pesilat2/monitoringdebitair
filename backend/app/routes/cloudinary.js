const express = require('express');

const { upload, remove } = require('../controller/cloudinary');
const { authCheck } = require('../middleware/authCheck');

const router = express.Router();

router.post('/upload/images', upload);
router.post('/removeimages', authCheck, remove);
module.exports = router;
