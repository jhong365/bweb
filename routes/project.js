var request = require('request');
var qs = require('querystring');

var config = require('../config/config').Config;
var s3 = require('../util/s3');

exports.create = function(req, res){
	var data = {};
	if (req.isAuthenticated()) {
		data.user = req.user;
	} else {
		res.redirect('/login?' + qs.stringify({'redirect': req.url}));
	}
	res.render('newProject', data);
 };
 
exports.post = function(req, resp){
	
	if (!req.isAuthenticated()) {
		resp.redirect('/login?'  + qs.stringify({'redirect': "/project/new"} ));
	}
	
	var data = {};
	data["ownerId"] = req.user.id;
	data["title"] = req.body.title;
	data["description"] = req.body.description;
	data["tags"] = req.body.tags;
	data["bidNum"] = req.body.bidNum;
	data["bidDays"] = req.body.presentDays;
	data["isPayCash"] = req.body.isPayCash == 1;
	
	data["cashAmount"] = req.body.cashAmount;
	data["photos"] = [];
	
	console.log(data);
	
	var photos = req.files.photos;
	
	for(var i in photos){
		if(photos[i].name){
			var s3key = new Date().getTime() + photos[i].name;
			s3.upload(s3key, photos[i].path);
			data["photos"].push({"url" : s3.baseUrl + s3key});
		}
	}

	console.log(data);
	request({
		url : config.sbp.host + 'gig',
		method : 'POST',
		json: data
	}, function(err, res) {
		if(err){
			console.log(err);
		} else {
			console.log(res);
			resp.redirect("/project/" + JSON.stringify(res));
		}
	});
 };
 
exports.get = function(req, resp){
		console.log("Id: " + req.params.id);
		
		var data = {};
		
		if (req.isAuthenticated()) {
			data.user = req.user;
		} else {
			data.user = null;
		}
		
		request({
			url : config.sbp.host + "gig/" + req.params.id,
			method : 'GET'
		}, function(err, res, body) {
			if (!err && res.statusCode == 200) {
				data['gig'] = JSON.parse(body);
			} else {
				console.log(err);
				data['gig'] = {};
			}
			console.log(data);
			resp.render('project', data);
		});
};
	
	