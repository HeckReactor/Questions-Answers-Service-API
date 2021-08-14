SELECT jsonb_build_object(
	'product_id', q.product_id,
	'results', ( -- want 2 results for limit
		SELECT (jsonb_agg(
			jsonb_build_object(
				'product_id', q.product_id,
				'question_id', q.id,
				'answers', (
					SELECT (jsonb_object_agg(
						a.id, jsonb_build_object(
							'id', a.id,
							'photos', (
								SELECT jsonb_agg(jsonb_build_object(
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
		))
	),
	'totalResults', (
		SELECT COUNT(q.id)
	)
)
FROM questions q
WHERE q.product_id = 5
GROUP BY q.product_id;