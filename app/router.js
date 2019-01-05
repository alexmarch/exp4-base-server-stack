const router = require('express').Router();

router.get('/', (req, res) => res.render('index'));
router.get('/app', (req, res) => res.render('app'));

module.exports = () => router;
