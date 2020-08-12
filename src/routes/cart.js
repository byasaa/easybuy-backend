const express = require('express');
const router = express.Router()
const {
    getMyCartList,
    editItemCart,
    deleteItemCart,
    addItemCart
} = require('../controllers/cart')
const {
    verifyToken
} = require('../middlewares/auth');
const {} = require('../middlewares/validation');

router
    .get('/', verifyToken, getMyCartList)
    .post('/', verifyToken, addItemCart)
    .put('/:id', verifyToken, editItemCart)
    .delete('/:id', verifyToken, deleteItemCart)

module.exports = router;