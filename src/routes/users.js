const { createUsers } = require('../controller/user');

module.exports = (app, nextMain) => {
  app.post('/users', createUsers);

  return nextMain();
};
