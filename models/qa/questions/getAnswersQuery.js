module.exports = `
  SELECT jsonb_build_object(
    'results', jsonb_agg(results.ans_obj),
    'totalResults', (
      SELECT COUNT(*)
      FROM answers a
      WHERE a.question_id = $1 AND a.reported != 'true'
    )
  )
  FROM (
    SELECT (jsonb_build_object(
      'answer_id', a.id,
      'body', a.body,
      'date', a.created_at,
      'answerer_name', a.username,
      'helpfulness', a.helpful,
      'photos', (
        SELECT COALESCE(jsonb_agg(jsonb_build_object(
          'id', p.id,
          'url', p.photo_url
        )), '[]'::jsonb)
        FROM photos p
        WHERE p.answer_id = a.id
      ))
    ) ans_obj
    FROM answers a
    WHERE a.question_id = $1 AND a.reported != 'true'
    LIMIT $2 OFFSET $3
  ) results;
`;
