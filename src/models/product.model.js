const connection = require('./db/connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result;
};

const findById = async (productId) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [productId],
  );
  
  return result;
};

const insert = async (product) => {
  const columns = Object.keys(product).join(', ');

  const placeholders = Object.keys(product)
    .map((_key) => '?')
    .join(', ');
  
  const [{ insertId }] = await connection.execute(
    `INSERT INTO StoreManager.products (${columns}) VALUES (${placeholders})`,
    [...Object.values(product)],
  );

  return insertId;
};

const updateById = async (productId, dataToUpdate) => {
  const formattedColumns = Object.keys(dataToUpdate)
    .map((key) => `${key} = ?`)
    .join(', ');

  return connection.execute(
    `UPDATE StoreManager.products SET ${formattedColumns} WHERE id = ?`,
    [...Object.values(dataToUpdate), productId],
  );
};

const deleteById = async (productId) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [productId],
  );
  return affectedRows;
};

const findByName = async (name) => {
  const [result] = await connection.execute(
    `SELECT * FROM StoreManager.products WHERE name LIKE '%${name}%'`,
  );
  
  return result; 
};

module.exports = {
  findAll,
  findById,
  insert,
  updateById,
  deleteById,
  findByName,
};