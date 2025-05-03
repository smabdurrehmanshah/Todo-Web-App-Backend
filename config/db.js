const mysql = require('mysql2/promise');

const mysqlPool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'shah1234',
  database: 'todo_app'
});

module.exports = mysqlPool;