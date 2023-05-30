var db = require('../connection');
var md5 = require('md5');
const { nanoid } = require('nanoid');
var mysql = require('mysql');
var hashedPassword = md5('password');

exports.register = function (req, res) {
    var id = nanoid(8);
    var add = {
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    }

    // Check if email or username already exists
    var query = "SELECT * FROM users WHERE email = ? OR username = ?";
    var value = [add.email,add.username];

    query = mysql.format(query, value);

    db.query(query, function (err, rows) {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error',
                err: err
            })
        } else {
            if (rows.length > 0) {
                res.status(409).json({
                    success: false,
                    message: 'Email or username already exists'
                })
            } else {
                var data = {
                    id: id,
                    username: add.username,
                    email: add.email,
                    password: add.password,
                }
                var query = "INSERT INTO users SET ?";
                query = mysql.format(query, data);
                db.query(query, data, function (err, rows) {
                    if (err) {
                        res.status(500).json({
                            success: false,
                            message: 'Internal Server Error',
                            err: err
                        })
                    } else {
                        res.status(201).json({
                            success: true,
                            message: 'Register success',
                            data: {
                                username: data.username,
                                email: data.email,
                            }
                        })
                    }
                })
            }
        }
    })
}

exports.login = function (req, res) {
    var add = {
        email: req.body.email,
        password: hashedPassword
    }
    
    // Check if email and password match
    var query = "SELECT * FROM users WHERE email = ? AND password = ?";
    var value = [add.email, add.password];

    query = mysql.format(query, value);
    db.query(query, function (err, rows) {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error',
                err: err
            })
        } else {
            if (rows.length > 0) {
                res.status(200).json({
                    success: true,
                    message: 'Login success',
                    data: {
                        username: rows[0].username,
                        email: rows[0].email,
                    }
                })
            } else {
                res.status(401).json({
                    success: false,
                    message: 'Email or password wrong'
                })
            }
        }
    })
}