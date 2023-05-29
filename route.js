'use strict';

module.exports = (app) => {
    var handler = require('./category');

    app.route('/').get(handler.main);

    app.route('/add-result').post(handler.postResult);

    app.route('/get-result/:id').get(handler.getResultHistory);

}