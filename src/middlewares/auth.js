const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
// const User = require('../models/users');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  password: 'postgres',
  database: 'postgres',
});

module.exports = (secret) => (req, resp, next) => {
  const { authorization } = req.headers;
  // Si no exite next() 401
  if (!authorization) {
    // return resp.status(401).send({message: 'No tiene autenticación'});
    return next();
  }

  const [type, token] = authorization.split(' ');

  if (type.toLowerCase() !== 'bearer') {
    return next();
  }

  // Verificar la validez del token
  jwt.verify(token, secret, async (err, decodedToken) => {
    if (err) {
      console.log(err);
      return next(403);
    }

    // TODO: Verificar identidad del usuario usando `decodeToken.uid`
    const user = await pool.query('SELECT * FROM users WHERE id = $1', [
      decodedToken.uid,
    ]);

    // const userFindById = User.findById(decodedToken.uid);
    if (user.rows.length === 0) {
      console.log(user.rows);
      return next(404);
    }
    req.userAuth = decodedToken;
    // console.log(decodedToken);
    return next();
  });
};

// TODO: decidir por la informacion del request si la usuaria esta autenticada
module.exports.isAuthenticated = (req) => {
  // Comprobar si en el objeto req existe un campo authorization
  if (req.userAuth) {
    return true;
  }
  return false;
};

// TODO: decidir por la informacion del request si la usuaria es admin

module.exports.requireAuth = (req, resp, next) =>
  !module.exports.isAuthenticated(req) ? next(401) : next();
