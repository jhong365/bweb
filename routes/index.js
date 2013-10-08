var config = require('../config/config').Config;
var request = require('request');
var models = require('../models');
var Project = models.Project;

exports.index = function(req, resp) {
	var getUserUrl = config.sbp.host + 'account/list';

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
	
	Project.all(function(err, projects){
		if(err){
			console.log(err);
			data['gigs'] = {};
		} else {
			data['gigs'] = projects;
		}
		render(data, resp);
	});
};

var render = function(data, resp) {
	if (data.users && data.gigs) {
		resp.render('index', data);
	}
};