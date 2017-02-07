var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var spotSchema = new Schema({
	id: {type:String},
	visitors: [{type:Schema.Types.ObjectId, ref: "User"}]	  
});

// userSchema.methods.comparePassword = function(submittedPassword, callback){
// 	bcrypt.compare(submittedPassword, this.password, function(error, isMatch){
// 		if(error){return callback(error)};

// 		callback(null, isMatch);
// 	})
// }


module.exports = mongoose.model('spot', spotSchema);

 
