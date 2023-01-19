const saleProducts = [
  { saleId: 1, productId: 1, quantity: 1 },
  { saleId: 1, productId: 2, quantity: 5 },
];
const productSold = [
  {
    productId: 1,
    quantity: 1
  },
  {
    productId: 2,
    quantity: 5
  }
];

const saleProductsService = {
  id: 3,
  itemsSold: [
    {
      productId: 1,
      quantity: 1
    },
    {
      productId: 2,
      quantity: 5
    }
  ]
};

productList = [
  {productId: 1},
  {productId: 2},
];

const saleProductsById = saleProducts.map(({ productId, quantity }) => { productId, quantity });

const newSaleProduct = { saleId: 2, productId: 1, quantity: 15 };

module.exports = {
  saleProducts,
  newSaleProduct,
  saleProductsById,
  productList,
  productSold,
  saleProductsService,
};