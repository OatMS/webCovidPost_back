var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var moment = require('moment')

CovidPost = require('../models/tweets.js')
Answers = require('../models/answers.js')
User = require('../models/user.js')
Dictionary = require('../models/dictionary.js')
Items = require('../models/items.js')

const randomInt = require('random-int');




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/helloworld', function(req, res, next) {
  res.send('helloworld');
});

router.get('/getAllAnswers', function(req, res, next) {
  let key = req.query.key
  if(key !== '793033db97268fc9ceebde269797e54b'){
    res.send({status:"400",Message:"Secure key not match."})
  }else{
    Answers.find({}).sort({_id:-1})
    .exec( function(err, result) {
      if (!err) {
        
        res.send({status:"Success",data:result})
        // throw err
      }
      else{
        res.send({status:"500 Error",Message:"Backend Error"})
      }
      
    })

  }


  

  // res.send('helloworld');
});

router.post('/login',async function(req, res, next){
  var data = req.body
  console.log("line 23")
  console.log("data")

  if(data.login_via == 'facebook'){

    await User.findOne({personalID:data.user.personalID}).then(function(result,err){
      console.log(result)
      if(!err){
        console.log(result)
        if(result!=undefined){
          result.password  =  ""
          res.send({status :"success", data:result})
        }
        else{
          data.user.user_score = 0
          data.user.tel = ""
          data.user.lasted_login = moment().format('LLLL')
          data.user.login_via = "facebook"
          data.user.password = ""

          User.update(
            {personalID: data.user.personalID}, 
            {$setOnInsert: data.user}, 
            {upsert: true}, 
            function(err, numAffected) {
            // what to do
              res.send({status: "success",data:data.user})
            }
          )
        }
      }
      else{
        res.send({status:"500 error", data:err})
      }
    })

  }

  else if(data.login_via == 'common'){
    var email = data.user.email
    var password = data.user.password
    // console.log(email);
    User.findOne({email:email,password:password}, function(err, result) {
      if (err) throw err
      if(result !== null){
        result.password=""
        res.send({status: "success",data:result})
      }
      else{
        res.send({status: "not found"})
      }
  
    })
  }

  console.log(data);

});

router.post('/getUserScore',async function(req, res, next){
  let data = req.body
  // console.log("getUserScore req data:")
  // console.log(data)
    User.findOne({_id:data._id},function(err, result){
        console.log("getUserScore result data:")
  console.log(result)
      if(!err){
        if(result != undefined){
          res.send({status:"success",data:{user_score:result.user_score}})
        }else{
          res.send({status:"not found"})
        }
      }else{
        res.send({status:"500 error",data:err})


      }
    })
});
router.post('/register', async function(req, res, next) {
  var data = req.body
  console.log(data)
  let user =  {
    'personalID':"",
    'name': data.user.name,
    'email': data.user.email,
    'password':data.user.password,
    'picture_url':"",
    'login_via': data.user.login_via,
    'user_score': 0,
    'lasted_login' : moment().format('LLLL')
  } 

  try{
    const userModel = new User(user, { bufferCommands: false })
    const result = await User.create(userModel);
    res.send({status:"success",data:result})
    

  }
  catch(err){
    res.send({status:"Error",data:err})

  }


});

router.post('/checkEmail', async function(req, res, next) {
var data = req.body

  User.find({email:data.email}).exec(function(error,result){
    if(!error){
      console.log(result)
      if(result.length==0){
        res.send({status:"can use this email"});
      }else{
        res.send({status:"email already exist"});
      }
      
    }else{
      res.send({status:"500 Error",data:result});

    }
  })
});

router.get('/topScore', async function(req, res, next) {
  User.find({login_via:{$ne:'guest'}})
           .limit(5)
           .skip(0)
           .sort({user_score:-1}) // this is used to sort
           .exec(function(error, result){
            if(!error){
              // console.log(result);
              res.send({status:"success",data:result});
            } else{
              console.log(error);
            }
        });
});

router.post('/getAnswer', async function(req, res, next) {

  var return_value = {}
  var answer_id = req.body._id
  var isHasAnswer = false
  var answer = {}

  await Answers.findOne({_id:answer_id}, function(err, result) {
    if (err) res.send({ status: "Error key '_id'" })
    if(result!== null){
      // return_value.status = "success"
      console.log(result);
      return_value.answer = result.ans
      answer = result
      isHasAnswer = true
      // return result
      // res.send({ status: "success",  result: return_value })
    }
    else{
      res.send({ status: "not found" })
      // return "not found"
    }
  }).then(function(){
    if(isHasAnswer){
      CovidPost.findOne({_id:answer.tweet_id}, function(err, result1) {
      if (err) throw err
      return_value.tweet = result1
      console.log(result1);
      res.send({ status: "success",  result: return_value })
    })
  }

  })


});



router.post('/editAnswer', async function(req, res, next) {

  var data = req.body
  console.log("Edit data in _id:"+data._id);
  console.log(data.ans);
  data.lasted_update = moment().format('LLLL')
  var now_moment = moment().format('LLLL')
  
  await Answers.updateOne({_id:data._id}, 
    { $set: {
      ans: data.ans,
      score: data.score,
      no_location: data.no_location,
      all_locations: data.all_locations,
      ans_from_account_id: data.ans_from_account_id,
      ans_from_account: data.ans_from_account,
      ans_last_update: now_moment
    }

    }, 
      function(err, result) {
        if (err) throw err
        res.send({ success: true,  result: result })
      }
  );

  // Answers.replaceOne({_id:data._id},{data}, function(err, result) {
  //   if (err) throw err
  //   res.send({ success: true,  result: result })
  // })

});

router.get('/nextTweet', function(req, res, next) {
  // var data = req.body

  var ran = randomInt(1,443)

  CovidPost.findOne({index:ran}, function(err, result) {
    if (err) throw err
    res.send(result)
  })

});

// router.get('/addScore', async (req, res) => {
//   User.findOneAndUpdate({_id :'5e5cc26a5cad9801efb5da80'}, {$inc : {user_score: 20}},{returnNewDocument: true},function(err, response) {
//       // do something
//       if (err) console.log(err);
//       res.status(200).json({ success: true,  result: response })
//       console.log("success");
//   })
// });

router.get('/textGenerate', function(req, res, next) {

// ---- function -------
  var generateTextTag  =  function(originalText,ans){
    let originalText_length = originalText.length

    let textArray = originalText.split('')

    ans.contact_address.forEach(function (item) {
      if(item.offet_start<originalText_length && item.offet_end<originalText_length  ){
        textArray[item.offet_start] = '<contact_address>' + textArray[item.offet_start];
        textArray[item.offet_end] = '</contact_address>' + textArray[item.offet_end];

      }
    })
    ans.items.forEach(function (item) {
      if(item.offet_start<originalText_length && item.offet_end<originalText_length  ){
        textArray[item.offet_start] = '<itmes>' + textArray[item.offet_start];
        textArray[item.offet_end] = '</itmes>' + textArray[item.offet_end];

      }
    })
    
    
    return textArray
  }

  // run
  var originalText = "Hello world"
  var ans = {
      contact_address:[
        {
          offet_start:0,
          offet_end:5
        }
        
      ],
      items:[
        {
          offet_start:6,
          offet_end:11
        }
      ]
    } 
  let returnText =  generateTextTag(originalText,ans)
  let text_return = returnText.join('')
  console.log(text_return)
  res.send(text_return)

  

});


router.post('/submitAndNext', async (req, res) => {
  try{

    let data =  req.body
    var now_moment =  moment().format('LLLL')
    data.ans_datetime = now_moment
    data.ans_last_update = now_moment
    console.log("create answer");
    console.log(data);
    // res.status(200).json({ success: true, type: typeof data, result: data })
    const ans = new Answers(data, { bufferCommands: false })
    // ans.save(function (err, obj) {
    //    if (err) return console.error(err);
    //    res.status(200).json({ success: true,  result: obj })
    //  });
     try {
       const result = await Answers.create(ans);
       // const result = await ans.save();
       console.log("result answer is:")
       console.log(result);  // this will be the new created ObjectId
      User.findOneAndUpdate({ _id :data.ans_from_account_id}, { $inc : {user_score : data.score},bufferCommands: false },function(err, response) {
           // do something
           if (err) {
             console.log('err')
           }
           console.log('user id:'+data.ans_from_account_id)
           console.log('data score: '+data.score)
           console.log('response of update user: ')
           console.log(response);
      })


       res.status(200).json({ success: true,  result: result })
    } catch(err) {
      console.log(err)
    }

  }catch(err){
    console.log(err);
    res.status(500).json({ success: false, msg: err });
  }


});


router.get('/getWordSuggest', async function(req, res, next) {
  // var data = req.body

  var return_data = {}
  // var ran = randomInt(1,443)

  await Dictionary.find({word_type:'โรงพยาบาล'}, function(err, result) {
    if (err) throw err
    else{
      let temp =  []
      result.forEach(item =>{
        temp.push(item.word)
      })
      temp.sort((a, b) => b.length - a.length)
      return_data.hospital_name = temp
    }

    
    // res.send(result)
  })

  await Items.find({}, function(err, result) {
    if (err) res.send({status:"500 Error", err:err})
    else{
      let temp =  []
      result.forEach(item =>{
        temp.push(item.word)
      })
      temp.sort((a, b) => b.length - a.length)
      return_data.items_name = temp
      res.send({status:"success",data:return_data})
    }
    
  })

});



router.get('/getAllHospitalName', function(req, res, next) {
  // var data = req.body

  // var ran = randomInt(1,443)

  Dictionary.find({word_type:'โรงพยาบาล'}, function(err, result) {
    if (err) throw err
    res.send(result)
  })

});


router.get('/getAllItemsName', function(req, res, next) {

  Items.find({}, function(err, result) {
    if (err) res.send({status:"500 Error", err:err})
    else{
      let temp =  []
      result.forEach(item =>{
        temp.push(item.word)
      })
      temp.sort((a, b) => b.length - a.length)
      res.send({status:"success",data:temp})
    }
    
  })

});







module.exports = router;
