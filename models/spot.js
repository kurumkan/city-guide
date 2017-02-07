var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var spotSchema = new Schema({
	id: {type:String},
	visitors: [{type:Schema.Types.ObjectId, ref: "User"}]	  
});

module.exports = mongoose.model('spot', spotSchema);

 
