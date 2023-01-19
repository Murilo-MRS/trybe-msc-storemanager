const { saleProductService } = require('../services');
const errorMap = require('../utils/errorMap');

const addSaleProduct = async (req, res) => {
  const salesProductsList = req.body;
  const { type, message } = await saleProductService.addSaleProduct(salesProductsList);

  if (type) return res.status(errorMap.mapError(type)).json({ message });
  
  res.status(201).json(message);
};

const getAllSales = async (_req, res) => {
  const { message } = await saleProductService.getAllSales();
  res.status(200).json(message);
};

const getAllSalesbyId = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await saleProductService.getAllSalesbyId(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

module.exports = {
  addSaleProduct,
  getAllSales,
  getAllSalesbyId,
};
