// Model: /qa/questions
const { pool } = require('#db');

// eslint-disable-next-line camelcase
const getQuestions = async ({ product_id, page, count }) => {
  const client = await pool.connect();
  try {
    const result = await client.query(`
      SELECT *
      FROM questions
      WHERE product_id = $1
      LIMIT 5
    `, [product_id]);
    return [null, {
      product_id,
      results: result.rows,
    }];
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
};
