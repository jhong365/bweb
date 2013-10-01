var config = require('../config/config').Config;
var common = require('../config/common');
var loginUrl = config.sbp.host + 'account/login/';
queryString = require('querystring');
var request = require('request');
var passport = require("passport");
require('../config/passport')(passport, config);

/*
 * GET users listing.
 */

exports.list = function(req, res) {
	res.send("respond with a resource");
};

/*
 * Render sign up page
 */
exports.signup = function(req, res) {
	res.render('signup', {
		title : 'Signup'
	});
};

exports.register = function(req, res) {
	res.render('registration', {
		title : 'Signup'
	});
};

/*
 * user dash board
 */
exports.dashboard = function(req, res) {
	var data = {};
	
	data.user = req.user;
	console.log(req.user);
	var getUserCompositeUrl = config.sbp.host + 'comp/user/' + req.user.id;
	console.log(getUserCompositeUrl);
	request({
		url : getUserCompositeUrl,
		method : 'GET'
	}, function(err, resp, body) {
		if (!err && resp.statusCode == 200) {
			data['userdetail'] = JSON.parse(body);
		} else {
			data['userdetail'] = {};
		}
		
		//console.log(data.userdetail.tasks);
		res.render('dashboard', data);
	});
};

/*
 * User sign up
 */
exports.addNewAccount = function(req, res) {
	var email = req.param('email');
	var pass = req.param('password');
	var role = req.param('role');

	// make the salt
	common.saltAndHash(pass, function(hash) {
		pass = hash;
	});

	var parameter = queryString.stringify({
		email : email,
		password : pass,
		role : role,
		isNew : true,
	});

	console.log(loginUrl);
	request({
		url : loginUrl,
		headers : common.default_headers,
		method : 'POST',
		body : parameter

	}, function(err, resp, body) {
		console.log('status code:');
		console.log(resp.statusCode);
		console.log(body);
		if (!err && resp.statusCode == 200) {
			var user = JSON.parse(body);
			if (user) {
				req.login(user, function(err) {
					if (err) {
						console.log(err);
						return res.send(err, 400);
					}
					return res.redirect('/');
				});
			}
		} else {
			// body contains the error code
			res.send(body, 400);
		}
	});
};

var render = function(data, resp) {
	if (data.users && data.gigs) {
		resp.render('index', data);
	}
};
