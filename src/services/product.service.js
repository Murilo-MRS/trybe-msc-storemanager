const { productModel } = require('../models');
const schema = require('./validations/validators');

const getProducts = async () => {
  const products = await productModel.findAll();
  return { type: null, message: products };
};

const getProductById = async (productId) => {
  const error = await schema.validateId(productId);
  if (error.type) return error;
  
  const product = await productModel.findById(productId);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  
  return { type: null, message: product };
};

const createProduct = async (name) => {
  const error = await schema.validateAddNewProduct(name);
  if (error.type) return error;

  const newProductId = await productModel.insert({ name });
  const newProduct = await productModel.findById(newProductId);

  return { type: null, message: newProduct };
};

const updateProductbyId = async (productId, name) => {
  let error = await schema.validateId(productId);
  if (error.type) return error;
  
  const product = await productModel.findById(productId);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  
  error = await schema.validateAddNewProduct(name);
  if (error.type) return error;

  await productModel.updateById(productId, { name });
  
  const result = await productModel.findById(productId);

  return { type: null, message: result };
};

const deleteProductById = async (productId) => {
  const error = await schema.validateId(productId);
  if (error.type) return error;

  const product = await productModel.findById(productId);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  await productModel.deleteById(productId);

  return { type: null };
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProductbyId,
  deleteProductById,
};