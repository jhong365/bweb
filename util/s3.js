
var fs = require('fs');
var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config/aws.json');

exports.upload = function(key, path){
	var data = {Key: key , Body: fs.createReadStream(path), ACL:"public-read"};
	var s3bucket = new AWS.S3({params: {Bucket: 'boostaa'}});
	console.log("Uploading file: " + key);
	s3bucket.putObject(data, function(err, data) {
	    if (err) {
	      console.log("Error uploading file: ", err);
	    } else {
	      console.log("Successfully uploaded file to S3: " + key);
	    }
	 });
};

exports.baseUrl = "http://s3-us-west-2.amazonaws.com/boostaa/";