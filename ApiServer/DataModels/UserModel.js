const bcrypt   = require('bcrypt-nodejs')
const mongoose = require('mongoose')

const Schema = mongoose.Schema

//Define user model
const userSchema = new Schema({
	email: {
		//configuration options
		type: String, //javascript string
		unique: true,
		lowercase: true,
		// required: true,
	},
	password: String //fields can be objects or just the type
})

//on save hook, encrypt password
userSchema.pre('save', function(next) {
	const user = this

	//generate a salt
	bcrypt.genSalt(10, (err, salt) => {
		if (err) return next(err)

		//hash/encrypt our password using the salt
		bcrypt.hash(user.password, salt, null, (err, hash) => { //hash here is the hashed password
			if (err) return next(err)

			//overwrite plaintext password with encrypted password
			user.password = hash
			next()
		})
	})
})

//attach methods to all user objects
userSchema.methods.comparePasswords = function(candidatePassword, cb) {
	//NOTE: in this context, `this` is a reference to the user
	bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
		if (err) return cb(err)

		cb(null, isMatch)
	})
}

//create model class
const model = mongoose.model('user', userSchema) //loads the schema into mongoose

//export model
module.exports = model
