const router = require('express').Router();

router.use(require('./user'), require('./product'),require('./stripe/stripe'));

module.exports = router;
