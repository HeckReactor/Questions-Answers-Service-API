const { Pool, Client } = require('pg');

const config = {
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
};

console.log(config);

const pool = new Pool(config);
const client = new Client(config);

pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res);
  pool.end();
});

module.exports = {
  pool,
  client,
};
