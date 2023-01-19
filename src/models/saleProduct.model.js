const connection = require('./db/connection');

// const findAll = async () => {
//   const [result] = await connection.execute(
//     'SELECT * FROM products',
//   );
//   return result;
// };

const findAllById = async (saleId) => {
  const [result] = await connection.execute(
    'SELECT product_id, quantity FROM StoreManager.sales_products WHERE sale_id = ?',
    [saleId],
  );
  
  return result;
};

const addNewProductSale = async ({ saleId, productId, quantity }) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity],
  );

  return insertId;
};

// const updateById = async (productId, dataToUpdate) => {
//   const formattedColumns = Object.keys(dataToUpdate)
//     .map((key) => `${key} = ?`)
//     .join(', ');

//   return connection.execute(
//     `UPDATE products SET ${formattedColumns} WHERE id = ?`,
//     [...Object.values(dataToUpdate), productId],
//   );
// };

// const deleteById = async (productId) => {
//   const [{ affectedRows }] = await connection.execute(
//     'DELETE FROM products WHERE id = ?',
//     [productId],
//   );
//   return affectedRows;
// };

// const findByName = async (name) => {
//   const [result] = await connection.execute(
//     `SELECT * FROM products WHERE name LIKE '%${name}%'`,
//   );
  
//   return result; 
// };

module.exports = {
  findAllById,
  addNewProductSale,
};