const mysql = require('mysql2/promise');

const mysqlPool = mysql.createPool({
  host: 'mainline.proxy.rlwy.net',
  user: 'root',
  password: 'pfhPibaXejYIhRsJWnkaePFioOoUpweq',
  database: 'railway',
  port: 42581
});

module.exports = mysqlPool;