const mongoose = require('mongoose')
const db = require('../db.js')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId
// const tweetsSchema = new Schema({
//     'tweet_idx': Number,
//     'tweet_text': String,
//     'first_location_found_in_text': [String],
//     'tweet_type': String,
//     'hasAnswer' : Boolean,
//     'ans_count': Number

// }, {
//   collection: 'covid_social_post'
// })
const covidPostSchema = new Schema({
    'index': Number,
    'post_text': String,
    'from_social': String,
    'post_date' : String,
    'author':  String,
    'has_answer':Boolean,
    'in_progress':Boolean
}, {
  collection: 'covid_social_post'
})

module.exports = db.model('covid_social_post', covidPostSchema)
