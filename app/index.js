const http = require('http');
const https = require('https');
const express = require('express');
const path = require('path');
const app = express();
const errors = require('./errors');
const middlewares = require('./middlewares');
const indexRouter = require('./router');
const webpackConfig = require('./webpack.config');
const db = require('./config/db')('mongo');

let port = process.env.PORT || 5000;
let host = process.env.HOST || 'localhost';

app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'pug');

middlewares(app, {});

// Init routers
app.use(indexRouter());

errors(app);

const httpServer = http.createServer(app);
const httpsServer = https.createServer({}, app);

db.authenticate()
	.then(() => console.log('DB connection has been established successfully.'))
	.catch(err => console.error('Unable to connect to the database:', err));

webpackConfig(app, () => {
	httpServer.listen({ port, host }, () => {
		const { address, port } = httpServer.address();
		console.log(`HTTP server listen on http://${address}:${port}/ address`);
	});
	httpsServer.listen(443);
});

module.exports = httpServer;
//Run app, then load http://localhost:port in a browser to see the output.
