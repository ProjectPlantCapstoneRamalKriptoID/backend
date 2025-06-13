const router = require('express').Router();
const kripto = require('../controllers/kripto.controller');

router.post('/node-predict', kripto.predict);

module.exports = router;
