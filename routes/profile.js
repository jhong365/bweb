
var config = require('./config')('prod');
var loginUrl = config.sbp.host + 'account/login';
var request = require('request');

exports.profile = function(req, resp){
	var data = {};
	resp.render('profile', data);
};