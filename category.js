// main
// getResultHistory
// postResult
const db = require("./connection")
var mysql = require('mysql');
const { nanoid } = require('nanoid')

exports.main = function (req, res) {
    res.status(200).json({
        success: true,
        message: 'Welcome to SoFit API'
    })
}

exports.postResult = function (req, res) {
    var id = nanoid(5)
    var add = {
        result_id: "result-" + id,
        user_id: req.body.user_id,
        category: req.body.category,
        result_date: new Date().toISOString(),
    }

    db.query('INSERT INTO history_result SET ?', add, function (error, results, fields) {
        if (error) {
            res.status(500).json({
                success: false,
                message: error
            })
        } else {
            res.status(200).json({
                success: true,
                message: 'Success add result',
                data: add
            })
        }
    })
}

exports.getResultHistory = function (req, res) {
    var id = req.params.id

    db.query('SELECT * FROM history_result WHERE user_id = ?', id, function (error, results, fields) {
        if (error) {
            res.status(500).json({
                success: false,
                message: error
            })
        } else {
            res.status(200).json({
                success: true,
                message: 'Success get result',
                data: results
            })
        }
    })
}