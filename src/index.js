const express = require('express');
const config = require('../config');

const app = express();
// const cors = require('cors');

// const pkg = require('./package.json');

const { port } = config;
app.use(express.json());
app.set('port', port);

app.use(express.urlencoded({ extended: true }));
// app.use(require('./routes/index'))

app.get('/', (req, res) => {
  res.send('Hello Digiworld');
});

const server = app.listen(app.get('port'), () => {
  console.info(`App listening on port ${app.get('port')}`);
});

module.exports = { app, server };
