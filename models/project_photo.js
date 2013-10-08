module.exports = function(db, models, next) {
	models.profoject_photo = db.define('project_photo', {
		url : {
			type : "text",
			size : 255,
			required : true
		}
	});

	return next();
};
