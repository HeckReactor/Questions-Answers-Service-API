require('newrelic');
require('dotenv').config();
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handles Loader.io API
app.get(`/${process.env.LOADER_IO}`, (req, res) => {
  res.status(200).send(process.env.LOADER_IO);
});

app.use('/', require('./controllers'));

app.use((req, res) => {
  res.status(404).json({
    message: 'Not Found',
    method: req.method,
    path: req.url,
  });
});

app.use(require('./controllers/responseHandler'));

app.listen(port, () => {
  process.stdout.write(`Questions & Answers Service API started on port ${port}.\n`);
});
