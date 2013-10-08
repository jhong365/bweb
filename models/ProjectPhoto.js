module.exports = function(db) {
	var ProjectPhoto = db.define('project_photo', {
		url : {
			type : "text",
			size : 255,
			required : true
		}
	});

	return ProjectPhoto;
};