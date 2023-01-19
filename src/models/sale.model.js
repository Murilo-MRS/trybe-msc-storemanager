const connection = require('./db/connection');

const addNewSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUES (now())',
  );

  return insertId;
};

module.exports = {
  addNewSale,
};