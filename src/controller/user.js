const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const User = require('../models/users');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  password: 'postgres',
  database: 'postgres',
});

module.exports = {
  createUsers: async (req, res, next) => {
    const { name, password } = req.body;
    const user = new User();

    user.setName(name);
    user.setPassword(password);

    const userName = user.getName();
    const userPassword = user.getPassword();

    const userData = await pool.query('SELECT * FROM users WHERE name = $1', [
      userName,
    ]);

    if (userData.rows.length !== 0) {
      console.log('este user existe', userData.rows);
      return next(403);
    }

    bcrypt.hash(userPassword, 10, async (err, hash) => {
      if (err) return next(err);
      await pool.query('INSERT INTO users (name, password) VALUES ($1, $2)', [
        userName,
        hash,
      ]);
      console.log('hash', hash);
    });

    console.log(userName, userPassword);
    return res.json({ message: 'User added succesfully' });
  },
};
