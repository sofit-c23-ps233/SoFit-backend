const express = require('express');

const route = express.Router();
const user = require('./auth');

route.post('/register', user.register);
route.post('/login', user.login);

module.exports = route;
