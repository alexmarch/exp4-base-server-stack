const csrf = require('csurf');
const passport = require('passport');

const csrfProtection = csrf({ cookie: true });

const authenticate = () => passport.authenticate('local', { failureRedirect: '/login' });

module.exports = {
    csrfProtection
};