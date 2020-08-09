const express = require('express');
const router = express.Router()
const { editProfile, getProfileById } = require('../controllers/profile');
const { upload } = require('../middlewares/multer');

router
    .get('/:id', getProfileById)
    .put('/:id', upload.single('image'), editProfile)

module.exports = router;