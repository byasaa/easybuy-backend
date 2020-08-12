const express = require('express');
const router = express.Router();
const {
    editProduct,
    deleteProduct,
    addProduct,
    getProduct,
    getSingleProduct
} = require('../controllers/product');
const {
    product
} = require('../middlewares/validation')
const {
    upload
} = require('../helpers/multer');
const redis = require('../middlewares/redis');
const {
    verifyToken
} = require('../middlewares/auth');

router
    .get('/', verifyToken, getProduct)
    .get('/:id', verifyToken, redis.cacheProductDetail, getSingleProduct)
    .post('/', verifyToken, upload.single('image'), product, addProduct)
    .put('/:id', verifyToken, upload.single('image'), editProduct)
    .delete('/:id', verifyToken, deleteProduct)

module.exports = router;