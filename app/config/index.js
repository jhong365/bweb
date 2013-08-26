var config = {
	local : {
		mode : 'local',
		port : 3000,
		sbp : {
			host : 'http://localhost:8080/sbp/'			
		}
	},
	staging : {
		mode : 'staging',
		port : 4000,
		sbp : {
			host : 'http://localhost:8080/sbp'
		}
	},
	production : {
		mode : 'production',
		port : 5000,
		sbp : {
			host : 'http://localhost/sbp',
			port : 8080
		}
	}
}
module.exports = function(mode) {
	return config[mode || process.argv[2] || 'local'] || config.local;
}