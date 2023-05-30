require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT 
const host = process.env.DB_HOST 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var route = require("./route")
route(app)

app.use('/auth', require('./auth/routes'));

app.listen(port, () => {
    console.log(`API Server is running on http://${host}:${port}`);
  });