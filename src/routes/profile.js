const express = require('express')
const router = express.Router()
const {
    editProfile,
    getProfileById
} = require('../controllers/profile')
const {
    upload
} = require('../helpers/multer')
const redis = require('../middlewares/redis');
const {
    verifyToken
} = require('../middlewares/auth');

router
    .get('/:id', verifyToken, redis.cacheProfile, getProfileById)
    .put('/:id', verifyToken, upload.single('image'), editProfile)

module.exports = router;