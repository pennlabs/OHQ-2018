// This file is the entry point for server
const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const path = require('path')
const cors = require('cors')

const router = require('./router')
const { PORT } = require('./constants')
const socketServer = require('./socketserver')

// Initialize express app
const app = express()

// Since our node server is behind an nginx reverse proxy, we need to set it to
// correctly register the client's IP address
app.set('trust proxy', 'loopback')

//App Setup - Middleware
app.use(morgan('combined')) //logger
app.use(cors()) //allow access from any origin
app.use(bodyParser.json({ type: '*/*' })) //parses incoming requests into JSON
router(app)
app.use(express.static(path.join(__dirname, 'public')))

const port = process.env.PORT || PORT
const server = http.createServer(app)

// get websockets working
socketServer(server)

server.listen(port)

console.log(`Server listening on ${port}...`)
