// Model: /qa/questions
const { pool } = require('#db');

// eslint-disable-next-line camelcase
const getQuestions = async ({ product_id, page, count }) => {
  const client = await pool.connect();
  try {
    // Source:
    // https://stackoverflow.com/questions/38458318/returning-postgres-nested-json-array
    // const result = await client.query(`
    //   SELECT *
    //   FROM questions
    //   WHERE product_id = $1
    //   LIMIT 5
    // `, [product_id]);
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
          'answers', jsonb_agg(answers)
        ) js_object
      from (
        select
          t.*,
          jsonb_build_object(
            'id', s.id,
            'username', s.username,
            'body', s.body
          ) answers
        from questions t
        join answers s on s.question_id = t.id
        where t.product_id = $1
        limit 5
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
