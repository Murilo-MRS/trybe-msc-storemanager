const { productModel } = require('../models');

const getProducts = async () => {
  const products = await productModel.findAll();
  return { type: null, message: products };
};

module.exports = {
  getProducts,
};