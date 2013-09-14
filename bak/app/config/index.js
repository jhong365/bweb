var config = {
	local : {
		mode : 'local',
		port : 3000,
		sbp : {
			host : 'http://localhost:8080/sbp/'			
		}
	},
	staging : {
		mode : 'stag',
		port : 4000,
		sbp : {
			host : 'http://localhost:8080/sbp'
		}
	},
	production : {
		mode : 'prod',
		port : 5000,
		sbp : {
			host : 'http://boostaa.elasticbeanstalk.com/api/',
			port : 80
		}
	}
};

module.exports = function(mode) {
	return config[mode || process.argv[2] || 'local'] || config.local;
};