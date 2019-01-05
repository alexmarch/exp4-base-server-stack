const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const serveStatic = require('serve-static');
const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


module.exports = (app, { sessExp, sessSecret }) => {
    app.use(logger('combined'));

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }));

    // parse application/json
    app.use(bodyParser.json());

    app.use(cookieParser());

    app.use(cookieSession({
        name: 'session',
        keys: [sessSecret || 'secret'],
        // Cookie Options
        maxAge: sessExp || 24 * 60 * 60 * 1000,  // 24 hours by default
    }));

    passport.use(new LocalStrategy(
        function (username, password, done) {
            User.findOne({ username: username }, function (err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false); }
                if (!user.verifyPassword(password)) { return done(null, false); }
                return done(null, user);
            });
        }
    ));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(express.static(__dirname + '/public/dist'));
    app.use(express.static(__dirname + '/public/styles'));
    app.use(express.static(__dirname + '/public/vendor'));

    app.use(serveStatic('public', { 'index': ['index.html', 'index.htm'] }));
    // app.use(bundler.middleware());

    return app;
};