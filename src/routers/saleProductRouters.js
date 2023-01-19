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

router.put(
  '/:id',
  validateNewSaleProduct,
  saleProductController.updateSale,
);

router.delete(
  '/:id',
  saleProductController.deleteSale,
);

module.exports = router;