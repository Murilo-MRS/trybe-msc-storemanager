const express = require('express');
const { saleProductController } = require('../controllers');
const validateNewSaleProduct = require('../middlewares/validateNewSaleProduct');
// const validateInputValueForSale = require('../middlewares/validateInputValueForSale');

const router = express.Router();

// router.get(
//   '/',
//   saleController.getSales,
// );

// router.get(
//   '/:id',
//   saleController.getSalesById,
// );

router.post(
  '/',
  validateNewSaleProduct,
  saleProductController.addSaleProduct,
);

// router.put(
//   '/:id',
//   // validateInputValueProduct,
//   saleController.updateSaleById,
// );

// router.delete(
//   '/:id',
//   saleController.deleteSaleById,
// );

module.exports = router;