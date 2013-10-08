var config = require('../config/config').Config;
var common = require('../config/common');
var loginUrl = config.sbp.host + 'account/login/';
var bipCrudUrl = config.sbp.host + 'bip/';
queryString = require('querystring');
var request = require('request');
var passport = require("passport");
var Account = require("../models").Account;
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

		if (data.userdetail.bips == null) {
			data.userdetail.bips = [];
		}
		console.log(data.userdetail);
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

	console.log(req.models);
	Account.exists({
		email : email
	}, function(err, exists) {
		if (exists) {
			res.send('email-taken', 400);
		} else {
			Account.create({
				email : email,
				password : pass,
				role : role
			}, function(err, user) {
				// err - description of the error or null
				// items - array of inserted items
				req.login(user, function(err) {
					if (err) {
						console.log(err);
						return res.send(err, 400);
					}
					return res.redirect('/');
				});
			});
		}
	});
};

/*
 * Bips operation
 */
exports.createBip = function(req, res) {
	console.log(req.body);
	request({
		url : bipCrudUrl,
		headers : common.default_headers,
		method : 'POST',
		headers : {
			'accountId' : req.user.id
		},
		json : req.body

	}, function(err, resp, body) {
		res.send(err, resp.statusCode);
	});
};

exports.editBip = function(req, res) {
	console.log(req.body);
	request({
		url : bipCrudUrl,
		headers : common.default_headers,
		method : 'PUT',
		json : req.body

	}, function(err, resp, body) {
		console.log('status code:');
		console.log(resp.statusCode);
		console.log(body);
		res.send(err, resp.statusCode);
	});
};

exports.deleteBip = function(req, res) {
	console.log(req.body);
	var deleteBipUrl = bipCrudUrl + req.body.id;
	console.log(deleteBipUrl);
	request({
		url : deleteBipUrl,
		headers : common.default_headers,
		method : 'DELETE'
	}, function(err, resp, body) {
		console.log('status code:');
		console.log(resp.statusCode);
		console.log(body);
		if (!err && resp.statusCode == 200) {
			res.send(body, 200);
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
