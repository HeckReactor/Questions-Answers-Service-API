/* eslint-disable camelcase */
const { pool } = require('#db');

const reportAnswer = async ({ answer_id }) => {
  const client = await pool.connect();
  try {
    return [null, await client.query(`
      UPDATE answers
      SET reported = 'true'
      WHERE id = $1
    `, [answer_id])];
  } catch (e) {
    process.stdout.write(`${e.stack}\n`);
    return [500];
  } finally {
    client.release();
  }
};

const helpfulAnswer = async () => {
  return 1;
};

module.exports = {
  reportAnswer,
  helpfulAnswer,
};
