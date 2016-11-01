//entry point of application

//Dependencies
const express    = require('express')
const mongoose   = require('mongoose')
const http       = require('http')
const bodyParser = require('body-parser')
const morgan     = require('morgan')
const passport   = require('passport')
const path       = require('path')
const cors       = require('cors')

const router = require('./router')

//Initialize express app
const app = express()


//DB Setup
const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:apiserver/apiserver'
mongoose.connect(dbUri)


//App Setup - Middleware
app.use(morgan('combined')) //logger
app.use(cors()) //allow access from any origin
app.use(bodyParser.json({type: '*/*'})) //parses incoming requests into JSON
router(app)
app.use(express.static(path.join(__dirname, 'public')))

//Server Setup
const port = process.env.PORT || 3090
//app handles http requests coming in from server
const server = http.createServer(app)
server.listen(port)

console.log(`Server listening on ${port}...`)
