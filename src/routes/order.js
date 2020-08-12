const express = require('express')
const router = express.Router()
const {
    getMyOrder,
    getDetailOrder,
    createOrder
} = require('../controllers/order')
const {
    verifyToken
} = require('../middlewares/auth')

router
    .get('/', verifyToken, getMyOrder)
    .get('/:order_id', verifyToken, getDetailOrder)
    .post('/', verifyToken, createOrder)

module.exports = router;