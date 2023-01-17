const express = require('express');
const { productController } = require('../controllers');
const validateInputValueProduct = require('../middlewares/validateNewProduct');

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
  validateInputValueProduct,
  productController.createProduct,
);

router.put(
  '/:id',
  validateInputValueProduct,
  productController.updateProductbyId,
);

router.delete(
  '/:id',
  productController.deleteProductById,
);

module.exports = router;