const saleProducts = [
  { saleId: 1, productId: 1, quantity: 5 },
  { saleId: 1, productId: 2, quantity: 10 },
  { saleId: 2, productId: 1, quantity: 15 },
];

const saleProductsById = saleProducts.filter(({ saleId }) => saleId === 1)
  .map(({ productId, quantity }) => { productId, quantity });

const newSaleProduct = { saleId: 2, productId: 1, quantity: 15 };

module.exports = {
  saleProducts,
  newSaleProduct,
  saleProductsById,
};