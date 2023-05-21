const mysql = require('mysql');

// Create a MySQL connection pool
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tes_auth',
});

module.exports = db;