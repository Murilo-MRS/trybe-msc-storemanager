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
    'DELETE FROM sales_products WHERE sale_id = ?',
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