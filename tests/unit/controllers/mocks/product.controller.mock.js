const updatedProduct = {
  id: 1,
  name: "Atualizado"
};

const addedProduct = {
  id: 1,
  name: "ProduX"
};

const saleToUpdate = [
  {
    "productId": 1,
    "quantity": 10
  },
  {
    "productId": 2,
    "quantity": 50
  }
];
// const validNameUpdate = 'Atualizado';
const saleUpdated = {
  "saleId": 1,
  "itemsUpdated": [
    {
      "productId": 1,
      "quantity":10
    },
    {
      "productId": 2,
      "quantity":50
    }
  ]
};

module.exports = {
  updatedProduct,
  addedProduct,
  saleToUpdate,
  saleUpdated,
}