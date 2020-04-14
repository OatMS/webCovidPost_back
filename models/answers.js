const mongoose = require('mongoose')
const db = require('../db.js')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId
const answersSchema = new Schema({
    // '_id': ObjectId,
    'post_id': ObjectId,
    'post_text': String,
    'post_date': String,
    'tweet_text': String,
    'text_tagged':  String,
    'text_type': String, // tweet or facebook
    'ans':{
        'contact_address': [
          {
            'obj_text': String,
            'start_position':Number,
            'end_position':Number,
            'extracted_by':String
          }
        ], //ที่อยู่
        'organize_name':[
          {
            'obj_text': String,
            'start_position':Number,
            'end_position':Number,
            'extracted_by':String
          }
        ], //หน่วยงานที่ขอรับบริจาค
        'purpose_message':String, //จุดประสงค์ของข้อความ 'ร้องขอความช่วยเหลือ' หรือ 'เสนอความช่วยเหลือ'
        // 'requester_or_helper':String, //ชื่อคนขอความช่วยเหลือ หรือ ชื่อคนเสนอตวามช่วยเหลือ
        'items':[
          {
            'obj_text': String,
            'start_position':Number,
            'end_position':Number,
            'number_request': Number,
            'extracted_by':String
          }
        ] //สิ่งของที่ร้อขอ หรือเสนอ
      }
    ,
    'score': Number,
    'is_related': Boolean,
    'ans_from_account_id':String,
    'ans_from_account': String,
    'ans_datetime': String,
    'ans_last_update': String
}, {
  collection: 'answers_covid'
})

module.exports = db.model('answers', answersSchema)
