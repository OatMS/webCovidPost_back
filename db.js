var mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, function(){
    console.log('...Success, Connected  to Mongoose.......')
})

mongoose.set('debug', true)
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
module.exports = mongoose
