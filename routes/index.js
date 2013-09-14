
var config = require('./config')('prod');
var loginUrl = config.sbp.host + 'account/login';
var request = require('request');

exports.index = function(req, res0){
	var getUserUrl = config.sbp.host + 'account/list';
	request({
		url : getUserUrl,
		method : 'GET'
	}, function(err, res, body) {
		if (!err && res.statusCode == 200) {
		var users = JSON.parse(body);
		res0.render('index', { users: users });	
	} else {			
			res0.render('index', { users: [{"email":getUserUrl}] });
		}
	});
};