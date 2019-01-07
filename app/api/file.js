const multer  = require('multer');
const path  = require('path');
const router = require('express').Router();
const fs = require('fs');
const File = require('../models/file');

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		const uploadDir = path.resolve(__dirname, '../uploads');
		if (!fs.existsSync(uploadDir)) {
			fs.mkdirSync(uploadDir);
		}
		cb(null, uploadDir);
	},
	filename: function(req, file, cb) {
		cb(null, `${file.fieldname}_${Date.now()}.${file.originalname.split('.').pop()}`);
	}
});
const upload = multer({ storage });

router.post('/upload', upload.array('files', process.env.UPLOAD_MAX_COUNT || 10), (req, res) => {
	const p = req.files.map(f => (
		File.create({
			name: f.filename,
			originName: f.originalname,
			url: `http://localhost:5000/static/file/${f.filename}`
		})));

	Promise.all(p)
		.then(() => res.json({ status: 'success' }))
		.catch(error => res.status(400).json({ error, status: 'error' }));
});

router.get('/list', (req, res) => {
	File.find().exec((error, files) => {
		if (error) {
			return res.status(400).json({ error, status: 'error' });
		}
		res.json({ files, status: 'success' });
	});
});

module.exports = () => router;