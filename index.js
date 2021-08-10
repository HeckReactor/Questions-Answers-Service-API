const express = require('express');
require('dotenv').config();

const database = require('./helpers/database');
const app = express();
const port = process.env.PORT || 3005;

app.get('/', (req, res) => {
  res.send('helloworld');
});

app.listen(port, () => {
  console.log(port);
});
