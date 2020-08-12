const express = require('express')
const router = express.Router()
const { editProfile, getProfileById } = require('../controllers/profile')
const { upload } = require('../helpers/multer')
const redis = require('../middlewares/redis');

router
    .get('/:id', redis.cacheProfile, getProfileById)
    .put('/:id', upload.single('image'), editProfile)

module.exports = router;