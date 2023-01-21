const camelize = require('camelize');
const connection = require('./db/connection');

const listSaleWithDate = async () => {
  const columns = 'a.sale_id, s.date, a.product_id, a.quantity';
  const join = 'StoreManager.sales_products a INNER JOIN StoreManager.sales s ON s.id = a.sale_id';

  const [result] = await connection.execute(
    `SELECT ${columns} FROM ${join}`,
    );
    return camelize(result);
  };
  
const listSaleWithDateById = async (saleId) => {
  const columns = 's.date, a.product_id, a.quantity';
  const join = 'StoreManager.sales_products a INNER JOIN StoreManager.sales s ON s.id = a.sale_id';

  const [result] = await connection.execute(
    `SELECT ${columns} FROM ${join} WHERE sale_id = ?`,
    [saleId],
  );
  return camelize(result);
};

const addNewProductSale = async ({ saleId, productId, quantity }) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity],
  );

  return insertId;
};

const updateSale = async (saleId, { productId, quantity }) => {
  const sql = 'product_id = ?, quantity = ?';
  const [{ affectedRows }] = await connection.execute(
    `UPDATE StoreManager.sales_products SET ${sql} WHERE sale_id = ? AND product_id = ?`,
    [productId, quantity, saleId, productId],
  );
  return affectedRows;
};

const deleteFromSalesProducts = async (saleId) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM StoreManager.sales_products WHERE sale_id = ?',
    [saleId],
  );
  return affectedRows;
};

module.exports = {
  // findAllById,
  addNewProductSale,
  listSaleWithDate,
  listSaleWithDateById,
  deleteFromSalesProducts,
  updateSale,
};