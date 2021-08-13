/* eslint-disable no-console */
/* eslint-disable camelcase */
// Model: /qa/questions
const { pool } = require('#db');

const getQuestions = async ({ product_id, page = 0, count = 5 }) => {
  if ([parseInt(page, 10), parseInt(count, 10)].includes(NaN)) return [400];
  if (parseInt(page, 10) < 0 || parseInt(count, 10) < 0) return [400];
  const offset = Math.max(Number(page) * Number(count) - Number(count), 0);
  console.log(offset);
  const client = await pool.connect();
  try {
    // Source:
    // https://stackoverflow.com/questions/38458318/returning-postgres-nested-json-array
    const { rows } = await client.query(`
      SELECT
        jsonb_build_object(
        'totalResults', (
          SELECT COUNT(*)
          FROM questions q
          WHERE q.product_id = $1
        ),
        'results', jsonb_agg(js_obj)
      )
      FROM (
        SELECT
          jsonb_build_object(
            'product_id', product_id,
            'question_id', id,
            'question_body', body,
            'question_date', created_at,
            'asker_name', username,
            'question_helpfulness', helpful,
            'reported', reported,
            'answers', ans_obj
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
          GROUP BY q.id, ans.id, ans.body, ans.created_at, ans.username, ans.helpful
        ) j
        WHERE product_id = $1
        GROUP BY id, username, body, created_at, helpful, reported, ans_obj, product_id
        ORDER BY id
        LIMIT $2 OFFSET $3
      ) s;
    `, [product_id, count, page]);
    console.log(rows);
    return [null, {
      product_id,
      ...rows[0].jsonb_build_object,
      // results: results,
      // totalCount: rows[0].jsonb_build_object.totalCount,
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
