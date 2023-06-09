const mysql = require('mysql');
const { nanoid } = require('nanoid');
const db = require('./connection');

exports.main = function (req, res) {
  res.status(200).json({
    success: true,
    message: 'Welcome to SoFit API. For more information please read the API Documentation : https://documenter.getpostman.com/view/23251415/2s93m911te',
  });
};

exports.postResult = function (req, res) {
  const id = nanoid(5);
  const add = {
    result_id: `result-${id}`,
    user_id: req.body.user_id,
    category: req.body.category,
    result_date: new Date().toISOString(),
  };

  db.query('INSERT INTO history_result SET ?', add, (error) => {
    if (error) {
      res.status(500).json({
        success: false,
        message: error,
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Success add result',
        data: add,
      });
    }
  });
};

exports.getResultHistory = function (req, res) {
  const { id } = req.params;

  db.query('SELECT * FROM history_result WHERE user_id = ?', id, (error, results) => {
    if (results.length === 0) {
      res.status(404).json({
        success: false,
        message: `Result's history with id ${id} not found`,
      });
    } else if (error) {
      res.status(500).json({
        success: false,
        message: error,
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Success get result',
        data: results,
      });
    }
  });
};

exports.deleteResultHistory = function (req, res) {
  let query = 'DELETE FROM history_result WHERE result_id = ?';
  const value = req.params.id;

  query = mysql.format(query, value);
  db.query(query, (error, results) => {
    if (results.affectedRows === 0) {
      res.status(404).json({
        success: false,
        message: `Result's history with id ${value} not found`,
      });
    } else if (error) {
      res.status(500).json({
        success: false,
        message: error,
      });
    } else {
      res.status(200).json({
        success: true,
        message: `Success delete result's history with id ${value}`,
      });
    }
  });
};

exports.getAllResults = function (req, res) {
  const query = 'SELECT * FROM history_result';
  db.query(query, (error, results) => {
    if (results.length === 0) {
      res.status(404).json({
        success: false,
        message: 'Result\'s history not found',
      });
    } else if (error) {
      res.status(500).json({
        success: false,
        message: error,
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Success get result',
        data: results,
      });
    }
  });
};

exports.getAllUser = function (req, res) {
  const query = 'SELECT * FROM users';
  db.query(query, (error, results) => {
    if (error) {
      res.status(500).json({
        success: false,
        message: error,
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Success get user',
        data: results,
      });
    }
  });
};

exports.editProfile = function (req, res) {
  let query = 'UPDATE users SET username = ?, email = ? WHERE id = ?';

  const value = [req.body.username, req.body.email, req.body.id];

  query = mysql.format(query, value);
  db.query(query, (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        err,
      });
    }
    res.status(200).json({
      success: true,
      message: 'Edit profile success',
      data: {
        username: req.body.username,
        email: req.body.email,
      },
    });
  });
};

// delete user from with history_result
exports.deleteUser = function (req, res) {
  let deleteQuery = 'DELETE FROM users WHERE id = ?';
  let deleteResultQuery = 'DELETE FROM history_result WHERE user_id = ?';
  const value = req.params.id;

  deleteQuery = mysql.format(deleteQuery, value);
  deleteResultQuery = mysql.format(deleteResultQuery, value);

  db.query(deleteQuery, (error, results) => {
    if (results === 0) {
      res.status(404).json({
        success: false,
        message: `User with id ${value} not found`,
      });
    }
    if (error) {
      res.status(500).json({
        success: false,
        message: error,
      });
    }
    db.query(deleteResultQuery, (err) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: error,
        });
      } else {
        res.status(200).json({
          success: true,
          message: `Success delete user with id ${value}`,
        });
      }
    });
  });
};

// get recommendation data
exports.getRecommendation = function (req, res) {
  const query = 'SELECT * FROM recomendation WHERE cat_id = ?';
  const value = req.params.id;
  db.query(query, value, (error, results) => {
    if (results.length === 0) {
      res.status(404).json({
        success: false,
        message: 'Recommendation not found',
      });
    } else if (error) {
      res.status(500).json({
        success: false,
        message: error,
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Success get Recommendation',
        data: results,
      });
    }
  });
};
