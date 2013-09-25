var development = {
	mode : 'local',
	port : 3000,
	sbp : {
		host : 'http://localhost:8080/bservice/api/',
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
	facebook : {
		clientID : "clientID",
		clientSecret : "clientSecret",
		callbackURL : "http://localhost:3000/auth/facebook/callback"
	}
};

exports.Config = global.process.env.NODE_ENV === 'prod' ? production
		: development;
