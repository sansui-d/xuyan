const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/myblog',{useNewUrlParser:true,useUnifiedTopology: true})
mongoose.set('useFindAndModify', false)
const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function(){
    console.log('db ok')
})