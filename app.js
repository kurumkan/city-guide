var express = require("express");
var app = express();
var path =require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var {handleError, requestYelp} = require("./util_helpers.js");


mongoose.connect("mongodb://localhost/cityguide");
var User = require('./models/user');


app.use(function(req, res, next){
	if(req.headers["x-forwarded-proto"] === "https"){		
		res.redirect("http://"+req.hostname+req.url);
	}else{		
		next();
	}
});

app.use(express.static(__dirname + '/frontend/public'));
app.use(bodyParser.json({type:'*/*'}));


//auth dependencies
var Auth = require('./auth/authentication');
var PassportServicer = require('./auth/passport');
var passport = require('passport');
var requireAuth = passport.authenticate('jwt', {session: false});
var requireSignin = passport.authenticate('local', {session: false});

//auth routes

//facebook login
app.use(passport.initialize());
app.get('/auth/facebook', passport.authenticate('facebook', {scope:['email']}));
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/signin' }),
    function(req, res) { 
    	var user = req.user;
    	var token=Auth.getToken(user); 
        res.redirect('/?token='+token+'&username='+user.facebook.displayName+'&userid='+user._id);     	
});

//twitter login
app.get('/auth/vk', passport.authenticate('vkontakte'));

app.get('/auth/vk/callback',
    passport.authenticate('vkontakte', { failureRedirect: '/signin'}),
    function(req, res) { 
    	var user = req.user;
    	var token=Auth.getToken(user); 
        res.redirect('/?token='+token+'&username='+user.vk.displayName+'&userid='+user._id);     	        
});


//jwt login
app.post('/auth/signup', Auth.signup);
app.post('/auth/signin', requireSignin, Auth.signin);


app.get("/api/spots", function(request, response){		
	var location = request.query.location,
		offset = request.query.offset,
		sort = request.query.sort,
		category_filter = request.query.category_filter;			

	var params = {
		location: location||'London',
		limit: 12,
		offset: offset||0,		
		sort: !sort||sort==0?sort:2,
		category_filter: category_filter||'bars'
	};	
	//making a request to Yelp api
	requestYelp(params, function(error, res, body){
		if(error){
			handleError(response, error, 'YELP');
		}else{
			body = JSON.parse(body);	
			if(body.error){
				var error = {
					stack: body.error
				}				
				handleError(response, error, 'YELP');	
			}else{			
				response.json({
					businesses: body.businesses,
					latitude: body.region.center.latitude,
					longitude: body.region.center.longitude,
					total: body.total
				});			
			}			
		}
	});	
});

app.get('*', function (request, response){		
	response.sendFile(path.resolve(__dirname, './frontend/public', 'index.html'))
});

app.set("port", process.env.PORT||5000);

app.listen(app.get("port"), function(){
	console.log("Server started");
})