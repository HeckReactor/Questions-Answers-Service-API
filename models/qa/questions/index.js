/* eslint-disable no-console */
/* eslint-disable camelcase */
// Model: /qa/questions
const { pool } = require('#db');
const getQuestionsQuery = require('./getQuestionsQuery');
const getAnswersQuery = require('./getAnswersQuery');
const postQuestionQuery = require('./postQuestionQuery');

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

const postQuestion = async ({
  body,
  name,
  email,
  product_id,
}) => {
  if (!(body && name && email && product_id && !Number.isNaN(product_id))) {
    return [400];
  }
  const client = await pool.connect();
  try {
    return [null, await client.query(postQuestionQuery, [
      body,
      name,
      email,
      product_id,
    ])];
  } catch (e) {
    process.stdout.write(`${e.stack}\n`);
    return [500];
  } finally {
    client.release();
  }
};

const postAnswer = async ({ question_id }, {
  body,
  name,
  email,
  photos,
}) => {
  const client = await pool.connect();
  try {
    return [200];
  } catch (e) {
    process.stdout.write(`${e.stack}\n`);
    return [500];
  } finally {
    client.release();
  }
  console.log(question_id);
  console.log(body, name, email);
  console.log(photos);
  console.log('innie');
  return [500];
};

const reportQuestion = async ({ question_id }) => {
  const client = await pool.connect();
  try {
    return [null, await client.query(`
      UPDATE questions
      SET reported = 'true'
      WHERE id = $1
    `, [question_id])];
  } catch (e) {
    process.stdout.write(`${e.stack}\n`);
    return [500];
  } finally {
    client.release();
  }
};

const markHelpful = async ({ id, contentType }) => {
  if (!['questions', 'answers'].includes(contentType.toLowerCase())) return [400];
  const client = await pool.connect();
  try {
    return [null, await client.query(`
      UPDATE ${contentType}
      SET helpful = helpful + 1
      WHERE id = $1;
    `, [id])];
  } catch (e) {
    process.stdout.write(`${e.stack}\n`);
    return [500];
  } finally {
    client.release();
  }
};

module.exports = {
  get: getQuestions,
  post: postQuestion,
  getAnswers,
  reportQuestion,
  markHelpful,
  postAnswer,
};
