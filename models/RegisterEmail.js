module.exports = function(db) {
	var RegisterEmail = db.define('register_email', {
		email   : { type : "text", size : 255, required : true },
		created : { type : "date", defaultValue: new Date()}
	});
	
	RegisterEmail.findByEmail = function(email, callback) {
		this.find({ email : email }, 1, function(err, emails) {
			if (!err && emails.length) {
				callback(err, emails[0]);
			} else {
				callback(err, null);
			}
		});
	};

	return RegisterEmail;
};