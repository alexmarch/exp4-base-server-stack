
const chai = require('chai');
const User = require('../app/models/user');

const should = chai.should;

describe('---User model---', function () {
    const test_user = {
        username: 'test_hashed_user',
        password: 'test_hashed_userpass'
    };

    it('should create new user in db', done => {
        User.create(test_user)
        .then(user => user.destroy({ force: true }))
        .then(() => done())
        .catch(err => done(err));
    });

    it('should user password be hashed', done => {
        User.create(test_user)
            .then(user => {
                        should(user.password).not.equal(test_user.password);
						return user.destroy({ force: true });
			})
					.then(() => done())
					.catch(err => done(err));
    });

});
