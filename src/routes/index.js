const express = require('express')
const router = express.Router()
const authRouter = require('./auth')
const productRouter = require('./product')
const profileRouter = require('./profile')
const addressRouter = require('./address')
const cartRouter = require('./cart')
const orderRouter = require('./order')

router.use('/auth', authRouter)
router.use('/product', productRouter)
router.use('/profile', profileRouter)
router.use('/address', addressRouter)
router.use('/cart', cartRouter)
router.use('/order', orderRouter)

module.exports = router