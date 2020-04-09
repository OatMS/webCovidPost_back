const mongoose = require('mongoose')
const db = require('../db.js')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId
const apilogSchema = new Schema({
    // '_id': ObjectId,
    'key_text': String,
    'key_name': String,
    'createat': String,
    'response_status': String
}, {
  collection: 'api_log'
})

module.exports = db.model('api_log', apilogSchema)
