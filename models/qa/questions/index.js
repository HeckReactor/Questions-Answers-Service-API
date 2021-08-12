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
      select jsonb_agg(js_object) result
      from (
        select
          jsonb_build_object(
            'question_id', id,
            'question_body', body,
            'question_date', created_at,
            'asker_name', username,
            'question_helpfulness', helpful,
            'reported', reported,
            'answersTotal', count(distinct s.id),
            'answers', jsonb_agg(ans_obj)
          ) js_object
        from (
          select
            t.*,
            jsonb_build_object(
              s.id, jsonb_build_object(
                'id', s.id,
                'body', s.body,
                'date', s.created_at,
                'answerer_name', s.username,
                'helpfulness', s.helpful,
                'photos', '[]'::jsonb
              )
            ) ans_obj
          from questions t
          join answers s on s.question_id = t.id
          where t.product_id = $1
        ) s
        group by id, username, body, created_at, helpful, reported
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
