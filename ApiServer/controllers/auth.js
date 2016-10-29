const jwt = require('jwt-simple')

const SecretString = process.env.JWT_SECRET || require('./../config').JWT_SECRET
const User = require('../DataModels/UserModel')

function generateToken(user) {
	const timestamp = new Date().getTime()
	//encoding id because every user has a unique, unchanging ID
	return jwt.encode({ sub: user.id, iat: timestamp }, SecretString) //sub stands for subject; who token belongs to
																																		// iat stands for 'issued at time'
}

//passed in parameters from the router
function signup(req, res, next) {
	const email = req.body.email
	const password = req.body.password

	if (!email || !password) return res.status(422).send({error: 'Must provide email and password'})

	//see if the given email already exists, if so return err
	//NOTE: also have the option to use promises instead of callbacks here
	User.findOne({email: email}, (err, existingUser) => { //if not found, existingUser is null
		if (err) {
			return next(err)
		}
		if (existingUser) {
			return res.status(422).send({error: 'Email is in use'}) //422 is unprocessable entity
		}

		//else create and save user record
		//creates user
		const user = new User({
			email,
			password
		})

		//saves user, done with Promises, else just use an error first calback like user.save(err => {})
		user.save()
		.then(() => {
			//respond to request with a token the user can use to identify himself
			res.json({token: generateToken(user)})
		})
		.catch(err => {
			return next(err)
		})
	})
}

function signin(req, res, next) {
	//user already has their email and password authenitcated (by passport service); just need token
	//user is set to req.user by passport's `done` method
	res.send({token: generateToken(req.user)})
}


module.exports.signin = signin
module.exports.signup = signup
