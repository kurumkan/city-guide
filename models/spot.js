var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var spotSchema = new Schema({
	//id! not _id. id comes from yelp api
	id: {type:String},	
	visitors: [{type:Schema.Types.ObjectId, ref: "User"}]	  
});

module.exports = mongoose.model('spot', spotSchema);

 
