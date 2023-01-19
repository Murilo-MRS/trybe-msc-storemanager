// const camelize = require('camelize');
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

  // const itemsList = await saleProductModel.findAllById(saleId);
  // const itemsSold = itemsList.map((item) => camelize(item));

  const addedSale = {
    id: saleId,
    itemsSold: salesProductsList,
  };

  return { type: null, message: addedSale };
};

const getAllSales = async () => {
  const allSales = await saleProductModel.listSaleWithDate();
  return { type: null, message: allSales };
}; 

const getAllSalesbyId = async (saleId) => { 
  const sale = await saleProductModel.listSaleWithDateById(saleId);
  if (sale.length === 0) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  return { type: null, message: sale };
}; 

module.exports = {
  addSaleProduct,
  getAllSales,
  getAllSalesbyId,
};