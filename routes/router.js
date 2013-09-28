var user = require('./user');
var home = require('./index');
var profile = require('./profile');
var project = require('./project');
var qs = require('querystring');

module.exports = function(app,passport) {
	app.get('/', home.index);
	app.get('/users', user.list);
	app.get("/login", function(req, res){ 
		console.log(req.query);
		var redirect;
		if( req.query.redirect){
			redirect = req.query.redirect;
		} else {
			redirect = "";
		}
		res.render("login", {"redirect" :redirect});
	});
	app.get('/logout', function(req, res){
	  req.logout();
	  res.redirect('/');
	});

	// signup with social plugin
	app.get('/signup', user.signup);
	app.get('/registration', user.register);

	app.post('/signup', user.addNewAccount);

	app.post("/login", passport.authenticate('local', {failureRedirect : "/login"}),
		function(req, res) {
	    	res.redirect(req.body.redirect);
	  	});

	app.get('/profile', profile.profile);
	
	app.get('/project/new', ensureAuthenticated, project.create);
	app.get('/project/:id', project.get);
	app.post('/project', project.post);
};

function ensureAuthenticated(req, res, next) {
	  if (req.isAuthenticated()) { 
		  return next(); 
	  }
	  res.redirect('/login?' + qs.stringify({'redirect': req.url}));
}
