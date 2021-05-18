const mongoose = require('mongoose')
const t = require('../../utils/setTime') 
const commentSchema = new mongoose.Schema({
    artId : {type:String,required:true},
    time:{type:String,default:t.time()},
    name:{type:String},
    content:{type:String},
    email:{type:String},
    head:{type:Number}
})

var Comment = mongoose.model('comment',commentSchema);

module.exports = Comment