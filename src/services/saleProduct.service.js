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

const deleteSale = async (saleId) => {
  const sale = await saleProductModel.listSaleWithDateById(saleId);
  if (sale.length === 0) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  await saleModel.deleteFromSales(saleId);
  await saleProductModel.deleteFromSalesProducts(saleId);

  return { type: null };
};

const updateSale = async (saleId, itemsToUpdate) => {
  const sale = await saleProductModel.listSaleWithDateById(saleId);
  if (sale.length === 0) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  const error = await schema.validateAddSaleProduct(itemsToUpdate);
  if (error.type) return error; 

  await Promise.all(
    itemsToUpdate.map(async ({ productId, quantity }) => {
      await saleProductModel.updateSale(saleId, { productId, quantity });
    }),
  );

  return { type: null, message: { saleId, itemsUpdated: itemsToUpdate } };
};

module.exports = {
  addSaleProduct,
  getAllSales,
  getAllSalesbyId,
  deleteSale,
  updateSale,
};