SELECT q.* -- photos
FROM (
	SELECT q.*,
	a.id as answer_id -- answers
	FROM answers a
	JOIN questions q ON a.question_id = q.id
	WHERE q.id = 66
) q
JOIN photos p ON p.answer_id = q.answer_id
WHERE question_id = 66;
