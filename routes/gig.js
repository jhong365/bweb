var request = require('request');

exports.get = function(req, res){
	res.render('gig');
 };
 
var config = require('../config/config').Config;
 
exports.post = function(req, resp){
	
	var fs = require('fs');
	
	console.log("1111");
	var r = request.post(config.sbp.host + 'gig');
	var form = r.form();
	form.append("userId", "1");
	form.append("title", req.body.title);
	form.append("description", req.body.description);
	form.append("tags", req.body.tags);
	var photos = req.files.photos;
	for(var i in photos){
		form.append('photos', fs.createReadStream(photos[i].path));
	}
	
	console.log(form);
	form.submit(config.sbp.host + 'gig', function(err, res){
		if(err){
			console.log(err);
		} else {
			console.log(res);
			resp.render('success');
		}
	});


	/* 
	var data = new FormData();
	data.append("userId", getURLParameter("userid"));
	data.append("title", req.body.title);
	data.append("description", req.body.description);
	data.append("tags", req.body.tags);
	data.append('photos', req.body.photos);
	
	var uploadGigUrl = config.sbp.host + 'gig';
	request({
		url : uploadGigUrl,
		method : 'POST'
		}, function(err, res, body) {
			if (!err && res.statusCode == 200) {
				resp.render('success');
			} else {	
				resp.render('failed');
			}
		});
		*/
 };