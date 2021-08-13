/* eslint-disable no-console */
/* eslint-disable camelcase */
// Model: /qa/questions
const { pool } = require('#db');

const getQuestions = async ({ product_id, page, count }) => {
  const client = await pool.connect();
  try {
    // Source:
    // https://stackoverflow.com/questions/38458318/returning-postgres-nested-json-array
    const result = await client.query(`
      SELECT jsonb_agg(js_obj) result
      FROM (
        SELECT
          jsonb_build_object(
            'question_id', 'id',
            'question_body', body,
            'question_date', created_at,
            'asker_name', username,
            'question_helpfulness', helpful,
            'reported', reported,
            'answers', jsonb_agg(ans_obj)
          ) js_obj
        FROM (
          SELECT
            q.*,
            jsonb_build_object(
              ans.id, jsonb_build_object(
                'id', ans.id,
                'body', ans.body,
                'date', ans.created_at,
                'answerer_name', ans.username,
                'helpfulness', ans.helpful,
                'photos', jsonb_agg(photo_obj)
              )
            ) ans_obj
          FROM (
            SELECT
              a.*,
              jsonb_build_object(
                'id', p.id,
                'url', p.photo_url
              ) photo_obj
            FROM answers a
            JOIN photos p ON p.answer_id = a.id
          ) ans
          JOIN questions q ON ans.question_id = q.id
          WHERE q.product_id = $1
          GROUP BY q.id, ans.id, ans.body, ans.created_at, ans.username, ans.helpful
        ) j
        GROUP BY id, username, body, created_at, helpful, reported
      ) s;
    `, [product_id]);
    console.log(result.rows);
    return [null, {
      product_id,
      results: result.rows[0].result,
    }];
  } catch (e) {
    console.log(e);
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
