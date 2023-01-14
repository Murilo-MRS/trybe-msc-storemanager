const productService = require('../services/product.service');
const errorMap = require('../utils/errorMap');

const getProducts = async (_req, res) => {
  const { message } = await productService.getProducts();

  res.status(200).json(message);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  
  const { type, message } = await productService.getProductById(id);
  
  if (type) return res.status(errorMap.mapError(type)).json({ message });
    
  res.status(200).json(message);
};

module.exports = {
  getProducts,
  getProductById,
};