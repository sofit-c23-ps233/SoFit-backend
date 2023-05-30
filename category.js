const mysql = require('mysql');
const { nanoid } = require('nanoid');
const db = require('./connection');

exports.main = function (req, res) {
  res.status(200).json({
    success: true,
    message: 'Welcome to SoFit API',
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
