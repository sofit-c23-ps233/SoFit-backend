const md5 = require('md5');
const { nanoid } = require('nanoid');
const mysql = require('mysql');
const db = require('../connection');

const hashedPassword = md5('password');

exports.register = function (req, res) {
  const id = nanoid(8);
  const add = {
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  };

  // Check if email or username already exists
  let query = 'SELECT * FROM users WHERE email = ? OR username = ?';
  const value = [add.email, add.username];

  query = mysql.format(query, value);

  db.query(query, (err, rows) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        err,
      });
    } if (rows.length > 0) {
      res.status(409).json({
        success: false,
        message: 'Email or username already exists',
      });
    } else {
      const data = {
        id,
        username: add.username,
        email: add.email,
        password: add.password,
      };
      let query = 'INSERT INTO users SET ?';
      query = mysql.format(query, data);
      db.query(query, data, (err) => {
        if (err) {
          res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            err,
          });
        } else {
          res.status(201).json({
            success: true,
            message: 'Register success',
            data: {
              username: data.username,
              email: data.email,
            },
          });
        }
      });
    }
  });
};

exports.login = function (req, res) {
  const add = {
    email: req.body.email,
    password: hashedPassword,
  };

  // Check if email and password match
  let query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  const value = [add.email, add.password];

  query = mysql.format(query, value);
  db.query(query, (err, rows) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        err,
      });
    } if (rows.length > 0) {
      res.status(200).json({
        success: true,
        message: 'Login success',
        data: {
          id: rows[0].id,
          username: rows[0].username,
          email: rows[0].email,
        },
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Email or password wrong',
      });
    }
  });
};
