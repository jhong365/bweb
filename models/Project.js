var Account = require('./account');
var ProjectPhoto = require('./project_photo');

var db = require('../settings').db;

var Project = db.define('project',{
	title       : { type: "text", size: 255, required: true },
	description : { type: "text", size: 20000 },
	tags        : { type: "text", size: 255 },
	status      : { type: "enum", values: ["open", "close", "ongoing", "complete"]},
	bidDays     : { type: "number", rational: false, size: 1},
	bidNum      : { type: "number", rational: false, size: 1},
	isPayCash   : { type: "boolean"},
	cashAmount  : { type: "number" }
}, {autoFetch : true});

Project.hasOne("account", Account, { required: true});
// Project.hasMany("accounts", Account);
// Project.hasMany("photos", ProjectPhoto);
ProjectPhoto.hasOne("project", Project, { reverse: "photos", required: true , autoFetch : true});

module.exports = Project;

