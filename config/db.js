const mysql = require('mysql2/promise');

const mysqlPool = mysql.createPool({
  host: 'sql12.freesqldatabase.com',
  user: 'sql12776700',
  password: '5HS5L4XzEf',
  database: 'sql12776700'
});

module.exports = mysqlPool;