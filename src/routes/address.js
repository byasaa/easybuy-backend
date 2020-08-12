const express = require('express');
const router = express.Router()
const {
    addNewAddress,
    editAddress,
    getAddressById
} = require('../controllers/address')
const {
    verifyToken
} = require('../middlewares/auth');
const {
    address
} = require('../middlewares/validation');

router
    .get('/:user_id', verifyToken, getAddressById)
    .post('/', verifyToken, address, addNewAddress)
    .put('/:id', verifyToken, address, editAddress)

module.exports = router;