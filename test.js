var {requestYelp} = require("./util_helpers.js");


var params={
	location: 'moscow',
	sort: '2'	
};

var myfunc = function(error, response, body){
	
	console.log('body', body);
};

requestYelp(params, myfunc);