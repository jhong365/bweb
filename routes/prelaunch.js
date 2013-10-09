var models = require('../models');
var RegisterEmail = models.RegisterEmail;

exports.get = function(req, res) {
	res.render("prelaunch");
};

exports.post = function(req, res) {
	var email = req.body.email;
	console.log(email);
	if(!email){
		res.send(400);
	}
	
	RegisterEmail.findByEmail(email, function(err, data){
		if(err){
			console.log(err);
			res.send(500);
		}
		if(data){
			res.send(200); 
		} else {
			createNewEmail(email, res);
		}
	});
};

function createNewEmail(email, res){
	RegisterEmail.create({
		"email"   : email
	}, function(err, data){
		if(err){
			console.log(err);
			res.send(500);
		} else {
			res.send(200);
		}
	});
}