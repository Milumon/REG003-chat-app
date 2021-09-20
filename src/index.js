const express = require('express');
const cors = require('cors');
const http = require('http');

const { Server } = require('socket.io');
const authMiddleware = require('./middlewares/auth');

const app = express();

const server = http.createServer(app);

const io = new Server(server);
// const { Pool } = require('pg');

const config = require('../config');
const routes = require('./routes');
const pkg = require('../package.json');

const { port, secret } = config;
app.use(express.json());
app.set('port', port);
app.set('pkg', pkg);

// middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(authMiddleware(secret));
routes(app, (err) => {
  if (err) {
    throw err;
  }

  app.listen(port, () => {
    console.info(`App listening on port ${port}`);
  });
});

module.exports = { app };
