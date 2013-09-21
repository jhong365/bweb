var LocalStrategy = require('passport-local').Strategy, 
FacebookStrategy = require('passport-facebook').Strategy;
var crypto = require('crypto');
var request = require('request');
var queryString = require('querystring');
var common = require('./common');

module.exports = function(passport, config) {
	passport.serializeUser(function(user, done) {
		done(null, user.email);
	});

	passport.deserializeUser(function(id, done) {
		var getUserUrl = config.sbp.host + 'account/get';

		var parameter = queryString.stringify({
			email : id
		});

		request({
			url : getUserUrl,
			headers : default_headers,
			method : 'POST',
			body : parameter

		}, function(err, res, body) {
			if (!err && res.statusCode == 200) {
				// successfully get the account, now verify the password
				var account = JSON.parse(body);
				done(null, account);
			} else {
				done(err);
			}
		});
	});

	passport.use(new LocalStrategy({
		usernameField : 'email',
		passwordField : 'pass'
	}, function(username, password, done) {
		var getUserUrl = config.sbp.host + 'account/get';

		var parameter = queryString.stringify({
			email : username
		});

		request({
			url : getUserUrl,
			headers : default_headers,
			method : 'POST',
			body : parameter

		}, function(err, res, body) {
			if (!err && res.statusCode == 200) {
				// successfully get the account, now verify the password
				var account = JSON.parse(body);
				validatePassword(password, account.password, function(err, res) {
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


