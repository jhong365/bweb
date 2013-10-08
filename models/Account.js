module.exports = function(db) {
	var Account = db.define("account", {
		email : String,
		password : String,
		role : {
			type : "enum",
			values : [ "business", "promoter", "both" ]
		},
		created : {
			type : "date"
		},
		updated : {
			type : "date"
		}
	});

	Account.findByEmail = function(email, callback) {
		this.find({
			email : email
		}, 1, function(err, users) {
			if (!err && users.length) {
				var user = users[0];
				callback(err, user);
			} else {
				callback(err, null);
			}
		});
	};

	return Account;
};
