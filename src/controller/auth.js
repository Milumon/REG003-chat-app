const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../../config');
const User = require('../models/users');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  password: 'postgres',
  database: 'postgres',
});

const { secret } = config;
module.exports = {
  validateUser: async (req, resp, next) => {
    const { name, password } = req.body;

    if (!name || !password) {
      return next(400);
    }

    const user = new User();

    user.setName(name);
    user.setPassword(password);

    const userName = user.getName();
    const userPassword = user.getPassword();
    // console.log('body', req.body);
    // TODO: autenticar a la usuarix
    const userData = await pool.query('SELECT * FROM users WHERE name = $1', [
      userName,
    ]);

    if (userData.rows.length === 0) {
      return resp.status(400).json({ msg: 'usuario no existe' });
    }
    // console.log(userData.rows);

    const doc = userData.rows[0];

    bcrypt.compare(userPassword, doc.password, (err, result) => {
      if (err) console.info('hiiiii', err);
      else if (!result)
        return resp.status(404).json({ msg: 'contraseña incorrecta' });
      jwt.sign(
        {
          uid: doc.id,
          name: doc.name,
        },
        secret,
        { expiresIn: 60 * 60 * 24 },
        (error, token) => {
          if (error) {
            console.error('holaaaa', error);
          }
          return resp.status(200).json({ token });
        }
      );
    });
    // const user = User.findOne({ email });
    // user.then((doc) => {
    // if (!doc) {
    // return resp.status(400).json({ msg: 'usuario no exite' });
    // }
    // console.log('database', doc);
    // if (doc.email !== email && doc.password !== password) { return next(404); }
  },
};
