const router = require('express').Router();

const Models = require('../../models');

// GET /qa/questions/:question_id/answers
router.get('/questions/:question_id/answers', async (req, res, next) => {
  const [err, answers] = await Models.qa.questions.getAnswers(req.params.question_id, req.query);
  if (err) return next([err]);
  return next([200, answers]);
});

// POST /qa/questions/:question_id/answers
router.post('/questions/:question_id([0-9]+)/answers', (req, res, next) => {

});

// PUT /qa/questions/:question_id/helpful
router.put('/questions/:question_id([0-9]+)/helpful', (req, res, next) => {

});

// PUT /qa/questions/:question_id/report
router.put('/questions/:question_id([0-9]+)/report', async (req, res, next) => {
  const [err] = await Models.qa.questions.reportQuestion(req.params);
  if (err) return next([err]);
  return next([204]);
});

// PUT /qa/answers/:answer_id/helpful
router.put('/answers/:answer_id([0-9]+)/helpful', (req, res, next) => {

});

// PUT /qa/answers/:answer_id/report
router.put('/answers/:answer_id([0-9]+)/report', async (req, res, next) => {
  const [err] = await Models.qa.answers.reportAnswer(req.params);
  if (err) return next([err]);
  return next([204]);
});

// POST /qa/questions
router.post('/questions', async (req, res, next) => {
  const [err, id] = await Models.qa.questions.post(req.body);
  if (err) return next([err]);
  // Resource created
  return next([201, id]);
});

// GET /qa/questions
router.get('/questions', async (req, res, next) => {
  if (req.query.product_id === undefined) return next([400]);
  const [err, questions] = await Models.qa.questions.get(req.query);
  if (err) return next([err]);
  return next([200, questions]);
});

module.exports = router;
