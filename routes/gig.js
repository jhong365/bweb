var request = require('request');

exports.get = function(req, res){
	res.render('gig');
 };

var fs = require('fs');
var config = require('../config/config').Config;
var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config/aws.json');

function uploadToS3(key, path){
	var data = {Key: key , Body: fs.createReadStream(path), ACL:"public-read"};
	var s3bucket = new AWS.S3({params: {Bucket: 'boostaa'}});
	s3bucket.putObject(data, function(err, data) {
	    if (err) {
	      console.log("Error uploading data: ", err);
	    } else {
	      console.log("Successfully uploaded data to S3: " + key);
	    }
	 });
}
 
exports.post = function(req, resp){
	var r = request.post(config.sbp.host + 'gig');
	var form = r.form();
	form.append("userId", "1");
	form.append("title", req.body.title);
	form.append("description", req.body.description);
	form.append("tags", req.body.tags);
	
	var photos = req.files.photos;
	
	for(var i in photos){
		if(photos[i].name){
			var s3key = new Date().getTime() + photos[i].name;
			uploadToS3(s3key, photos[i].path);
			form.append("photos", s3key);
		}
	}

	resp.render('success');
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