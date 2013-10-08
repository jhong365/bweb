/*module.exports = function(orm, config) {
	return orm.express(config.database, {
		define : function(db, models) {
			require("fs").readdirSync("./models/").forEach(function(file) {
				var fileNoExt = file.substr(0, file.lastIndexOf('.'));
				var modelFileName = "../models/" + fileNoExt;
				console.log(modelFileName);
				db.load(modelFileName, function(err) {
					models[fileNoExt] = db.models[fileNoExt];
				});
			});

			// !!!If we wanna access models from req.models, then we need to
			// assign db models to models
			// doing models = db.models; will not help as it only changes the
			// current reference. We need
			// to assign the values one by one: (right now I comment it out so
			// we have to use req.db.models to access the models)
			// models.account = db.models.account;
			// models.profile = db.models.profile;

			db.sync();
		}
	});
};*/

var definedModels;
var modelsToLoad = [ 'account', 'profile', 'project_photo', 'project' ];
module.exports.define = function(db, models, next) {
	modelsToLoad.forEach(function(model) {
		var modelFileName = "../models/" + model;
		require(modelFileName)(db, models, next);
	});

	db.sync();
	defineModels = models;
};

module.exports.model = function(name) {
	return definedModels[name];
};