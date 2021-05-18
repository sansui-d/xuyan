const mongoose = require('mongoose')
const t = require('../../utils/setTime') 
const classifySchema = new mongoose.Schema({
    classifyName : {type:String,required:true},
    time:{type:String,default:t.time()},
    num:{type:Number,default:0}
})

var Classify = mongoose.model('Classifys',classifySchema);

module.exports = Classify