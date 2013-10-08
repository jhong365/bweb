var development = {
	mode : 'local',
	port : 3000,
	sbp : {
		host : 'http://localhost:8080/bservice/api/',
	},
	database : {
			database : "boostaa-test",
			protocol : "mysql",
			host : "127.0.0.1",
			port : 3306,
			username : "root",
			password : "summer1999@",
			query : {
				pool : true
			}
		},
		
	facebook : {
		clientID : "clientID",
		clientSecret : "clientSecret",
		callbackURL : "http://localhost:3000/auth/facebook/callback"
	}
};
var production = {
	mode : 'production',
	port : process.env.NODE_ENV || 8080,
	sbp : {
		host : 'http://boostaa.elasticbeanstalk.com/api/',
		port : 80
	},
	database : {
		database : "boostaa-test",
		protocol : "mysql",
		host : "127.0.0.1",
		port : 3306,
		username : "root",
		password : "summer1999@",
		query : {
			pool : true
		}
	},
	connectionString: "mysql://root:summer1999@@localhost/boostaa-test",
	facebook : {
		clientID : "clientID",
		clientSecret : "clientSecret",
		callbackURL : "http://localhost:3000/auth/facebook/callback"
	}
};

exports.Config = global.process.env.NODE_ENV === 'prod' ? production
		: development;
