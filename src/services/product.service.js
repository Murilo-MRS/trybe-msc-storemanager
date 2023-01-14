const { productModel } = require('../models');
const schema = require('./validations/validators');

const getProducts = async () => {
  const products = await productModel.findAll();
  return { type: null, message: products };
};

const getProductById = async (id) => {
  const error = schema.validateId(id);
  if (error.type) return error;
  
  const product = await productModel.findById(id);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  
  return { type: null, message: product };
};

module.exports = {
  getProducts,
  getProductById,
};