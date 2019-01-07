const mongoose = require('../config/mongo');
const { SchemaTypes, Schema } = require('mongoose');

const schema = Schema({
	name: SchemaTypes.String,
	originName: SchemaTypes.String,
	url: SchemaTypes.String
});

const File = mongoose.model('File', schema);

module.exports = File;