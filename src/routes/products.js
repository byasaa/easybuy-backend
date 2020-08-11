const express = require('express');
const router = express.Router();
const {editProduct, deleteProduct, addProduct, getProduct} = require('../controllers/products');
const {product} = require('../middlewares/validation')
const { upload } = require('../helpers/multer');

router
    .get('/', getProduct)
    .post('/', upload.single('image'), product, addProduct)
    .put('/:id', editProduct)
    .delete('/:id', deleteProduct)

module.exports = router;