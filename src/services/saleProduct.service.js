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

  const itemsSold = await saleProductModel.findAllById(saleId);

  const addedSale = {
    id: saleId,
    itemsSold,
  };

  return { type: null, message: addedSale };
};

module.exports = {
  addSaleProduct,
};