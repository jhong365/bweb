var request = require('request');

exports.create = function(req, res){
	res.render('newProject');
 };

var config = require('../config/config').Config;
var s3 = require('../util/s3');
 
exports.post = function(req, resp){
	
	var data = {};
	data["ownerId"] = "1";
	data["title"] = req.body.title;
	data["description"] = req.body.description;
	data["tags"] = req.body.tags;
	data["bidNum"] = req.body.bidNum;
	data["bidDays"] = req.body.presentDays;
	data["isPayCash"] = req.body.isPayCash == 1;
	data["cashAmount"] = req.body.cashAmount;
	data["photos"] = [];
	
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
			resp.render('success');
		}
	});
 };