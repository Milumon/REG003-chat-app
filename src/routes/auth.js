const { validateUser } = require('../controller/auth');

module.exports = (app, nextMain) => {
  app.post('/auth', validateUser);

  return nextMain();
};
