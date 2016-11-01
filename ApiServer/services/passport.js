//this service verifies that a user has permission to access
//protected resources.  Verifies either with a JWT or with a username and password

const Promise       = require('bluebird')
const passport      = require('passport')
const JwtStrategy   = require('passport-jwt').Strategy
const ExtractJwt    = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local')

const User         = require('./../DataModels/UserModel')
const SecretString = require('./../constants').JWT_SECRET

const localOptions = {usernameField: 'email'}

//create local strategy (username/password)
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {

  //verify username/password
  User.findOne({email}, (err, user) => {
    if (err) return done(err)
    if (!user) return done(null, false)

    //compare passwords - is password equal to user.password?
    user.comparePasswords(password, (err, isMatch) => {
      if (err) return done(err)
      if (!isMatch) return done(null, false)

      return done(null, user)
    })
  })
})


//set up options for JWT strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: SecretString,
}

//Create JWT strategy (strategies are plugins that work with Passport)
//payload is decoded jwt token (will have sub and iat props); done is callback to use when authenticated
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {

  Promise.coroutine(function*() {
    try {
      const user = yield User.findById(payload.sub)
      if (user) {
        done(null, user)
      } else {
        done(null, false)
      }
    } catch (err) {
      return done(err, false)
    }
  })()

  // User.findById(payload.sub)
  // .then(user => {
  // 	if (user) {
  // 		//if success, call done with our user
  // 		done(null, user)
  // 	} else {
  // 		//else call done without a user object
  // 		done(null, false)
  // 	}
  //  //don't forget .catch!
  // })


  // //see if the user ID in the payload exists in our database
  // User.findById(payload.sub, (err, user) => {
  // 	if (err) return done(err, false)
  // 	//done takes error as first parameter and user as second
  // 	if (user) {
  // 		//if success, call done with our user
  // 		done(null, user)
  // 	} else {
  // 		//else call done without a user object
  // 		done(null, false)
  // 	}
  // })
})


//tell passport to use this strategy
passport.use(jwtLogin)
passport.use(localLogin)
