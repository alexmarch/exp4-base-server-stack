const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);
const should = chai.should;

const httpClient = chai.request(app).keepOpen();

after(() => app.close(() => process.exit()));

describe('---Router---', function() {

	it('should response with status 200', done => {
		httpClient.get('/').end((err, res) => {
			should(err).not.exist();
			res.status.should.eql(200);
			done();
		});
	});

	it('should have status 404 for not wrong url', done => {
		httpClient.get('/wrong-url-address').end((err, res) => {
			res.should.have.status(404);
			done();
		});
	});
});
