/* eslint-disable no-console */
/* eslint-disable camelcase */
// Model: /qa/questions
const { pool } = require('#db');
const getQuestionsSQL = require('./getQuestionsSQL');

const getQuestions = async ({ product_id, page = 0, count = 5 }) => {
  if ([parseInt(page, 10), parseInt(count, 10)].includes(NaN)) return [400];
  if (parseInt(page, 10) < 0 || parseInt(count, 10) < 0) return [400];
  const offset = Math.max(Number(page) * Number(count) - Number(count), 0);
  const client = await pool.connect();
  try {
    const { rows } = await client.query(getQuestionsSQL, [product_id, count, offset]);
    return [null, rows[0].jsonb_build_object];
  } catch (e) {
    process.stdout.write(`${e.stack}\n`);
    return [500];
  } finally {
    client.release();
  }
};

const getAnswers = async () => {
  try {
    return [200];
  } catch (e) {
    return [500];
  }
};

const postQuestion = () => {
  console.log('post');
};

module.exports = {
  get: getQuestions,
  post: postQuestion,
  getAnswers,
};
