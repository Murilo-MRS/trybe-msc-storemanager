const express = require('express');
const { saleProductController } = require('../controllers');
const validateNewSaleProduct = require('../middlewares/validateNewSaleProduct');
// const validateInputValueForSale = require('../middlewares/validateInputValueForSale');

const router = express.Router();

router.get(
  '/',
  saleProductController.getAllSales,
);

router.get(
  '/:id',
  saleProductController.getAllSalesbyId,
);

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