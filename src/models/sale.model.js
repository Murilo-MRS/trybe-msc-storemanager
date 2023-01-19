const connection = require('./db/connection');

const addNewSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUES (now())',
  );

  return insertId;
};

const deleteFromSales = async (saleId) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM sales WHERE id = ?',
    [saleId],
  );
  return affectedRows;
};

module.exports = {
  addNewSale,
  deleteFromSales,
};