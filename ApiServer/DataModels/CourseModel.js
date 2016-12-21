const mongoose = require('mongoose')

const Schema = mongoose.Schema

// Define course model
const courseSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true
  }
})

// Create model class
const model = mongoose.model('course', courseSchema)

module.exports = model
