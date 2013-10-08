module.exports = function(db, models, next) {
	console.log('create account model');
	
	models.account = db.define("account", {
		email : String,
		password : String,
		role: { type: "enum", values: ["business", "promoter", "both"]},
		created : Date,
		updated : Date
	});
	
	models.account.findByEmail = function(email, callback) {
		  this.find({ email: email }, callback);
	};
	
    return next(); 
};

