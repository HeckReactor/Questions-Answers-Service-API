const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/loaderio-43eeefe2c5eafff4e5fd56b1fc6cbeac', (req, res) => {
  res.status(200).send('loaderio-43eeefe2c5eafff4e5fd56b1fc6cbeac');
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
