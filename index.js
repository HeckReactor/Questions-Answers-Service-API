const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', require('./controllers'));

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
