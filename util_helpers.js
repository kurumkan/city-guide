var oauthSignature = require('oauth-signature');  
var n = require('nonce')();  
var request = require('request');  
var qs = require('querystring');  
var _ = require('lodash');
var configs = require('./yelp.config.js');


module.exports = {	
	//handle internal errors
	handleError: function(response, error, type){
		console.log(error.stack);
		
		if(type=='YELP'){			
			response.status(400);
			response.json({error: "error: YELP api error"});						
		}
		else{
			response.status(500);
			response.json({error: "error: internal server error"});		
		}
	},
	
	/* make request to Yelp API
	* basic search
	*---------------------
	* set_parameters: object with params to search
 	* callback: callback(error, response, body)
 	*/
	requestYelp: function(set_parameters, callback) {

		/* The type of request */
		var httpMethod = 'GET';

		/* The url we are using for the request */
		var url = 'http://api.yelp.com/v2/search';

		/* We can setup default parameters here */
		var default_parameters = {
			location: 'San+Francisco',
			sort: '2'
		};

		/* We set the require parameters here */
		var required_parameters = {
			oauth_consumer_key : configs.oauth_consumer_key,
			oauth_token : configs.oauth_token,
			oauth_nonce : n(),
			oauth_timestamp : n().toString().substr(0,10),
			oauth_signature_method : 'HMAC-SHA1',
			oauth_version : '1.0'
		};

		/* We combine all the parameters in order of importance */ 
		var parameters = _.assign(default_parameters, set_parameters, required_parameters);

		/* We set our secrets here */
		var consumerSecret = configs.consumerSecret;
		var tokenSecret = configs.tokenSecret;

		/* Then we call Yelp's Oauth 1.0a server, and it returns a signature */
		/* Note: This signature is only good for 300 seconds after the oauth_timestamp */
		var signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret, { encodeSignature: false});

		/* We add the signature to the list of paramters */
		parameters.oauth_signature = signature;

		/* Then we turn the paramters object, to a query string */
		var paramURL = qs.stringify(parameters);

		/* Add the query string to the url */
		var apiURL = url+'?'+paramURL;

		/* Then we use request to send make the API Request */
		request(apiURL, function(error, response, body){
			return callback(error, response, body);
		});
	},

	//simple email validator
	validateEmail: function(email) {
	    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(email);
	}
}