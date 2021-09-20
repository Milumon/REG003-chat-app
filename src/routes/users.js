const { createUsers } = require('../controller/user');
const { requireAuth } = require('../middlewares/auth');

module.exports = (app, nextMain) => {
  app.post('/users', requireAuth, createUsers);

  return nextMain();
};
