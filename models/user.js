var mongoose = require('mongoose');
var bcrypt=require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var userSchema = new Schema({
	username: {type: String, unique:true, lowercase: true, trim: true, sparse: true},
	email: {type: String, unique:true, lowercase: true, trim: true, sparse: true},
	password: {type: String, trim: true},	
    facebook: {
        fbid:{type: String, unique:true, trim: true, sparse: true},        
        displayName:{type: String,  trim: true},        
        profileUrl:{type: String, unique:true, trim: true, sparse: true}
    },
    vk: {
    	vkid: {type: String, unique:true, trim: true, sparse: true},        
    	displayName:{type: String,  trim: true},
    	profileUrl:{type: String, unique:true, trim: true, sparse: true}
    }
});


userSchema.pre('save', function(next){
	var user = this;

	//generate salt
	bcrypt.genSalt(10, function(error, salt){
		if(error)
			return next(error);
		
		//hash the password via bcrypt
		bcrypt.hash(user.password, salt, null, function(error, hash){
			if(error)
				return next(error);

			user.password=hash;
			next();
		})
	})
})

//define a new function on userSchema
userSchema.methods.comparePassword = function(submittedPassword, callback){
	bcrypt.compare(submittedPassword, this.password, function(error, isMatch){
		if(error){return callback(error)};

		callback(null, isMatch);
	})
}


var ModelClass = mongoose.model('user', userSchema);

module.exports = ModelClass;
