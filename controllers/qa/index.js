const router = require('express').Router();

// GET /qa/questions
// GET /qa/questions/:question_id/answers
// POST /qa/questions
// POST /qa/questions/:question_id/answers
// PUT /qa/questions/:question_id/helpful
// PUT /qa/questions/:question_id/report
// PUT /qa/answers/:answer_id/helpful
// PUT /qa/answers/:answer_id/report

router.get('/questions/:question_id/answers');

router.post('/questions', (req, res, next) => {
  next([200, 'test']);
  // questions model
});
router.get('/questions', (req, res, next) => {
  next([200, 'test']);
  // questions model
});

module.exports = router;
