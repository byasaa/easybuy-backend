const express = require('express')
const router = express.Router()
const authRouter = require('./auth')
const productRouter = require('./products');
const profileRouter = require('./profile');
const addressRouter = require('./address');

router.use('/auth', authRouter)
router.use('/product', productRouter)
router.use('/profile', profileRouter)
router.use('/address', addressRouter)

module.exports = router
