const mongoose = require('mongoose')
const db = require('../db.js')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId
const userSchema = new Schema({
    // '_id': ObjectId,
    'personalID':String,
    'name': String,
    'email': String,
    'password':String,
    'picture_url':String,
    'login_via': String,
    'user_score': Number,
    'lasted_login' : String
}, {
  collection: 'user'
})

module.exports = db.model('user', userSchema)
