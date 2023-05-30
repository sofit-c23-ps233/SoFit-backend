'use strict';

module.exports = (app) => {
    var handler = require('./category');

    app.route('/').get(handler.main);

    app.route('/add-result').post(handler.postResult);

    app.route('/result/:id').get(handler.getResultHistory);

    app.route('/delete-result/:id').delete(handler.deleteResultHistory);

    app.route('/result').get(handler.getAllResults);

    app.route('/user').get(handler.getAllUser);

}