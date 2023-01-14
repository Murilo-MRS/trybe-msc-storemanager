const productService = require('../services/product.service');

const getProducts = async (_req, res) => {
  const { message } = await productService.getProducts();

  res.status(200).json(message);
};

module.exports = {
  getProducts,
};