var jwt = require('jwt-simple');

var config = require('../config');
var User = require('../models/user');
var {validateEmail} = require("../util_helpers");

var getToken = function(user){
	var timestamp = new Date().getTime();	
	return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.getToken = getToken;


exports.signup = function(request, response, next){	
	var {username, email, password} = request.body;		
	
	if(!username || !email || !password)
		response.status(422).json({error: 'You must provide a username, an email and a password'});

	if(!validateEmail(email))
		response.status(422).json({error: 'Invalid email'});
	
	//see if a user exists
	User.findOne({$or: [{email: email}, {username: username}]}, function(error, user){
		
		if(error){			
			return next(error);
		}
		if(user){			
			//if a user exists - return error
			//unprocessable entity
			return response.status(422).send({error:'The Email or the Username is in use'});
		}
		else{			
			//if a user doesnt exist - create one db entry
			var newUser = new User({
				username,
				email,
				password
			});
			newUser.save(function(error){
				if(error)
					return next(error);
				else
					response.json({token: getToken(newUser), username: newUser.username, userid: newUser.id});
			});
			
		}
	});	
}


exports.signin = function(request, response, next){
	//At this stage user has authorized their password and email
	//we need give a token!
	var user = request.user;		
	response.send({token: getToken(user), username: user.username, userid: user.id})
}