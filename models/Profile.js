module.exports = function(db) {
	return db.define("profile", {
		avatar : String,
		balance : String,
		fbId : String,
		fbToken : String,
		name : String,
		point : String,
		description : String,
		created : Date,
		updated : Date
	});
};