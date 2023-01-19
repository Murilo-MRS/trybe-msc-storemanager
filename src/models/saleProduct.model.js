const camelize = require('camelize');
const connection = require('./db/connection');

const listSaleWithDate = async () => {
  const columns = 'sf.sale_id, s.date, sf.product_id, sf.quantity';
  const join = 'sales_products sf INNER JOIN sales s ON s.id = sf.sale_id';

  const [result] = await connection.execute(
    `SELECT ${columns} FROM ${join}`,
    );
    return camelize(result);
  };
  
const listSaleWithDateById = async (saleId) => {
  const columns = 's.date, sf.product_id, sf.quantity';
  const join = 'sales_products sf INNER JOIN sales s ON s.id = sf.sale_id';

  const [result] = await connection.execute(
    `SELECT ${columns} FROM ${join} WHERE sale_id = ?`,
    [saleId],
  );
  return camelize(result);
};

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
  listSaleWithDate,
  listSaleWithDateById,
};