var express = require("express");
var app = express();
var path =require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var {handleError, requestYelp} = require("./util_helpers.js");


mongoose.connect("mongodb://localhost/cityguide");
var User = require('./models/user');
var Spot = require('./models/spot');


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
		console.log('request!!')
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
				var businesses = body.businesses;
				var ids = businesses.map((b)=>b.id);

				// Spot.create({
				// 		visitors: [mongoose.Types.ObjectId('5899e304c8641a431150c3b3')],
				// 				   id: 'gordons-wine-bar-london-4'	
				// 	}, function(error, spot){

				// });				
				
				Spot.find({
						'id':{$in: ids}
					},
					function(error, docs){
						console.log('insidefunction')
						if(error)
							handleError(request, error);
						else{							
							for(var i=0; i<businesses.length; i++){
								for(j=0; j<docs.length; j++){
									if(businesses[i].id==docs[j].id){
										businesses[i].visitors = docs[j].visitors;
										docs.splice(j,1);
										break;
									}
								}								
							}							
						}
						response.json({
							businesses: businesses,
							latitude: body.region.center.latitude,
							longitude: body.region.center.longitude,
							total: body.total
						});			
					}
				);
			}			
		}
	});	
});

app.put('/api/spots/:id', requireAuth, function(request, response){
	var id = request.params.id;
	console.log(id)
	
	Spot.findOneAndUpdate({id:id}, {upsert: true},function(error, spot){
		if(error){								
			handle500(response, error);		
		}else{
			var userId=request.user._id;
			console.log(spot)
			spot.visitors.push(userId);
			spot.save();

			response.json({id: spot.id});									
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