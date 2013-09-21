var config = require('../config/config').Config;
var loginUrl = config.sbp.host + 'account/login';
var request = require('request');

exports.index = function(req, resp) {
	var getUserUrl = config.sbp.host + 'account/list';
	var getGigUrl = config.sbp.host + 'gig/list';

	var data = {};

	if (req.isAuthenticated()) {
		data.user = req.user;
	} else {
		data.user = null;
	}

	request({
		url : getUserUrl,
		method : 'GET'
	}, function(err, res, body) {
		if (!err && res.statusCode == 200) {
			data['users'] = JSON.parse(body);
		} else {
			data['users'] = {};
		}
		render(data, resp);
	});

	request({
		url : getGigUrl,
		method : 'GET'
	}, function(err, res, body) {
		if (!err && res.statusCode == 200) {
			data['gigs'] = JSON.parse(body);
		} else {
			data['gigs'] = {};
		}
		render(data, resp);
	});

};

var render = function(data, resp) {
	if (data.users && data.gigs) {
		resp.render('index', data);
	}
};