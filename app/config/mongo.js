const mongoose = require('mongoose');
const mongo = mongoose.createConnection(
	`mongodb://${process.env.DB_HOST}:27017`,
	{
    useNewUrlParser: true,
		pass: process.env.DB_PASS,
		user: process.env.DB_USER,
		dbName: process.env.DB_NAME
	}
);
module.exports = mongo;
