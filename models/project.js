module.exports = function(db, models, next) {
	models.project = db.define('project', {
		title : {
			type : "text",
			size : 255,
			required : true
		},
		description : {
			type : "text",
			size : 20000
		},
		tags : {
			type : "text",
			size : 255
		},
		status : {
			type : "enum",
			values : [ "open", "close", "ongoing", "complete" ]
		},
		bidDays : {
			type : "number"
		},
		bidNum : {
			type : "number"
		},
		isPayCash : {
			type : "boolean"
		},
		cashAmount : {
			type : "number"
		}
	});

	return next();
};
