const path = require('path')

function router(app) {
  app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', '/index.html'))
  })
  app.get('/:route', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', '/index.html'))
  })
}

export default router
