const passport = require('passport')

const auth            = require('./controllers/auth')
const passportService = require('./services/passport') //passport.use gets called at the end of this file

//requireAuth is our authentication middleware
//when a user is authenticated with JWT or local, don't create a cookie-based user session
const requireAuth   = passport.authenticate('jwt', {session: false})
const requireSignin = passport.authenticate('local', {session: false})

function router(app) {
	app.get('/', (req, res, next) => {
		res.sendFile(__dirname+'/index.html');
	})
	//any incoming request must pass requireAuth - acts as middleware to 'intercept'
	app.post('/signin', requireSignin, auth.signin)
	app.post('/tester', requireAuth, (req, res) => {
		res.send(`you've accessed a protected resource!`)
	})
	app.post('/signup', auth.signup)
}

module.exports = router
