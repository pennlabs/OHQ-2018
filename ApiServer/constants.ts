//this file holds local application constants
//most of this config should be set in environment variables in production
import path = require('path')

export const JWT_SECRET = 'Pennlabs'
export const MONGO_URI = 'mongodb://localhost:apiserver/apiserver'
export const PORT = 3090
export const HTML_PATH = path.join(__dirname, '../..', 'index.html')
