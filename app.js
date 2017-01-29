var express = require("express");
var app = express();
var path =require("path");


var {handleError, requestYelp} = require("./util_helpers.js");

app.use(function(req, res, next){
	if(req.headers["x-forwarded-proto"] === "https"){		
		res.redirect("http://"+req.hostname+req.url);
	}else{		
		next();
	}
});

app.use(express.static(__dirname + '/frontend/public'));

app.get("/api/spots", function(request, response){	
	var location = request.query.location,
		offset = request.query.offset,
		sort = request.query.sort,
		category_filter = request.query.category_filter;			

	var params = {
		location: location||'London',
		limit: 10,
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
					longitude: body.region.center.longitude
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