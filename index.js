var express = require("express");
var app = express();
var path =require("path");


var {handle500} = require("./util_helpers.js");

app.use(function(req, res, next){
	if(req.headers["x-forwarded-proto"] === "https"){		
		res.redirect("http://"+req.hostname+req.url);
	}else{		
		next();
	}
});

app.use(express.static(__dirname + '/frontend/public'));

app.get("/api", function(request, response){			
	
	response.json({response: 'all is well!'});					
	
});

app.get('*', function (request, response){	
	console.log(request.url);
	response.sendFile(path.resolve(__dirname, './frontend/public', 'index.html'))
});

app.set("port", process.env.PORT||5000);

app.listen(app.get("port"), function(){
	console.log("Server started");
})