const router = require('express').Router();
const fileApi = require('./api/file');

router.get('/', (req, res) => res.render('app'));
router.get('/app', (req, res) => res.render('app'));

router.use(fileApi());

module.exports = () => router;
