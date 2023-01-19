const camelize = require('camelize');
const schema = require('./validations/validators');
const { saleModel, saleProductModel } = require('../models');

const addSaleProduct = async (salesProductsList) => { 
  const error = await schema.validateAddSaleProduct(salesProductsList);
  if (error.type) return error;
    
  const saleId = await saleModel.addNewSale();

  await Promise.all(
    salesProductsList.map(async ({ productId, quantity }) => {
      await saleProductModel.addNewProductSale({ saleId, productId, quantity });
    }),
  );

  const itemsList = await saleProductModel.findAllById(saleId);
  const itemsSold = itemsList.map((item) => camelize(item));

  const addedSale = {
    id: saleId,
    itemsSold: [...itemsSold],
  };

  return { type: null, message: addedSale };
};

module.exports = {
  addSaleProduct,
};