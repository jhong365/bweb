var db = require('../settings').db;
var Account = db.define('account',{
	email    : { type: "text", size: 255, required: true },
	password : { type: "text", size: 255, required: true },
	role     : { type: "number", rational: false, size: 1}
});

module.exports = Account;