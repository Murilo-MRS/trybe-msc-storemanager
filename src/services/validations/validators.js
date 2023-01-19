const { productModel } = require('../../models');
const { idSchema, addProductSchema, addListSoldProductSchema } = require('./schema');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };
  
  return { type: null, message: '' };
};

const validateAddNewProduct = (name) => {
  const { error } = addProductSchema.validate({ name });
  if (error) return { type: 'INVALID_VALUE', message: error.message };
  
  return { type: null, message: '' };
};

const validateAddSaleProduct = async (productSoldList) => {
  const { error } = await addListSoldProductSchema.validate(productSoldList);
  if (error) return { type: 'INVALID_VALUE', message: error.message };

  const products = await Promise.all(
    productSoldList.map(async ({ productId }) => productModel.findById(productId)),
  );

  const someProductMissing = products.some((product) => product === undefined);
  if (someProductMissing) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateAddNewProduct,
  validateAddSaleProduct,
};