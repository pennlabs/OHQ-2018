const passport = require('passport')
const path = require('path')

// Every route requested serves the same file - app routing
// is handled on the frontend.
function router(app) {
  app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '/index.html'))
  })
  app.get('/:route', (req, res, next) => {
    res.sendFile(path.join(__dirname, '/index.html'))
  })
}

module.exports = router
