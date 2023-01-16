const express = require('express');
const { productController } = require('../controllers');
const validateNewProduct = require('../middlewares/validateNewProduct');

const router = express.Router();

router.get(
  '/',
  productController.getProducts,
);

router.get(
  '/:id',
  productController.getProductById,
);

router.post(
  '/',
  validateNewProduct,
  productController.createProduct,
);

module.exports = router;