
var config = require('../config/config').Config;
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

 exports.post = function(req, resp){
		request({
			url : config.sbp.host + 'profile/create',
			method : 'POST',
			headers : {'accountId' : req.body.accountId},
			form: {
			    name: req.body.name,
			    description: req.body.description
			}
		}, function(err, res) {
			if(err){
				console.log(err);
			} else {
				console.log(res.body);
				resp.redirect("/profile/");
			}
		});
	 };