// entry point of application

//Dependencies
import express     = require('express')
import http        =require( 'http')
import bodyParser  =require( 'body-parser')
import morgan      =require( 'morgan')
import passport    =require( 'passport')
import path       =require( 'path')
import cors        =require( 'cors')
import bluebird from 'bluebird'

import router from './router'
import { PORT, MONGO_URI } from './constants'
import socketServer from './socketserver'

//Initialize express app
const app = express()

//Since our node server is behind an nginx reverse proxy, we need to set it to
//correctly register the client's IP address
app.set('trust proxy', 'loopback')

//DB Setup
const dbUri = process.env.MONGODB_URI || MONGO_URI

//App Setup - Middleware
app.use(morgan('combined')) //logger
app.use(cors()) //allow access from any origin
app.use(bodyParser.json({type: '*/*'})) //parses incoming requests into JSON
router(app)
app.use(express.static(path.join(__dirname, '..', 'public')))

//Server Setup
const port = process.env.PORT || PORT
//app handles http requests coming in from server
const server = http.createServer(app)
//get websockets working
socketServer(server)

server.listen(port)

console.log(`Server listening on ${port}...`)
