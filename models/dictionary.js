const mongoose = require('mongoose')
const db = require('../db.js')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId
const dictSchema = new Schema({
    
    'word':String,
    'word_type': String
}, {
  collection: 'dictionary'
})

module.exports = db.model('dictionary', dictSchema)
