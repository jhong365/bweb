var orm = require('orm');
var config = require('../config/config').Config;

// initialize database connection
var db = orm.connect(config.database, function(err, db) {
	if (err) {
		console.log('##########');
		console.log(err);
		throw err;
	} else {
		db.sync();
		console.log('db sync');
	}
});

// load models
var models = [ 'Account', 'Profile', 'Project', 'ProjectPhoto' ];
models.forEach(function(model) {
	var modelPath = __dirname + '/' + model;
	module.exports[model] = require(modelPath)(db);
});

// describe relationships
(function(m) {
	m.Project.hasOne("account", m.Account, {
		required : true
	});
	m.ProjectPhoto.hasOne("project", m.Project, {
		reverse : "photos",
		required : true,
		autoFetch : true
	});
})(module.exports);

// export connection
module.exports.db = db;
