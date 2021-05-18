const mongoose = require('mongoose')
const t = require('../../utils/setTime') 
const recommentSchema = new mongoose.Schema({
    commentId : {type:String,required:true},
    time:{type:String,default:t.time()},
    rename:{type:String},
    recontent:{type:String},
    reemail:{type:String},
    rehead:{type:Number}
})

var Recomment = mongoose.model('recomment',recommentSchema);

module.exports = Recomment