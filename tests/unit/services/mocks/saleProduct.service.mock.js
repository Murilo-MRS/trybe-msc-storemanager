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

const allSaleProducts = [
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:29.000Z",
    "productId": 1,
    "quantity": 2
  },
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:54.000Z",
    "productId": 2,
    "quantity": 2
  }
];

const saleProductsById = [
  {
    date: '2021-09-09T04:54:29.000Z',
    productId: 1,
    quantity: 2
  },
  {
    date: '2021-09-09T04:54:54.000Z',
    productId: 2,
    quantity: 2
  }
];

const newSaleProduct = { saleId: 2, productId: 1, quantity: 15 };

module.exports = {
  saleProducts,
  newSaleProduct,
  allSaleProducts,
  saleProductsById,
  productList,
  productSold,
  saleProductsService,
};