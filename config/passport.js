var LocalStrategy = require('passport-local').Strategy, FacebookStrategy = require('passport-facebook').Strategy;
var crypto = require('crypto');
var request = require('request');
var queryString = require('querystring');
var common = require('./common');
var Account = require("../models").Account;

module.exports = function(passport, config) {
	passport.serializeUser(function(user, done) {
		done(null, user.email);
	});

	passport.deserializeUser(function(id, done) {
		Account.findByEmail(id, function(err, user) {
			done(err, user);
		});
	});

	passport.use(new LocalStrategy({
		usernameField : 'email',
		passwordField : 'password'
	}, function(username, password, done) {
		Account.findByEmail(username, function(err, account) {
			if (!err && account) {
				// successfully get the account, now verify the password
				common.validatePassword(password, account.password, function(
						err, res) {
					console.log(res);
					if (res) {
						done(null, account);
					} else {
						done(null, false, 'invalid-password');
					}
				});

			} else {
				done(null, false, 'account-not-found');
			}
		});
	}));

	passport.use(new FacebookStrategy({
		clientID : config.facebook.clientID,
		clientSecret : config.facebook.clientSecret,
		callbackURL : config.facebook.callbackURL
	}, function(accessToken, refreshToken, profile, done) {
		// User.findOrCreateFaceBookUser(profile, done);
	}));
};
