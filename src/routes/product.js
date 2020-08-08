const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');

router.get('/', productController.getLatestProduct);
// router.get('/:id', productController.getSingleProduct);

module.exports = router;