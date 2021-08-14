const router = require('express').Router();

const Models = require('../../models');

// GET /qa/questions/:question_id/answers
router.get('/questions/:question_id/answers', async (req, res, next) => {
  const [err, answers] = await Models.qa.questions.getAnswers(req.params.question_id);
  if (err) return next([err]);
  return next();
});

// POST /qa/questions/:question_id/answers
router.post('/questions/:question_id/answers', (req, res, next) => {

});

// PUT /qa/questions/:question_id/helpful
router.put('/qa/questions/:question_id/helpful', (req, res, next) => {

});

// PUT /qa/questions/:question_id/report
router.put('/questions/:question_id/report', (req, res, next) => {

});

// PUT /qa/answers/:answer_id/helpful
router.put('/answers/:answer_id/helpful', (req, res, next) => {

});

// PUT /qa/answers/:answer_id/report
router.put('/answers/:answer_id/report', (req, res, next) => {
  console.log(req.params);
});

// POST /qa/questions
router.post('/questions', (req, res, next) => {
  console.log(req.params);
  next([200, 'test']);
});

// GET /qa/questions
router.get('/questions', async (req, res, next) => {
  const [err, questions] = await Models.qa.questions.get(req.query);
  if (err) return next([err]);
  return next([200, questions]);
});

module.exports = router;
