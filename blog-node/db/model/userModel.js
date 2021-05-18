const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    us : {type:String,required:true}
})

var User = mongoose.model('user',userSchema);

module.exports = User