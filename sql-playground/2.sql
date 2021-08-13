SELECT
jsonb_build_object(
  'totalResults', (
    SELECT COUNT(*)
    FROM questions q
    WHERE q.product_id = 70
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
      LEFT JOIN photos p ON p.answer_id = a.id
    ) ans
    LEFT JOIN questions q ON ans.question_id = q.id
    GROUP BY q.id, ans.id, ans.body, ans.created_at, ans.username, ans.helpful
  ) j
  WHERE product_id = 70
  GROUP BY id, username, body, created_at, helpful, reported, ans_obj, product_id
  ORDER BY id
) s;