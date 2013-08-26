var BaseController = require("./Base"),
	View = require("../views/Base"),
	http = require('http'),
	request = require('request');

module.exports = BaseController.extend({ 
	name: "Index",
	content: null,
	run: function(req, res, next) {		
		var self = this;
		this.getContent(function() {			
			var v = new View(res, 'index');
			v.render(self.content);
		})
	},
	getContent: function(callback) {
		var self = this;
		this.content = {};
		
		var options = {
				  host: 'http://localhost',
				  port: 8080,
				  path: '/sbp/api/gig/list',
				  method: 'GET'
				};
		request('http://localhost:8080/sbp/api/gig/list', function (error, res, data) {
			  if (!error && res.statusCode == 200) {
			      console.log("Got response: " + res.statusCode);
			      data = JSON.parse(data); // you need to parse the JSON-string into real object
			      console.log(data); // inspect what you got
			      self.content.projects = data;
			      //res.render('index', { data: data });
			      callback();
			  }
			});

	}
});