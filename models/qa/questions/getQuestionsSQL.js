module.exports = `
  SELECT jsonb_build_object(
    'product_id', $1,
    'results', jsonb_agg(result.q_obj),
    'totalResults', (
      SELECT COUNT(*)
      FROM questions q
      WHERE q.product_id = $1
    )
  )
  FROM (
    SELECT (
      jsonb_build_object(
        'question_id', q.id,
        'question_body', q.body,
        'question_date', q.created_at,
        'asker_name', q.username,
        'question_helpfulness', q.helpful,
        'reported', q.reported,
        'answers', (
          SELECT (jsonb_object_agg(
            a.id, jsonb_build_object(
              'id', a.id,
              'body', a.body,
              'date', a.created_at,
              'answerer_name', a.username,
              'helpfulness', a.helpful,
              'photos', (
                SELECT
                  jsonb_agg(jsonb_build_object(
                    'id', p.id,
                    'url', p.photo_url
                  ))
                FROM photos p
                WHERE p.answer_id = a.id
              )
            )
          ))
          FROM answers as a
          WHERE a.question_id = q.id
        )
      )
    ) q_obj
    FROM questions q
    WHERE q.product_id = $1
    LIMIT $2 OFFSET $3
  ) result;
`;
