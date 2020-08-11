const express = require('express');
const router = express.Router();
const { editProduct, deleteProduct, addProduct, getProduct, getSingleProduct } = require('../controllers/products');
const { product } = require('../middlewares/validation')
const { upload } = require('../helpers/multer');
const redis = require('../middlewares/redis')

router
    .get('/', getProduct)
    .get('/:id', redis.cacheProductDetail, getSingleProduct)
    .post('/', upload.single('image'), product, addProduct)
    .put('/:id', editProduct)
    .delete('/:id', deleteProduct)

module.exports = router;