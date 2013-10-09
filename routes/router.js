var user = require('./user');
var home = require('./index');
var prelaunch = require('./prelaunch');
var profile = require('./profile');
var project = require('./project');
var qs = require('querystring');

module.exports = function(app,passport) {
	//prelaunch email register
	app.get('/', prelaunch.get);
	app.post('/', prelaunch.post);
	
	app.get('/home', home.index);
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

	// dashboad
	app.get('/dashboard',ensureAuthenticated, user.dashboard);
	app.post('/signup', user.addNewAccount);
	app.post('/bip/create', ensureAuthenticated, user.createBip);
	app.post('/bip/edit', ensureAuthenticated, user.editBip);
	app.post('/bip/delete', ensureAuthenticated, user.deleteBip);
	
	app.post("/login", passport.authenticate('local', {failureRedirect : "/login"}),
		function(req, res) {
	    	res.redirect(req.body.redirect);
	  	});

	app.get('/profile', profile.profile);
	app.post('/profile', profile.post);
	
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
