/* eslint-disable no-console */
/* eslint-disable camelcase */
// Model: /qa/questions
const { pool } = require('#db');
const getQuestionsQuery = require('./getQuestionsQuery');
const getAnswersQuery = require('./getAnswersQuery');

const calculateOffset = (page, count) => {
  if ([parseInt(page, 10), parseInt(count, 10)].includes(NaN)) return [400];
  if (parseInt(page, 10) < 0 || parseInt(count, 10) < 0) return [400];
  return [null, Math.max(Number(page) * Number(count) - Number(count), 0)];
};

const getQuestions = async ({ product_id, page = 1, count = 5 }) => {
  const [err, offset] = calculateOffset(page, count);
  if (err) return [err];
  const client = await pool.connect();
  try {
    const { rows } = await client.query(getQuestionsQuery, [
      product_id,
      count,
      offset,
    ]);
    return [null, rows[0].jsonb_build_object];
  } catch (e) {
    process.stdout.write(`${e.stack}\n`);
    return [500];
  } finally {
    client.release();
  }
};

const getAnswers = async (question_id, { page = 1, count = 5 }) => {
  const [err, offset] = calculateOffset(page, count);
  if (err) return [err];
  const client = await pool.connect();
  try {
    const { rows } = await client.query(getAnswersQuery, [
      question_id,
      count,
      offset,
    ]);
    return [null, rows[0].jsonb_build_object];
  } catch (e) {
    return [500];
  } finally {
    client.release();
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
