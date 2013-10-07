var request = require('request');
var qs = require('querystring');
var Project = require('../models/project');
var ProjectPhoto = require('../models/project_photo');

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
	
	var project = {};
	project["account_id"] = req.body.accountId;
	project["title"] = req.body.title;
	project["description"] = req.body.description;
	project["tags"] = req.body.tags;
	project["bidNum"] = req.body.bidNum;
	project["bidDays"] = req.body.bidDays;
	project["isPayCash"] = req.body.isPayCash == 1;
	
	project["cashAmount"] = req.body.cashAmount? req.body.cashAmount : 0;

	Project.create(project, function(err, item){
		if(err){
			console.log(err);
		} else {
			var photos = req.files.photos;
			var projectPhotos = [];
			for(var i in photos){
				if(photos[i].name){
					var s3key = new Date().getTime() + photos[i].name;
					s3.upload(s3key, photos[i].path);
					projectPhotos.push({"url" : s3.baseUrl + s3key, "project_id" : item.id});
				}
			}
			
			if(projectPhotos.length > 1){
				ProjectPhoto.create(projectPhotos, function(err){
					if(err){
						console.log(err);
					} else {
						resp.redirect("/project/" + item.id);
					}
				}); 
			}else{
				resp.redirect("/project/" + item.id);
			}
		}
	});

 };
 
exports.get = function(req, resp){
		var data = {};
		
		if (req.isAuthenticated()) {
			data.user = req.user;
		} else {
			data.user = null;
		}
		
		Project.get(req.params.id, function(err, project) {
			if (err) {
				console.log(err);
				data['project'] = {};
			} else {
				data['project'] = project;
				data['userName'] = "abc";
				data['userAvatar'] = "/img/noimg.jpg";
			}
			
			render(data, resp);
		});
};
		
/*
		request({
			url : config.sbp.host + "comp/project/" + req.params.id,
			method : 'GET'
		}, function(err, res, body) {
			if (!err && res.statusCode == 200) {
				var json = JSON.parse(body);
				data['gig'] = json.project;
				data['userName'] = json.profile? json.profile.name : json.project.account.email;
				data['userAvatar'] = json.profile? json.profile.avatar : "/img/noimg.jpg";
			} else {
				console.log(err);
				data['gig'] = {};
			}
			console.log(data);
			resp.render('project', data);
		});
};
*/

var render = function(data, resp) {
	if (data.project && data.userName) {
		resp.render('project', data);
	}
};
	
	