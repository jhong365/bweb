var orm = require("orm");
var opts = {
    database: "sbpdb",
    protocol: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "",
    query: {
        pool: true
    }
};
exports.db = orm.connect(opts, function(err, db) {
	if(err){
		console.log("##########");
		console.log(err);
		throw err;
	} else {
		db.sync();
		console.log("db sync");
	}
});
