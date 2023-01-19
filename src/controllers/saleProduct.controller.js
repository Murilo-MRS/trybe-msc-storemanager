const { saleProductService } = require('../services');
const errorMap = require('../utils/errorMap');

const addSaleProduct = async (req, res) => {
  const salesProductsList = req.body;
  const { type, message } = await saleProductService.addSaleProduct(salesProductsList);

  if (type) return res.status(errorMap.mapError(type)).json({ message });
  
  res.status(201).json(message);
};

module.exports = {
  addSaleProduct,
};
