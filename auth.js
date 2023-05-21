
//const express = require('express');
//const app = express();
//const bodyParser = require('body-parser');
const md5 = require('md5');
const db = require('./connection');
const { nanoid } = require('nanoid');

//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());

//app.post('/register', (req, res) => {
exports.register = function (req, res) {  
  const { username, password } = req.body;
  const id = nanoid(8);

  // Hash the password using MD5 (not recommended for secure password storage)
  const hashedPassword = md5(password);

  db.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection: ', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // Check if the username already exists
    connection.query(
      'SELECT * FROM user WHERE username = ?',
      [username],
      (err, results) => {
        if (err) {
          console.error('Error executing MySQL query: ', err);
          res.status(500).json({ error: 'Internal server error' });
          return;
        }

        if (results.length > 0) {
          res.status(409).json({ error: 'Username already exists' });
          return;
        }

        // Insert the new user into the database
        connection.query(
          'INSERT INTO user (id, username, password) VALUES (?, ?, ?)',
          [id, username, hashedPassword],
          (err) => {
            connection.release();

            if (err) {
              console.error('Error executing MySQL query: ', err);
              res.status(500).json({ error: 'Internal server error' });
              return;
            }

            res.status(201).json({ message: 'Registration successful' });
          }
        );
      }
    );
  });
};

//app.post('/login', (req, res) => 
exports.login = function (req, res) {
  const { username, password } = req.body;

  // Hash the password using MD5 (not recommended for secure password storage)
  const hashedPassword = md5(password);

  db.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection: ', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // Check if the username exists
    connection.query(
      'SELECT * FROM user WHERE username = ?',
      [username],
      (err, results) => {
        if (err) {
          console.error('Error executing MySQL query: ', err);
          res.status(500).json({ error: 'Internal server error' });
          return;
        }

        if (results.length === 0) {
          res.status(401).json({ error: 'Invalid credentials' });
          return;
        }

        const user = results[0];

        // Compare the provided password with the hashed password in the database
        if (hashedPassword !== user.password) {
          res.status(401).json({ error: 'Invalid credentials' });
          return;
        }

        res.status(200).json({ message: 'Login successful' });
      }
    );
  });
};

/*app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});*/