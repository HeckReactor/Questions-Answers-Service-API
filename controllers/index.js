const router = require('express').Router();

router.use('/qa', require('./qa'));

module.exports = router;
