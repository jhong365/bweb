var db = require('../settings').db;
var ProjectPhoto = db.define('project_photo',{
	url : { type: "text", size: 255, required: true }
});

module.exports = ProjectPhoto;

