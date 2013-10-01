
var config = require('../config/config').Config;
var loginUrl = config.sbp.host + 'account/login';
var request = require('request');
var qs = require('querystring');


exports.profile = function(req, res){
	var data = {};
	if (req.isAuthenticated()) {
		data.user = req.user;
	} else {
		res.redirect('/login?' + qs.stringify({'redirect': req.url}));
	}
	res.render('profile', data);
 };
