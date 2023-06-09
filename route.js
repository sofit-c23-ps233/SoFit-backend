module.exports = (app) => {
  const handler = require('./category');

  app.route('/').get(handler.main);

  app.route('/add-result').post(handler.postResult);

  app.route('/result/:id').get(handler.getResultHistory);

  app.route('/delete-result/:id').delete(handler.deleteResultHistory);

  app.route('/result').get(handler.getAllResults);

  app.route('/user').get(handler.getAllUser);

  app.route('/edit-profile').put(handler.editProfile);

  app.route('/delete-user/:id').delete(handler.deleteUser);

  app.route('/recomendation/:id').get(handler.getRecomendation);
};
