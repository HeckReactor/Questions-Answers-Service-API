const { Pool } = require('pg');
require('dotenv').config();

const config = {
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
};

const pool = new Pool(config);
// const client = new Client(config);

// client.connect();

module.exports = {
  pool,
  // client,
};
