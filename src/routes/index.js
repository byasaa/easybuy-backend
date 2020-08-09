const express = require('express')
const router = express.Router()
const authRouter = require('./auth')
const productRouter = require('./product');

router.use('/auth', authRouter)
router.use('/product', productRouter)

module.exports = router
