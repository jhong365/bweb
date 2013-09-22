var user = require('./user');
var home = require('./index');
var profile = require('./profile');

module.exports = function(app,passport) {
	app.get('/', home.index);
	app.get('/users', user.list);
	app.get("/login", function(req, res){ 
		res.render("login");
	});
	app.get('/logout', function(req, res){
		  req.logout();
		  res.redirect('/');
		});

	// signup with social plugin
	app.get('/signup', user.signup);
	app.get('/registration', user.register);

	app.post('/signup', user.addNewAccount);

	app.post("/login", passport.authenticate('local', {
		successRedirect : "/",
		failureRedirect : "/login",
		failureFlash: true
	}));

	app.get('/profile', profile.profile);
};