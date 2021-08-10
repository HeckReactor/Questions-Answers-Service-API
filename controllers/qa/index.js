const router = require('express').Router();

router.get('/init', (req, res, next) => {
  next([200, 'test']);
});

module.exports = router;
