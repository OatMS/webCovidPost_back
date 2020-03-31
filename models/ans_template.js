
var ans_template= 
{
    'post_id': ObjectId,
    'post_text': String,                // ข้อความที่ post
    'post_date': String,                // วันที่ post
    'text_type': String,                // twitter,facebook,instargram
    'text_tagged':  String,             // ข้อความที่ถูกใส่  tag ครอบข้อมูลที่ผู้ใช้เลือก <organize_name>รพ.รามา</organize_name>
    'ans':{
        'contact_address': [            // ที่อยู่ที่สามารถติดต่อได้
          {
            'text': String,             //  ข้อความระบุที่อยู่
            'start_offset':Number,      //  ตำแหน่งเริ่มต้นของข้อความความในเนื้อหาที่โพส
            'end_offset':Number         //  ตำแหน่งสิ้นสุดของข้อความความในเนื้อหาที่โพส
          }
        ], 
        'organize_name':[               // หน่วยงานที่ขอรับบริจาค
          {
            'text': String,             // ชื่อหน่วยงาน
            'start_offset':Number,
            'end_offert':Number
          }
        ], 
        
        'purpose_message':String,        // จุดประสงค์ของข้อความ Request,Response,Service,etc 
        'items':[      // สิ่งของที่ร้อขอ หรือเสนอ
          {
            'text': String,             // ข้อความระบุสิ่งของ
            'start_offset':Number,      // ตำแหน่งเริ่มต้นของข้อความความในเนื้อหาที่โพส
            'end_offert':Number,        // ตำแหน่งสิ้นสุดของข้อความความในเนื้อหาที่โพส
            'number_request': Number    // จำนวนของสิ่งของชิ้นนั้น (สามารถเป็น null ได้)
          }
        ] 
      }
    ,
    'ans_from_account_id':String,       // _id ของผู้ตอบ
    'ans_from_account': String,         // ชื่อของผู้ตอน
}



var ans_template_sample= 
{
    'post_id': '',
    'post_text': 'ขอรับบริจาครพ.ทุ่งยางแดง จ.ปัตตานีด้วยน่ะคร้าmask N95 ชุดPPE Mask surgical เราขาดมากๆๆเลยคร้า คนไข้เสี่ยงงกลับจากมาเลเซียเยอะมากคร้าช่วยพวกเราด้วยน่ะคร้าเราลำบากมากคร้าmaskต้องเย็บเอง faceshielต้องทำเอง. ผู้รับผิดชอบนางสาวนาดียะห์ ดอเลาะ แผนกห้องคลอด 0936482284. @naphat_nine 🙏🙏😭😭😭',                
    
    'post_type': 'Instargram',                // twitter,facebook,instargram
    'post_date': 'Sunday, March 29, 2020 2:28 AM',
    'text_tagged':  'ขอรับบริจาค<organize_name>รพ.ทุ่งยางแดง จ.ปัตตานี</organize_name>ด้วยน่ะคร้า<items>mask N95</items> <items>ชุดPPE</items> <items>Mask surgical</items> เราขาดมากๆๆเลยคร้า คนไข้เสี่ยงงกลับจากมาเลเซียเยอะมากคร้าช่วยพวกเราด้วยน่ะคร้าเราลำบากมากคร้าmaskต้องเย็บเอง faceshielต้องทำเอง. ผู้รับผิดชอบ<contact_address>นางสาวนาดียะห์ ดอเลาะ แผนกห้องคลอด 0936482284</contact_address>. @naphat_nine 🙏🙏😭😭😭',             
    'ans':{
        'contact_address': [            // ที่อยู่ที่สามารถติดต่อได้
          {
            'text': 'นางสาวนาดียะห์ ดอเลาะ แผนกห้องคลอด 0936482284',             //  ข้อความระบุที่อยู่
            'start_offset':216,      //  ตำแหน่งเริ่มต้นของข้อความความในเนื้อหาที่โพส
            'end_offset':261         //  ตำแหน่งสิ้นสุดของข้อความความในเนื้อหาที่โพส
          }
        ], 
        'organize_name':[               // หน่วยงานที่ขอรับบริจาค
          {
            'text': 'รพ.ทุ่งยางแดง จ.ปัตตานี',             // ชื่อหน่วยงาน
            'start_offset':11,
            'end_offert':34
          }
        ], 
        
        'purpose_message': 'Resuest',       // จุดประสงค์ของข้อความ Request,Response,Service,etc 
        'items':[      // สิ่งของที่ร้อขอ หรือเสนอ
          {
            'text': 'mask N95',             // ข้อความระบุสิ่งของ
            'start_offset':45,      // ตำแหน่งเริ่มต้นของข้อความความในเนื้อหาที่โพส
            'end_offert':53,        // ตำแหน่งสิ้นสุดของข้อความความในเนื้อหาที่โพส
            'number_request': null    // จำนวนของสิ่งของชิ้นนั้น (สามารถเป็น null ได้)
          },
          {
            'text': 'ชุดPPE',             // ข้อความระบุสิ่งของ
            'start_offset':45,      // ตำแหน่งเริ่มต้นของข้อความความในเนื้อหาที่โพส
            'end_offert':60,        // ตำแหน่งสิ้นสุดของข้อความความในเนื้อหาที่โพส
            'number_request': null    // จำนวนของสิ่งของชิ้นนั้น (สามารถเป็น null ได้)
          },
          {
            'text': 'Mask surgical',             // ข้อความระบุสิ่งของ
            'start_offset':61,      // ตำแหน่งเริ่มต้นของข้อความความในเนื้อหาที่โพส
            'end_offert':74,        // ตำแหน่งสิ้นสุดของข้อความความในเนื้อหาที่โพส
            'number_request': null    // จำนวนของสิ่งของชิ้นนั้น (สามารถเป็น null ได้)
          }
        ] 
      }
    ,
    'ans_from_account_id':'5e7f9da3acbd94b51a1a51a5',       // _id ของผู้ตอบ
    'ans_from_account': 'Manassanan Boonnavasin',         // ชื่อของผู้ตอน
}
