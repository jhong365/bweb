var crypto = require('crypto');

exports.saltAndHash = function(pass, callback) {
		var salt = generateSalt();
		callback(salt + md5(pass + salt));
};

exports.default_headers = {
		'User-Agent' : 'Mozilla/5.0 (X11; Linux i686; rv:7.0.1) Gecko/20100101 Firefox/7.0.1',
		'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
		'Accept-Language' : 'en-us,en;q=0.5',
		'Accept-Encoding' : 'gzip, deflate',
		'Accept-Charset' : 'ISO-8859-1,utf-8;q=0.7,*;q=0.7',
		// 'Connection': 'keep-alive',
		'Cache-Control' : 'max-age=0'
	};


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

exports.validatePassword = function(plainPass, hashedPass, callback) {
	var salt = hashedPass.substr(0, 10);
	var validHash = salt + md5(plainPass + salt);
	callback(null, hashedPass === validHash);
};
