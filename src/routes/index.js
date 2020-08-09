const express = require('express')
const router = express.Router()
const authRouter = require('./auth')
const productRouter = require('./product');
const profileRouter = require('./profile');

router.use('/auth', authRouter)
router.use('/product', productRouter)
router.use('/profile', profileRouter)

module.exports = router
