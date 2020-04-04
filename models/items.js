const mongoose = require('mongoose')
const db = require('../db.js')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId
const itemSchema = new Schema({
    
    'word':String
}, {
  collection: 'items_word'
})

module.exports = db.model('items_word', itemSchema)
