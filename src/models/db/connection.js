const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  port: process.env.MYSQL_PORT || 3306,
  user: 'root',
  password: 'password',
  database: 'StoreManager',
});

module.exports = connection;