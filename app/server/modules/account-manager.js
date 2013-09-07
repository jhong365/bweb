var crypto = require('crypto');
var moment = require('moment');
var request = require('request');
queryString = require('querystring');

default_headers = {
	'User-Agent' : 'Mozilla/5.0 (X11; Linux i686; rv:7.0.1) Gecko/20100101 Firefox/7.0.1',
	'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
	'Accept-Language' : 'en-us,en;q=0.5',
	'Accept-Encoding' : 'gzip, deflate',
	'Accept-Charset' : 'ISO-8859-1,utf-8;q=0.7,*;q=0.7',
	// 'Connection': 'keep-alive',
	'Cache-Control' : 'max-age=0'
};
var config = require('../../config')('prod');
var loginUrl = config.sbp.host + 'api/account/login';

/* login validation methods */

exports.autoLogin = function(user, pass, callback) {
	var getUserUrl = config.sbp.host + 'api/account/get';

	var parameter = queryString.stringify({
		email : user
	});

	request({
		url : getUserUrl,
		headers : default_headers,
		method : 'POST',
		body : parameter
	}, function(err, res, body) {
		if (!err && res.statusCode == 200) {
			// successfully get the account, now verify the password	
			var account = JSON.parse(body);
			account.password == pass ? callback(account) : callback(null);	
		} else {			
			callback('account-not-found');
		}
	});
};

exports.manualLogin = function(user, pass, callback) {
	var getUserUrl = config.sbp.host + 'api/account/get';

	var parameter = queryString.stringify({
		email : user
	});

	request({
		url : getUserUrl,
		headers : default_headers,
		method : 'POST',
		body : parameter

	}, function(err, res, body) {
		if (!err && res.statusCode == 200) {
			// successfully get the account, now verify the password
			var account = JSON.parse(body);
			validatePassword(pass, account.password, function(err, res) {
				if (res){
					callback(null, account);
				}	else{
					callback('invalid-password');
				}
			});	
		
		} else {			
			callback('account-not-found');
		}
	});
};

/* record insertion, update & deletion methods */

exports.addNewAccount = function(newData, callback) {
	// make the salt
	saltAndHash(newData.pass, function(hash) {
		newData.pass = hash;
		// append date stamp when record was created //
		// newData.date = moment().format('MMMM Do YYYY, h:mm:ss a');
		// accounts.insert(newData, {safe: true}, callback);
	});

	var parameter = queryString.stringify({
		email : newData.email,
		password : newData.pass,
		isNew : true,
	});

	request({
		url : loginUrl,
		headers : default_headers,
		method : 'POST',
		body : parameter

	}, function(err, res, body) {
		if (!err && res.statusCode == 200) {
			callback();
		} else {
			// body contains the error code
			callback(body);
		}
	});
};

exports.updateAccount = function(newData, callback) {
	/*accounts.findOne({
		user : newData.user
	}, function(e, o) {
		o.name = newData.name;
		o.email = newData.email;
		o.country = newData.country;
		if (newData.pass == '') {
			accounts.save(o, {
				safe : true
			}, function(err) {
				if (err)
					callback(err);
				else
					callback(null, o);
			});
		} else {
			saltAndHash(newData.pass, function(hash) {
				o.pass = hash;
				accounts.save(o, {
					safe : true
				}, function(err) {
					if (err)
						callback(err);
					else
						callback(null, o);
				});
			});
		}
	});*/
};

exports.updatePassword = function(email, newPass, callback) {
	/*accounts.findOne({
		email : email
	}, function(e, o) {
		if (e) {
			callback(e, null);
		} else {
			saltAndHash(newPass, function(hash) {
				o.pass = hash;
				accounts.save(o, {
					safe : true
				}, callback);
			});
		}
	});*/
};

/* account lookup methods */

exports.deleteAccount = function(id, callback) {
};

exports.getAccountByEmail = function(email, callback) {	
};

exports.validateResetLink = function(email, passHash, callback) {
	/*accounts.find({
		$and : [ {
			email : email,
			pass : passHash
		} ]
	}, function(e, o) {
		callback(o ? 'ok' : null);
	});*/
};

exports.getAllRecords = function(callback) {
	/*accounts.find().toArray(function(e, res) {
		if (e)
			callback(e)
		else
			callback(null, res)
	});*/
};

exports.delAllRecords = function(callback) {
	//accounts.remove({}, callback); // reset accounts collection for testing //
};

/* private encryption & validation methods */

var generateSalt = function() {
	var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
	var salt = '';
	for ( var i = 0; i < 10; i++) {
		var p = Math.floor(Math.random() * set.length);
		salt += set[p];
	}
	return salt;
};

var md5 = function(str) {
	return crypto.createHash('md5').update(str).digest('hex');
};

var saltAndHash = function(pass, callback) {
	var salt = generateSalt();
	callback(salt + md5(pass + salt));
};

var validatePassword = function(plainPass, hashedPass, callback) {
	var salt = hashedPass.substr(0, 10);
	var validHash = salt + md5(plainPass + salt);
	callback(null, hashedPass === validHash);
};

/* auxiliary methods */

var getObjectId = function(id) {
	return accounts.db.bson_serializer.ObjectID.createFromHexString(id);
};

var findById = function(id, callback) {
	accounts.findOne({
		_id : getObjectId(id)
	}, function(e, res) {
		if (e)
			callback(e);
		else
			callback(null, res);
	});
};

var findByMultipleFields = function(a, callback) {
	// this takes an array of name/val pairs to search against {fieldName :
	// 'value'} //
	accounts.find({
		$or : a
	}).toArray(function(e, results) {
		if (e)
			callback(e);
		else
			callback(null, results);
	});
};
