const { productService } = require('../services');
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

const createProduct = async (req, res) => {
  const { name } = req.body;

  const { type, message } = await productService.createProduct(name);
  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(201).json(message);
};

const updateProductbyId = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const { type, message } = await productService.updateProductbyId(id, name);
  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

const deleteProductById = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await productService.deleteProductById(id);
  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(204).end();
};

const searchByName = async (req, res) => {
  const { q } = req.query;

  const { message } = await productService.searchByName(q);

  res.status(200).json(message);
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProductbyId,
  deleteProductById,
  searchByName,
};